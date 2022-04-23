import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {updateUser,logOut,login} from '../../features/auth/authSlice'
import {FaEdit,FaCheck,FaRegWindowClose, FaPage4} from 'react-icons/fa'
import axios from 'axios'
import './ProfileContainer.scss'
import Spinner from '../spinner/Spinner'
const ProfileContainer = () => {
    const [update, setUpdate] = useState(false)
    const {user,isLoading} =useSelector((state)=>state.auth)
    const [selectedFile, setSelectedFile] = useState('')
    const [formData, setFormData] = useState({
        name:user.name,
        email:user.email,
    })

    const {name,email,profilePic} =formData
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            if (selectedFile!=='') {
                const picURL=await handleFileSubmission()
                await dispatch(updateUser({
                    ...formData,
                    profilePic:picURL
                }))
            }
            else{
                dispatch(updateUser({
                    ...formData
                }))
            }
            setUpdate(!update)
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileSubmission=async()=>{
        console.log('inside file submit function');
        const data=new FormData()
        data.append("file",selectedFile)
       
        data.append("upload_preset", "amueckji");
        const response=await axios.post("https://api.cloudinary.com/v1_1/dqfau3dwn/image/upload",data)
        const url=response.data.url
        return url
      } 

    const resetState=()=>{
        setFormData({name:user.name,
            email:user.email,
            profilePic:user.profilePic})
    }

    if (isLoading) {
        return <Spinner />
    }
  return (
    <section className='profile__container'>
        <div className="profile__image">
            <img src={user.profilePic} alt="user" />
            {update && <input type="file" onChange={(e)=>setSelectedFile(e.target.files[0])} />}
        </div>
        <form onSubmit={handleSubmit} className="profile__details">
            <div>
            <p><span>Name:</span></p>
            <input minLength='6' maxLength='20' onChange={(e)=>setFormData({...formData,name:e.target.value})}
            type="text" disabled={!update} value={name}/>
            </div>
            <div>
            <p><span>Email:</span></p>
            <input onChange={(e)=>setFormData({...formData,email:e.target.value})}
            type="email" disabled={!update} value={email}/>
            </div>
            <div>
            {update?
            <>
            <button type='button' onClick={()=>{
                setUpdate(!update)
                resetState()
            }
             } className='primary-btn edited red'>Cancel<FaRegWindowClose/></button>
            <button type='submit' className='primary-btn edited'>Done<FaCheck/></button>
            </>
            :
            <button type='button' onClick={()=>setUpdate(!update)} className='primary-btn edited'>Edit<FaEdit/></button>
            }
        </div>
        </form>
    </section>
  )
}

export default ProfileContainer