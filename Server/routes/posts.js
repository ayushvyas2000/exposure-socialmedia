const express=require('express')
const router=express.Router();
const {protect}=require('../middleware/authMiddleware')
const {getPosts,createPost,getUserPosts,deletePost,updatePost,likePost,unlikePost, getPost}=require('../controllers/posts')

router.route('/').get(protect,getPosts).post(protect,createPost)
router.get('/userPosts',protect,getUserPosts)
router.route('/:id').delete(protect,deletePost).put(protect,updatePost).get(protect,getPost)
router.route('/:id/like').put(protect,likePost)
router.route('/:id/unlike').put(protect,unlikePost)

module.exports=router