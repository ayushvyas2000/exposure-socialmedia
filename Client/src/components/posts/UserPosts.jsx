import React, { useEffect } from 'react'
import {getUserPosts,reset} from '../../features/post/postSlice'
import {useDispatch,useSelector} from 'react-redux'
import './Post.scss'
import Post from './Post'
import Spinner from '../spinner/Spinner'
const UserPosts = () => {
    const {posts}=useSelector((state)=>state.post)
    const dispatch=useDispatch()
    const auth=useSelector((state)=>state.auth)
    const {isSuccess,isLoading}=useSelector((state)=>state.post)
    useEffect(()=>{
            dispatch(getUserPosts())
        return ()=>{
            if (isSuccess) {
                dispatch(reset())
            }
        }
    },[dispatch])

    if (isLoading) {
        return <Spinner />
    }
  return (<>
  <main className='posts__list'>
    
    {posts.length>0?posts.map((post)=>(
        <Post key={post._id} post={post}  />
    )):
    <h3>No posts yet</h3>
    }
    </main>
    </>
  )
}

export default UserPosts