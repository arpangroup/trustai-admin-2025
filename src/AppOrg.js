import './App.css';
import {Navbar,NavbarV2,Footer, SideNav} from './components'
// import {Home,Profile,Item, Create,Login,Register, Settings, Forgot, Level, UserDashboardPage, MLMTree} from './pages'
import { Routes, Route, useLocation } from "react-router-dom";


// import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
import Header from './components/header/Header';
import SideNavV1 from './components/sidenavV1/SideNavV1';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot', '/tree'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      <div class="layout">
      <Header/>
      <SideNavV1/>

      </div>
      {/* {showNavbar && <NavbarV2/>} */}

      {/* Apply top margin only if Navbar is visible */}
       <div style={{ marginTop: showNavbar ? '60px' : '0' }}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path=":item/:id" element={<Item />} />
          <Route path="/create" element={<Create /> } />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/forgot" element={ <Forgot />} />
          <Route path="/settings" element={<Settings />} />


          <Route path="/level" element={<Level />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/tree" element={<MLMTree />} /> */}
  
        </Routes>
       </div>
       {/* <Footer/> */}
    </div>
  );
}

export default App;
