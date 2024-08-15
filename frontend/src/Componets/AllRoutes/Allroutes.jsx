import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Cart from '../../Pages/Cart/Cart';
import PlaceOder from '../../Pages/PlaceOder/PlaceOder';
import MyOrdes from '../../Pages/MyOrders/MyOrdes';


export default function Allroutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/oder' element={<PlaceOder/>} /> 
                <Route path='/myorders' element={<MyOrdes/>}/>
                
            </Routes>
        </div>
    );
}
