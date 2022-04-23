import React, { useEffect } from 'react'
import {getPosts} from '../../features/post/postSlice'
import {useDispatch,useSelector} from 'react-redux'
import './Post.scss'
import Post from './Post'
import Spinner from '../spinner/Spinner'
const Posts = () => {
    const {posts}=useSelector((state)=>state.post)
    const dispatch=useDispatch()
    const auth=useSelector((state)=>state.auth)
    const {isLoading,filters}=useSelector((state)=>state.post)
    
    useEffect(()=>{
            dispatch(getPosts(filters))
    },[dispatch,auth,filters])

    if (isLoading) {
        return <Spinner />
    }
  return (
    
  <main className='posts__container'>
      
    {posts.map((post)=>(
        <Post key={post._id} post={post} normalpost={true} />
    ))}
    </main>
  )
}

export default Posts