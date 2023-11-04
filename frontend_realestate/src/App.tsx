import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminPage from './admin/adminpage';
import PostedProperties from './users/postedproperties';
import UserLogin from './login/user_login'
import UserPage from './users/userpage'
import AdminLogin from './login/admin_login'
import UserSignUp from './login/user_signup'
import PostProperty from './users/postproperty'
import Payments from './users/payments';
import WishList from './users/wishlist';
import Bookings from './users/bookings';
import ReportedList from './admin/adminreported';
import AdminDocuments from './admin/admindocs';

const App = () => {

  const adminLogin = true;
  const userLogin = false;

  return (
    <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={userLogin ? <Navigate to = "/:user/home" /> : <Navigate to = "/login" />} />
          <Route path="/admin/home" element={adminLogin ? <AdminPage /> : <Navigate to = "/admin/login" />} />

          {/* Admin Routes */}
          <Route path="/admin/reported" element={<ReportedList />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/docs" element={<AdminDocuments />} />

          {/* User Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/home" element={<UserPage />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/postppty" element={<PostProperty />}/>
          <Route path="/payments" element={<Payments />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/postedppty" element={<PostedProperties />}/>
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
    </Router>
  )
}

export default App
