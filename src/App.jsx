import { useState } from 'react'
import './App.css'

import adminRoutes from './constants/adminRoutes'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'
import ProtectedRoute from './utils/ProtectedRoute'

import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
import Header from './components/header/Header';
import SideNavV1 from './components/sidenavV1/SideNavV1';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route element={<ProtectedRoute />}>
            {adminRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App
