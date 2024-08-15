import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Add from '../../Pages/Add/Add'
import List from '../../Pages/List/List'
import Orders from '../../Pages/Orders/Orders'


function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/add" element={<Add/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/orders" element={<Orders/>} />
        </Routes>

      
    </div>
  )
}

export default AllRoutes
