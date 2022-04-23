import React, { useState } from 'react'
import {CgProfile,CgLogOut,CgHome,CgMenu,CgClose} from 'react-icons/cg'
import { useSelector,useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './Navbar.scss'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import {logOut} from '../../features/auth/authSlice'
const Navbar = () => {
  const location=useLocation()
  const [toggle, setToggle] = useState(false)
  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  return (<>
    <header className={location.pathname==='/'?'navbar__header hide': 'navbar__header'}>
    <div onClick={()=>navigate('/home')} style={{cursor:'pointer'}} className="navbar__brand">
    <img src={logo} alt="Exposure" />
    </div>
    <nav className='navbar__links'>
            <div>
            <p>Hi {user && user.name&& user.name.split(' ')[0]}</p>
            </div>
            <div onClick={()=>{
              navigate('/home')
            }} style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
            <CgHome />
            <p>Home</p>
            </div>
            <div onClick={()=>{
              navigate('/profile')
            }} style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
            <CgProfile />
            <p>Profile</p>
            </div>
            <div onClick={()=>{
              dispatch(logOut())
              navigate('/')
            }} style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
            <CgLogOut />
            <p>Logout</p>
            </div>
    </nav>
    <div className="navbar__menu">
      <button onClick={()=>setToggle(true)}><CgMenu /></button>
    </div>
    </header>
    <div className={toggle?"navbar__menu-expanded":"navbar__menu-expanded hidden"}>
      <div className="close">

      <CgClose onClick={()=>setToggle(false)} />
      </div>
    <p>Hi {user && user.name&& user.name.split(' ')[0]}</p>
    <div onClick={()=>{
              setToggle(false)
              navigate('/home')
            }} style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
            <CgHome />
            <p>Home</p>
            </div>
            <div onClick={()=>{
              setToggle(false)
              navigate('/profile')
            }} style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
            <CgProfile />
            <p>Profile</p>
            </div>
            <div onClick={()=>{
              setToggle(false)
              dispatch(logOut())
              navigate('/')
            }} style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
            <CgLogOut />
            <p>Logout</p>
            </div>
    </div>
    </>
  )
}

export default Navbar