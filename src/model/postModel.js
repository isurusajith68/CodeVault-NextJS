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
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
    },

}, {
    timestamps: true
})

const Post = mongoose.models.Posts || mongoose.model('Posts', postSchema)
export default Post;