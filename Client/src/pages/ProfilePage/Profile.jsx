import React, { useState } from 'react'
import UserPosts from '../../components/posts/UserPosts'
import EditPost from '../../components/forms/EditPost'
import {HiX,HiPlus} from 'react-icons/hi'
import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'
const Profile = () => {
  const [createToggle, setCreateToggle] = useState(false)
  return (
    <>
    <h1 className="head-text">Profile</h1>
    <ProfileContainer />
    <h1 className='head-text'> My Posts</h1>
    <UserPosts />
</>
  )
}

export default Profile