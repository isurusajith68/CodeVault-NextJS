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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComments',
    }],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
}, {
    timestamps: true
})

const Post = mongoose.models.PostAll ?? mongoose.model('PostAll', postSchema);
export default Post;