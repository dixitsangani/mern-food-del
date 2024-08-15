import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Componets/NavBar/NavBar'
import Allroutes from './Componets/AllRoutes/Allroutes'
import Footer from './Componets/Footer/Footer'
import LoginPopup from './Componets/LoginPopup/LoginPopup'


function App() {
  const [showLogin, setShowLogin] = useState(false)


  return (
    <>

    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}

      <div className='app'>
        <NavBar setShowLogin={setShowLogin}/>
        <Allroutes />
      </div>
      <Footer />

    </>
  )
}

export default App
