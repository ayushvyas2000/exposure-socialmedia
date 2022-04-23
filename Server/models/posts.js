const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags:{
        type:[String]
        
    },
    selectedFile: String,
    likedBy:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    likesCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    creatorPic:{
        type:String
    }
});

module.exports=mongoose.model('PostMessage',postSchema)