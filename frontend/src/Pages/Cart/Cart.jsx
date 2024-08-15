import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from "../../Context/StoreContext"
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const { cartItem, food_list, removeToCart, getTotalCartAmount, url } = useContext(StoreContext);


  const naviget = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-titel">
          <p>Items</p>
          <p>Titel</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((v, i) => {
          if (cartItem[v._id] > 0) {

            return (
              <div key={i} >
                <div className="cart-items-titel cart-items-item">
                  <img src={`${url}${v.image}`} alt="" />
                  <p>{v.name}</p>
                  <p>${v.price}</p>
                  <p>{cartItem[v._id]}</p>
                  <p>{v.price * cartItem[v._id]}</p>
                  <button onClick={() => removeToCart(v._id)} className='cros'>x</button>
                </div>
                <hr />

              </div>

            )
          }
        })}


        <div className='cart-bottom'>
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
            <button onClick={() => naviget('/oder')} className='proceed-btn'>PROCEED TO CHECKOUT</button>
          </div>



          <div className="cart-promocode">
            <div className="">
              <p>If you have a promo code, Enter it here </p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>

        </div>


      </div>

    </div>
  )
}
