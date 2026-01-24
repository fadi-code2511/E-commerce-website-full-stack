import React, { useState } from "react";

const UserManagement = () => {
  const users = [
    {
      _id: 123,
      name: "roro",
      email: "roro@test.com",
      role: "admin",
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer", //By default
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // to reset the form data
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Customer", //By default
    });
  }
  
  function handleRoleChange(id,newRole){
    console.log({id:id,role:newRole});
    
  }

  function handleDeleteUser(id){
    if(window.confirm("Are you sure you want to delete this user ?")){
        console.log("user with Id",id ,"deleted");
        
    }
  }
  return (
    <div className="max-w-7xl mx-auto  p-8">
      <h1 className="text-2xl font-bold mb-10">User Management</h1>
      {/* add new user form */}
      <div className="flex flex-col ml-3">
        <label htmlFor="" className="text-lg font-bold mb-2 tracking-tighter">
          Add new user
        </label>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3 ">
            <label className="text-gray-700 ">Name</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              value={formData.name}
              name="name"
              type="text"
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col mb-3 ">
            <label className="text-gray-700 ">Email</label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col mb-3 ">
            <label className="text-gray-700 ">Password</label>
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col mb-3 ">
            <label className="text-gray-700 ">Role</label>
            <select
              onChange={handleChange}
              value={formData.role}
              name="role"
              id=""
              className="border rounded p-2"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 rounded-md p-4 w-36 text-white hover:bg-green-800 mt-3"
          >
            Add user
          </button>
        </form>
      </div>
      {/* user list  */}
      <div className=" overflow-auto shadow-md">
        <table className="w-full mt-3 rounded-sm shadow-md text-center ">
          <thead>
            <tr className="bg-gray-100 p-4 ">
              <th className="px-4 py-2 uppercase">Name</th>
              <th className="px-4 py-2 uppercase">Email</th>
              <th className="px-4 py-2 uppercase">Role</th>
              <th className="px-4 py-2 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-2 text-gray-900 font-medium">
                  {user.name}
                </td>
                <td className="px-4 py-2 ">{user.email}</td>
                <td className="px-4 py-2 ">
                  <select value={user.role} onChange={(e)=>{handleRoleChange(user._id,e.target.value)}}  name="" id="" className="p-2 rounded border">
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
                <td className="px-4 py-2 ">
                  <button onClick={()=>{handleDeleteUser(user._id)}} className="bg-red-600 rounded-md p-2 w-32 text-white hover:bg-red-800 mt-3">
                    Delete user
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
