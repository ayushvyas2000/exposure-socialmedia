const asyncHandler=require('express-async-handler')
const PostMessage=require('../models/posts')
const User=require('../models/users')



const getPosts=asyncHandler(async(req,res)=>{
    
    const {sortBy,searchBy,searchTerm}=req.query
    const user=await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (searchBy==='title') {
        const posts=await PostMessage.find({title:{$regex:searchTerm,$options: "i"}}).sort(sortBy?sortBy:'-createdAt') 
        return res.status(200).json(posts)
    }
    if (searchBy==='tags') {
        const posts=await PostMessage.find({tags:{$regex:searchTerm,$options: "i"}}).sort(sortBy?sortBy:'-createdAt') 
        return res.status(200).json(posts)
    }
    
    const posts=await PostMessage.find().sort(sortBy?sortBy:'-createdAt') 
    return res.status(200).json(posts)


})

const getPost=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }



    const post=await PostMessage.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }
    res.status(200).json(post)
})

const createPost=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const post=req.body
    if (!post.title || !post.selectedFile) {
        
        throw new Error('Please add title and image for the post')
    }
    const newPost=await PostMessage.create({
        ...post,
    })

    res.status(201).json(newPost)
})

const getUserPosts=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const posts=await PostMessage.find({userRef:req.user.id}).sort("-createdAt")
    res.status(200).json(posts)
})

const deletePost=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const post=await PostMessage.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error('Post Not Found')
    }

    if (post.userRef.toString()!==req.user.id) {
        
        res.status(401)
        throw new Error('Not Authorized')
    }
    await post.remove()
    res.status(200).json(post)
})

const updatePost=asyncHandler(async(req,res)=>{
   
    const user=await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const post=await PostMessage.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error('Post Not Found')
    }

    if (post.userRef.toString()!==req.user.id) {
        
        res.status(401)
        throw new Error('Not Authorized')
    }
    const updates=req.body
    const updatedPost=await PostMessage.findByIdAndUpdate(req.params.id,updates,{new:true})
    res.status(201).json(updatedPost)
})

const likePost=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const post=await PostMessage.findByIdAndUpdate(req.params.id,{
        $push:{likedBy:req.user.id},
        $inc:{likesCount:1}
    },{
        new:true
    })  

    if (!post) {
        res.status(404)
        throw new Error('Post Not Found')
    }

    res.status(201).json(post)
})

const unlikePost=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const post=await PostMessage.findByIdAndUpdate(req.params.id,{
        $pull:{likedBy:req.user.id},
        $inc:{likesCount:-1}
    },{
        new:true
    })

    if (!post) {
        res.status(404)
        throw new Error('Post Not Found')
    }

    res.status(201).json(post)
})
module.exports={
    getPosts,
    createPost,
    getUserPosts,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
    getPost
}