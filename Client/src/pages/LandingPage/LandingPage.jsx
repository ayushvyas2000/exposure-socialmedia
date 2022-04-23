import React, { useState,useEffect } from 'react'
import './LandingPage.scss'
import logo from '../../assets/logo.png'
import LoginForm from '../../components/forms/LoginForm'
import RegisterForm from '../../components/forms/RegisterForm'
import { useSelector,useDispatch } from 'react-redux'
import {login,reset} from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const [login, setLogin] = useState(true)
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
  useEffect(()=>{
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/home')
    }
    dispatch(reset())
  },[isError,isSuccess,user,navigate,message,dispatch])
  return (
    <section className='landingpage'>
      <div className='landingpage__hero'>
      <div className="landingpage__branding">
        <img className='logo' src={logo} alt="Exposure" />
        <p className='p-text'>A social media plaform<br />for photographers</p>
      </div>
      {login?
      <LoginForm signup={()=>{setLogin(false)}} />
      : <RegisterForm signin={()=>{setLogin(true)}} />
    }
      </div>
    </section>
  )
}

export default LandingPage