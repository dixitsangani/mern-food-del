import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

function FoodItem({ id, name, price, description, image }) {

    const {cartItem, addToCart, removeToCart,url, food_list} = useContext(StoreContext)
    
   
    return (
        <div className='food-item'>
            <div className='food-item-image-contener'>
                <img className='food-item-image' src={`${url}${image}`} alt={`${name} image`} />

                {
                    !cartItem[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                        : <div className='food-item-counter'>
                            <img onClick={() => removeToCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItem[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>

                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-reting">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>

        </div>
    )
}

export default FoodItem
