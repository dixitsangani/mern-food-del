import React, { useContext, useState } from 'react'
import "./NavBar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

export default function NavBar({ setShowLogin }) {

  const [Menu, setMenu] = useState("Menu")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

  const navigate =useNavigate();

  const logout =()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")

  }

  return (
    <div className='navbar'>

      <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={Menu === "home" ? "active" : ""} >home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={Menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobail-app")} className={Menu === "mobail-app" ? "active" : ""}>mobail-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={Menu === "contact-us" ? "active" : ""}>contact-us</a>

      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="search-bar-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sing In</button>
          : <div className='navbar_profail'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profail-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

            </ul>
          </div>}

      </div>

    </div>
  )
}
