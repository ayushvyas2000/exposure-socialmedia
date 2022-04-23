import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {editPost,getUserPosts} from '../../features/post/postSlice'
import {HiX} from 'react-icons/hi'
const EditPost = ({post,close}) => {
  const [formData, setFormData] = useState({
    title:post.title,
    messageText:post.message,
    tagsText:post.tags.join(','),

  })




  
  const {title,messageText,tagsText}=formData
  const dispatch=useDispatch()
  const {isLoading} = useSelector((state)=>state.post)

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const id=post._id
      await dispatch(editPost({
        postID:id,
        postData:{
          title,
          message:messageText,
          tags:tagsText!==''?tagsText.split(','):[],
        }
      
      }))
      await dispatch(getUserPosts())
  }

  const onMutate=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
    
  }



  return (
    <div className='addpost__container'>
    <form onSubmit={handleSubmit} className='form create-form'> 
      <button onClick={close} type='button' className='primary-btn'><HiX /></button>
    <h1>Edit post</h1>
    <div>
    <input maxLength="30" type="text" placeholder='title' required
    id='title' value={title} onChange={onMutate} tabIndex="1" />
    </div>
    <div>
    <textarea maxLength="400" placeholder='message' id='messageText' value={messageText}
    onChange={onMutate} tabIndex="2"/>
    </div>
    <div>
    <input maxLength="100" type="text" placeholder='tags (separate with commas)'
    value={tagsText} id='tagsText' onChange={onMutate} tabIndex="3"/>
    </div>
    <button style={{marginTop:10}} className='primary-btn'>Edit</button>
    {isLoading && <h3>Editing post..</h3>}
    </form>
    </div>
  )
}

export default EditPost