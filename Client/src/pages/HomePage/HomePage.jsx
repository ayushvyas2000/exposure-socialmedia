import React, { useState } from 'react'
import {HiPlus} from 'react-icons/hi'
import CreatePost from '../../components/forms/CreatePost'
import PostFilters from '../../components/posts/PostFilters'
import Posts from '../../components/posts/Posts'


import './HomePage.scss'
const HomePage = () => {
    const [createToggle, setCreateToggle] = useState(false)
    
  return (
      <>
      <div className="homepage"></div>
    
      <PostFilters />
      
      <Posts />
      
        {!createToggle && 
        <div className="footer">
        <div onClick={()=>setCreateToggle(true)} className='addpost__button'>
            <HiPlus />
        </div>
        </div>}
        

        {createToggle &&
        <>
            <CreatePost toggleOff={()=>setCreateToggle(false)} />
            {/* <div className="footer">
            <div onClick={()=>setCreateToggle(false)} className="addpost__button">
            <HiX />
            </div>
            </div> */}
            </>
        }
      </>
  )
}

export default HomePage