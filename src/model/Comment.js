import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    author: String
}, {
    timestamps: true
});

const Comment = mongoose.models.PostComments || mongoose.model('PostComments', commentSchema);
export default Comment;
