import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PlaceOder() {

  const { getTotalCartAmount, token, food_list, cartItem, url, } = useContext(StoreContext)


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItem[item._id] };
        orderItems.push(itemInfo);
      }
    })
    console.log(placeOrder)

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/order/placeorder", orderData, { headers: { token } });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("erorr")
    }

  }

  const navigate =useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate("/cart");
    }
    else if(getTotalCartAmount()===0){
        navigate("/cart");
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-oder-left">
        <p className="tital">Delivery informetion</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandeler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandeler} value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangeHandeler} value={data.email} type="text" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandeler} value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandeler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandeler} value={data.state} type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandeler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandeler} value={data.country} type="text" placeholder='Country' />
        </div>

        <input required name='phone' onChange={onChangeHandeler} value={data.phone} type="text" placeholder='Phone' />

      </div>
      <div className="place-oder-right">

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <p>Subtotal: $0.00</p> <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit' className='proceed-btn'>PROCEED TO CHECKOUT</button>
        </div>


      </div>

    </form>
  )
}
