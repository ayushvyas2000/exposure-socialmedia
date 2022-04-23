import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getPost,reset } from '../../features/post/postSlice'
import Spinner from '../../components/spinner/Spinner'
import Post from '../../components/posts/Post'
import './SinglePost.scss'
const SinglePost = () => {
    const {id}=useParams()
    const {post,isLoading,isSuccess}=useSelector((state)=>state.post)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getPost(id))
      return ()=>{
        if (isSuccess) {    
            dispatch(reset())
        }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,isSuccess])
  if (isLoading ) {
    return <Spinner />
  }
  return (
    <>
    {post &&
    <Post singlePost={true} post={post} normalpost={true}/>
    }
    </>
  )
}

export default SinglePost