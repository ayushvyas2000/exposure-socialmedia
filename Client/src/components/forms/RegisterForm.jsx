import React, { useEffect, useState } from 'react'
import {FaEye} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import {register,reset} from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import './Form.scss'
const RegisterForm = ({signin}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      name:'',
      email:'',
      password:'',
      password2:''
    })
    const {name,email,password,password2}=formData
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user,isError,isLoading,isSuccess,message} =useSelector((state)=>state.auth)
    const resetForm=()=>{
      setFormData({
        name:'',
        email:'',
        password:'',
        password2:''
      })
    }

    const onMutate=(e)=>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      if (password!==password2) {
        toast.error('Passwords do not match')
      }
      else{
        resetForm()
        const userData={
          name:formData.name,
          email:formData.email,
          password:formData.password
        }
        dispatch(register(userData))
      }
    }
    

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
    <form autoComplete='off' onSubmit={handleSubmit} className='form'> 
    <h1>Sign Up</h1>
    <div>
    <input minLength='6' maxLength='20' type="text" placeholder='name' required
    id='name' value={name} onChange={onMutate} />
    </div>
    <div>
    <input type="email" placeholder='email' required
    id='email' value={email} onChange={onMutate}/>
    </div>
    <div>
    <input minLength='6' maxLength='20' type={showPassword? 'text' :'password'} placeholder='password' required
    id='password' value={password} onChange={onMutate}/>
    <FaEye onClick={()=>setShowPassword(!showPassword)} style={{cursor:'pointer'}} />
    </div>
    <div>
    <input type="password" maxLength='20' placeholder='confirm password' required
    id='password2' value={password2} onChange={onMutate}/>
    </div>
    <button className='primary-btn'>Submit</button>
    <p>Already have an account?<br /><span onClick={signin} style={{cursor:'pointer'}}>Sign in instead</span> </p>
    </form>
  )
}

export default RegisterForm