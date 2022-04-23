import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {MdEdit,MdDelete} from 'react-icons/md'
import EditPost from '../forms/EditPost'
import { useDispatch,useSelector } from 'react-redux' 
import {deletePost,likePost,unlikePost} from '../../features/post/postSlice'
import {FaHeart,FaRegHeart,FaShareAlt } from 'react-icons/fa'
const Post = ({post,normalpost,singlePost}) => {
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likesCount)
  const date=moment(post.createdAt)
  const [editToggle, setEditToggle] = useState(false)
 const dispatch =useDispatch()
 const {user}=useSelector((state)=>state.auth)
  const handleEdit=()=>{
    setEditToggle(true)
  }
  const handleDelete=()=>{
    dispatch(deletePost(post._id))
    
  }

  const handleLike=()=>{
    setLikeCount(likeCount+1)
    setLiked(true)
    dispatch(likePost(post._id))
  }

  const handleUnlike=()=>{
    setLikeCount(likeCount-1)
    setLiked(false)
    dispatch(unlikePost(post._id))
  }
  useEffect(()=>{
    setLiked(post.likedBy.includes(user._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (<>
  {normalpost?
    <article style={singlePost&& {marginTop:'2rem'}} className='post__card'>
      <div className='post__card-header'>
        <img src={post.creatorPic} alt="pic" />
        <h4>{post.creator}</h4>
        {singlePost &&
        <button onClick={()=>{navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=>{
            setShareLinkCopied(false)
        },2000)}}><FaShareAlt /></button>}
        {shareLinkCopied && <h3 style={{marginLeft:'10rem'}} className='link-copied'>Link Copied</h3>}
      </div>
      <div className="post__container">
        <Link className='post__image' to={`/post/${post._id}`}>
            <img style={singlePost && {objectFit:'contain',width:'100%'}} src={post.selectedFile} alt={post.title} />
        </Link>
        <div className="post__details">
        <div className="post__tags">
            {post.tags.length>0 && post.tags.map((tag,index)=>(
                <p key={tag+index}>#{tag}</p>
            ))
            }
        </div>
        <h3>{post.title}</h3>
        <p>{post.message && post.message}</p>
        </div>
        </div>
        <p className='date'><i>{`${date.format(("h:mm a , dddd, MMMM Do"))}`}</i></p>
        <div className="likes">
          {liked?<FaHeart onClick={handleUnlike} />
          :
          <FaRegHeart onClick={handleLike} />
          }
          <p>{likeCount}</p>
          </div>

        
    </article>
    :<>
    <div className='small__card'>
      <div className="small__card-image">
        <img src={post.selectedFile} alt={post.title} />
      </div>
      <h3>{post.title}</h3>
      <div className='button-group'>
            <button onClick={handleEdit} className='edit-btn'><MdEdit /></button>
            <button onClick={handleDelete} className='delete-btn'><MdDelete /></button>
      </div>
    </div>
    {editToggle && <EditPost post={post} close={()=>setEditToggle(false)} />}
    </>
    }
    </>
  )
}

export default Post