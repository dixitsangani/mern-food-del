import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="saidbar-optisans">
        <NavLink to="/add" className="saidbar-optisan">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className="saidbar-optisan">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className="saidbar-optisan">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

      </div>


    </div>
  )
}

export default Sidebar
