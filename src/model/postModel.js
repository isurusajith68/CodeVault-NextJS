import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    value: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
    },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, {
    timestamps: true
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post;