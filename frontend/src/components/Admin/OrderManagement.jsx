import React from 'react'

const orders=[
    {
        _id:1,
        user:{
            name:"sam"
        },
        totalPrice:225,
        status:"processing",
    },
    {
        _id:2,
        user:{
            name:"jad"
        },
        totalPrice:225,
        status:"",
    },
   
]

const OrderManagement = () => {
    function handleStatusChange(id,status){
        console.log({id:id,status:status});
        
        
    }
  
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>OrderManagement</h1>
        <div className='rounded-lg overflow-x-auto shadow-md'>
            <table className='w-full text-left'>
                <thead className='bg-gray-100 text-xs'>
                    <tr>
                        <th className='  p-2'>Order ID</th>
                        <th className='  p-2'>Customer</th>
                        <th className='  p-2'>Total Price</th>
                        <th className='  p-2'>Status</th>
                        <th className='  p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length>0 ?
                    (
                    orders.map(order=>(

                    <tr key={order._id} className='text-gray-500 cursor-pointer border-b'>
                        <td className='p-2 text-black  '>#{order._id}</td>
                        <td className='p-2   '>{order.user.name}</td>
                        <td className='p-2  '>{order.totalPrice}</td>
                        <td className='p-2  '>
                            <select value={order.status} onChange={(e)=>(
                            handleStatusChange(order._id,e.target.value) )}   name="" id="" className= ' text-black text-sm p-2 rounded bg-white border focus:border-blue-500 '>
                                <option value="processing" >processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Deliverd">Deliverd</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                        <td className=' p-2'>
                        <button onClick={()=>(handleStatusChange(order._id,"Deliverd"))} className=' bg-green-600 hover:bg-green-700 p-2 rounded-md text-white text-sm'>Mark as deliverd</button>
                        </td>
                    </tr>
                    ))):
                    <tr className='p-4 '>
                        <td colSpan={5} className='text-xl text-center text-gray-600'>No orders</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderManagement