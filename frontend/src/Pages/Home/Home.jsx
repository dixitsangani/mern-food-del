import React, { useState } from 'react'
import "./Home.css"
import Header from '../../Componets/Header/Header'
import ExploreMenu from '../../Componets/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Componets/FoodDisplay/FoodDisplay'
import AppDownload from '../../Componets/AppDownload/AppDownload'

export default function Home() {

    const [category, setCategory] = useState("All")

    return (
        <div>
            <Header />
             <ExploreMenu category={category} setCategory={setCategory} />
             <FoodDisplay category={category}/>
             <AppDownload/>
        </div>
    )
}
