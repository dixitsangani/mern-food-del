import React, { useContext } from 'react'
import './FoodDisplay.css'
import { food_list } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
export default function FoodDisplay({ category }) {

  const { food_list } = useContext(StoreContext);
  

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((v, i) => {

          if (category === "All" || category === v.category) {
            return <FoodItem key={i} id={v._id} name={v.name} description={v.description} price={v.price} image={v.image} />
          }
        })}
      </div>
    </div>
  )
}
