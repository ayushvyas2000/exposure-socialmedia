import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login,reset} from '../../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import './Form.scss'
import {FaEye} from 'react-icons/fa'
import {toast} from 'react-toastify'
const LoginForm = ({signup}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      email:'',
      password:''
    })
    const {email,password}=formData
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
    const handleSubmit=(e)=>{
      e.preventDefault()
      dispatch(login(formData))
      
    }
  return (
    <form onSubmit={handleSubmit} className='form'> 
    <h1>Sign In</h1>
    <div>
    <input value={email} type="email" placeholder='email'
    onChange={(e)=>setFormData({...formData,email:e.target.value})} required/>
    </div>
    <div>
    <input value={password} type={showPassword? 'text' :'password'} placeholder='password' 
    onChange={(e)=>setFormData({...formData,password:e.target.value})} required/>
    <FaEye onClick={()=>setShowPassword(!showPassword)} style={{cursor:'pointer'}} />
    </div>
    <button className='primary-btn'>Submit</button>
    <p>New here? <span onClick={signup} style={{cursor:'pointer'}}>Sign up instead</span> </p>
    </form>
  )
}

export default LoginForm