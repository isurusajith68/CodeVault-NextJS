import Comment from "@/model/Comment";
import Post from "@/model/postModel";

export async function GET(request, { params }) {
    const id = await params.id;

    try {
        const post = await Post.findById(id).populate('comments');

        if (!post) {
            return Response.json({ message: 'Post not found' }, { status: 404 });
        }

        return Response.json(post.comments);

    } catch (error) {
        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


//delete comment
export async function DELETE(request, { params }) {

    const commentId = await params.id;

    try {

        const comment = Comment.findById(commentId);
        if (!comment) {
            return Response.json({ message: 'Comment not found' }, { status: 404 });
        }

        await Comment.findByIdAndDelete(commentId);

        return Response.json({ message: 'Comment deleted successfully' }, { status: 200 });

    } catch (error) {

        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}
