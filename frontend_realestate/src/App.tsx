import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react'
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

<<<<<<< HEAD
  const [adminLogin, setAdminLogin] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [userName, setUserName] = useState("");
=======
  const adminLogin = true;
  const userLogin = false;
>>>>>>> 4f6d319c7d94ec2d8a3ed4ddd677391b50058152

  return (
    <Router>
        <Routes>
          {/* Authentication Routes */}
<<<<<<< HEAD
          <Route path="/" element={userLogin ? <Navigate to = "/:user/home" /> : <Navigate to = "/user/login" />} />
          <Route path="/admin/home" element={adminLogin ? <AdminPage adminLogin={adminLogin} setAdminLogin={setAdminLogin}/> : <Navigate to = "/admin/login" />} />

          {/* Admin Routes */}
          <Route path="/admin/reported" element={<ReportedList adminLogin={adminLogin} setAdminLogin={setAdminLogin}/>} />
          <Route path="/admin/login" element={<AdminLogin adminLogin={adminLogin} setAdminLogin={setAdminLogin}/>} />
          <Route path="/admin/docs" element={<AdminDocuments adminLogin={adminLogin} setAdminLogin={setAdminLogin}/>} />

          {/* User Routes */}
          <Route path="/user/login" element={<UserLogin userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>} />
          <Route path="/:user/home" element={<UserPage userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>} />
          <Route path="/user/signup" element={<UserSignUp userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>} />
          <Route path="/:user/postppty" element={<PostProperty userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>}/>
          <Route path="/:user/payments" element={<Payments userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>} />
          <Route path="/:user/wishlist" element={<WishList userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>} />
          <Route path="/:user/postedppty" element={<PostedProperties userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>}/>
          <Route path="/:user/bookings" element={<Bookings userLogin={userLogin} setUserLogin={setUserLogin} userName={userName} setUserName={setUserName}/>} />
=======
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
>>>>>>> 4f6d319c7d94ec2d8a3ed4ddd677391b50058152
        </Routes>
    </Router>
  )
}

export default App
