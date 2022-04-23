import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' 
import postService from './postService'

const initialState={
    post:null,
    posts:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    filters:{}
}

export const createPost=createAsyncThunk('posts/create',
async(postData,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token 
      return await postService.createPost(postData,token)  
    } catch (error) {
        const message=(error.response && error.response.data 
        && error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getPosts=createAsyncThunk('posts/get-all',
async(paramsObject,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token 
        return await postService.getPosts(paramsObject,token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const deletePost=createAsyncThunk('posts/delete',
async(postID,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await postService.deletePost(postID,token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const getUserPosts=createAsyncThunk('posts/get-userPosts',
async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token 
        return await postService.getUserPosts(token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const editPost=createAsyncThunk('posts/edit',
async({postID,postData},thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await postService.editPost(postID,postData,token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const likePost=createAsyncThunk('posts/like',
async(postID,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await postService.likePost(postID,token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const unlikePost=createAsyncThunk('posts/unlike',
async(postID,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await postService.unlikePost(postID,token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const getPost=createAsyncThunk('posts/single-post',
async(postID,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await postService.getPost(postID,token)
    } catch (error) {
        const message=(error.response && error.response.data 
            && error.response.data.message) ||
            error.message ||
            error.toString()
    
            return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        reset: (state)=>initialState,
        setFilters: (state,action)=>{
            return {
                ...state,
                filters:action.payload
            }
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createPost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createPost.fulfilled,(state)=>{
            state.isLoading=false
            state.isSuccess=true
        })
        .addCase(createPost.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(getPosts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPosts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.posts=action.payload
        })
        .addCase(getPosts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            console.log(action.payload._id)
            const newPosts=state.posts.filter((post)=>post._id!==action.payload._id)
            state.posts=newPosts

        })
        .addCase(getUserPosts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUserPosts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.posts=action.payload
        })
        .addCase(getUserPosts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(editPost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(editPost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
        })
        .addCase(editPost.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
           
            state.message=action.payload
        })
        .addCase(likePost.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
           
            state.message=action.payload
        })
        .addCase(unlikePost.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
           
            state.message=action.payload
        })
        .addCase(getPost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.post=action.payload
        })
        .addCase(getPost.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })

    }
})

export const {reset,setFilters} =postSlice.actions
export default postSlice.reducer