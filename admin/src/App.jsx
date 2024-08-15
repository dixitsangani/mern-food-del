import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Componets/Navbar/Navbar'
import Sidebar from './Componets/Sidebar/Sidebar'
import AllRoutes from './Componets/AllRoutes/AllRoutes'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <div className="App">
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <AllRoutes/>
      </div>

    </div>
  )
}

export default App
