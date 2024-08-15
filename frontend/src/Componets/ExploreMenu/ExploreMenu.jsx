import React from 'react';
import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';

export default function ExploreMenu({ category, setCategory }) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable selection of dishes crafted with the finest ingredients and culinary expertise.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((v, i) => (
          <div
          onClick={() => setCategory(prev => prev === v.menu_name ? 'All' : v.menu_name)}
            key={i}
            className="explore-menu-list-item"
          >
            <img className={category === v.menu_name ? "active" : ""} src={v.menu_image} alt={v.menu_name} />
            <p>{v.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
