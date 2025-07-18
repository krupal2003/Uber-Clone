import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './pages/ProtectedRoute'
import Logout from './pages/Logout'
import CaptainProtectedRoute from './pages/CaptainProtectedRoute'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<UserSignUp></UserSignUp>}></Route>
        <Route path='/login' element={<UserLogin></UserLogin>}></Route>
        <Route path='/captain-signup' element={<CaptainSignUp></CaptainSignUp>}></Route>
        <Route path='/captain-login' element={<CaptainLogin></CaptainLogin>}></Route>
        
        <Route path='/home' element={
          <ProtectedRoute>
            <DashBoard></DashBoard>
          </ProtectedRoute>
        }></Route>

        <Route path='/riding' element={
          <ProtectedRoute>
          <Riding></Riding>
          </ProtectedRoute>
          }> </Route>

        <Route path='/user/logout' element={
          <ProtectedRoute>
            <Logout></Logout>
          </ProtectedRoute>
        }>  </Route>

        <Route path='/captain-home' element={
          <CaptainProtectedRoute>
            <CaptainHome></CaptainHome>
          </CaptainProtectedRoute>
        }></Route>

        <Route path='/captain-riding' element={<CaptainRiding></CaptainRiding>}>

        </Route>

        <Route path='/captain-logout' element={
          <CaptainProtectedRoute>
            <CaptainLogout></CaptainLogout>
          </CaptainProtectedRoute>
        }></Route>
      </Routes>
    </div>
  )
}

export default App