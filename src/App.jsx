import { useState } from 'react'
import './App.css'
import { WEB_ROUTES } from './routes';

import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'
import ProtectedRoute from './utils/ProtectedRoute'


import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
import Header from './components/header/Header';
import SideNavV1 from './components/sidenavV1/SideNavV1';


// Utility function to flatten nested route objects into an array of {path, element}
function flattenRoutes(routesObj) {
  let routes = [];

  function recurse(obj) {
    for (const key in obj) {
      const value = obj[key];
      if (value && typeof value === 'object') {
        if ('path' in value && 'element' in value) {
          routes.push(value);
        } else {
          recurse(value);
        }
      }
    }
  }

  recurse(routesObj);
  return routes;
}

function App() {
  //const allWebRoutes = flattenRoutes(WEB_ROUTES);

  // Flatten and normalize routes
  const allWebRoutes = flattenRoutes(WEB_ROUTES).map(({ path, element }) => ({
    path: path === '' ? '/' : path,
    element,
  }));


  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route element={<ProtectedRoute />}>
            {allWebRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;