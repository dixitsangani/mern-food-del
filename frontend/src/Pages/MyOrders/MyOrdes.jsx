import React, { useContext, useEffect, useState } from 'react'
import "./Myorders.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

function MyOrders() {
  const { token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await axios.post("http://localhost:8001/order/userorder", {}, { headers: { token } })
    setData(response.data.data)
    console.log(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {
          data.map((v, i) => (
            <div className="my-orders-order" key={i}>
              <img src={assets.parcel_icon} alt="" />
              <p>{v.items.map((item, index) => {
                if (index === v.items.length - 1) {
                  return item.name + "x" + item.quantity;
                } else {
                  return item.name + "x" + item.quantity + ", ";
                }
              })}</p>
              <p>${v.amount}.00</p>
              <p>items:{v.items.length}</p>
              <p><span>&#x25cf;</span><b>{v.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyOrders
