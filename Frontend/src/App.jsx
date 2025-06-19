import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin' 
import CaptainSignUp from './pages/CaptainSignUp'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<UserSignUp></UserSignUp>}></Route>
        <Route path='/login' element={<UserLogin></UserLogin>}></Route>
        <Route path='/captain-signup' element={<CaptainSignUp></CaptainSignUp>}></Route>
        <Route path='/captain-login' element={<CaptainLogin></CaptainLogin>}></Route>
      </Routes>
    </div>
  )
}

export default App