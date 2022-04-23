import React, { useState } from 'react'
import {HiX} from 'react-icons/hi'
import {useDispatch,useSelector} from 'react-redux'

import {createPost,getPosts} from '../../features/post/postSlice'
import axios from 'axios';
const CreatePost = ({toggleOff}) => {
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title:'',
    messageText:'',
    tagsText:'',
    selectedFile:''
  })

  const resetState=()=>{
    setFormData({
    title:'',
    messageText:'',
    tagsText:'',
    selectedFile:''
    })
  }
  
  const {title,messageText,selectedFile,tagsText}=formData
  const dispatch=useDispatch()
  const {isLoading} = useSelector((state)=>state.post)
  const {user}=useSelector((state)=>state.auth)
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();
      const imageHandler=await handleFileSubmission()
      await dispatch(createPost({
        userRef: user._id,
        selectedFile:imageHandler.url,
        title,
        message:messageText,
        tags:tagsText!==''?tagsText.split(','):[],
        creator:user.name,
        creatorPic:user.profilePic,
        createdAt:Date.now()
      }))
      await dispatch(getPosts())
      setUploading(false)
      resetState()
      toggleOff()
      
    } catch (error) {
      console.log(error);
    }
  }

  const onMutate=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
    
  }

  const handleFileSubmission=async()=>{
    setUploading(true)
    const data=new FormData()
    data.append("file",selectedFile)
   
    data.append("upload_preset", "amueckji");
    const response=await axios.post("https://api.cloudinary.com/v1_1/dqfau3dwn/image/upload",data)
    return response.data
  }


  return (
    <div className='addpost__container'>
    <form onSubmit={handleSubmit} className='form create-form'> 
    <button onClick={toggleOff} type='button' className='primary-btn'><HiX /></button>
    <h1>Add new post</h1>
    <div>
    <input maxLength="30" type="text" placeholder='title' required
    id='title' value={title} onChange={onMutate} />
    </div>
    <div>
    <textarea maxLength="400" placeholder='message' id='messageText' value={messageText}
    onChange={onMutate}/>
    </div>
    <div>
    <input maxLength="100" type="text" placeholder='tags (separate with commas)'
    value={tagsText} id='tagsText' onChange={onMutate} />
    </div>
    <div>
      <input required type="file" onChange={(e)=>setFormData({...formData,selectedFile:e.target.files[0]})}/>
    </div>
    <button style={{marginTop:10}} className='primary-btn'>Create</button>
    {(isLoading || uploading)  && <h3>Uploading post..</h3>}
    </form>
    </div>
  )
}

export default CreatePost