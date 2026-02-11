import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST api/cart
// add a product to cart for guest and logged in user
// access public
const getcart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  }
  if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

router.post("/", async (req, res) => {
  try {
    const { productId, size, color, userId, guestId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });

    // determine if the user is logged in or guest
    const cart = await getcart(userId, guestId);
    // if cart is exist , update the cart
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) =>
          product.productId.toString() === productId &&
          product.size === size &&
          product.color === color,
      );
      if (productIndex > -1) {
        //if the product is exist, update the quantity
        cart.products[productIndex].quantity += parseInt(quantity);
      } else {
        //product not exist, add new product to the cart
        cart.products.push({
          productId,
          size,
          color,
          quantity,
          image: product.images[0].url,
          price: product.price,
          name: product.name,
        });
      }
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      );
      await cart.save();
      res.json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(), // to avoid collisions(crash), we can use uuid package(library)
        products: [
          {
            productId,
            size,
            color,
            quantity,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
          },
        ],
        totalPrice: product.price * quantity,
      });
      res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// route: api/cart
//desc: update the product quntity in the cart of guest or logged in user
// access public
router.put("/", async (req, res) => {
  try {
    const { productId, size, color, userId, guestId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });

    // determine if the user is logged in or guest
    const cart = await getcart(userId, guestId);
    // if cart is exist , update the cart
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color,
    );
    if (productIndex > -1) {
      //if the product is exist, update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = parseInt(quantity);
      } else {
        cart.products.splice(productIndex, 1); // qauntity=0, remove the product
      }
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//route: DELETE api/cart
//desc: remove a product from the cart
//access puplic
router.delete("/", async (req, res) => {
  const { productId, userId, guestId, size, color } = req.body;
  try {
    let cart = await getcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color,
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//rout: GET api/cart
//desc: display the cart
//access public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    let cart = await getcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// rout: POST api/cart/merge
// desc: merge guest cart into user cart on login
// access private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    // find user cart and guest cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0)
        return res.status(400).json({ message: "guest cart is empty" });

      //merge guest cart into user cart.
      if (userCart) {
        guestCart.products.forEach((product) => {
          let productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === product.productId.toString() &&
              item.size === product.size &&
              item.color === product.color,
          );
          // if product found  update the quantity:
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += product.quantity;
          } else {
            userCart.products.push(product);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        //delete the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ message: "Error while deleting the guest cart" });
        }
        await userCart.save();
        res.json(userCart);
      } else {
        // convert the guest cart to user  cart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.json(userCart);
      }
    } else {
      //if there is no cart and the user has cart already
      if (userCart) {
        res.status(200).json(userCart);
      } else {
        res.json({ message: "Guest Cart not found" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
