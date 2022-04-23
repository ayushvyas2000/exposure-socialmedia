import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage';
import { ToastContainer} from 'react-toastify';
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/ProfilePage/Profile'
import SinglePost from './pages/SinglePost/SinglePost';
function App() {
  return (
    <>
    <Router >
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<PrivateRoute />}>
        <Route path='/home' element={<HomePage />} />
        </Route>
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/post/:id' element={<PrivateRoute />}>
          <Route path='/post/:id' element={<SinglePost />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    
    </>
  );
}

export default App;
