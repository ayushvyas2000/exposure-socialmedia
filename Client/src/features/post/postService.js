import axios from 'axios'
const url='https://exposure-api-v1.herokuapp.com/posts/'

const createPost=async(postData,token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.post(url,postData,config)
    return response.data
}

const getPosts=async(paramsObject,token)=>{
    
    let config={
        headers:{Authorization: `Bearer ${token}`},
        params:paramsObject
    }
    const response=await axios.get(url,config)
    return response.data
}

const deletePost=async(postID,token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.delete(url+postID,config)
    return response.data
}

const getUserPosts=async(token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.get(url+'userPosts',config)
    return response.data
}

const editPost=async(postID,postData,token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.put(url+postID,postData,config)
    return response.data
}

const likePost=async(postID,token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.put(`${url+postID}/like`,{},config)
    return response.data
}

const unlikePost=async(postID,token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.put(`${url+postID}/unlike`,{},config)
    return response.data
}

const getPost=async(postID,token)=>{
    const config={
        headers:{Authorization: `Bearer ${token}`}
    }

    const response=await axios.get(url+postID,config)
    return response.data
}


const postService={
    createPost,
    getPosts,
    deletePost,
    getUserPosts,
    editPost,
    likePost,
    unlikePost,
    getPost
}

export default postService