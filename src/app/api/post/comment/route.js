import Comment from "@/model/Comment";
import Post from "@/model/postModel";

export async function POST(request) {

    const { postId, author, comment } = await request.json();

    try {

        const post = await Post.findById(postId);

        if (!post) {
            return Response.json({ success: false, message: 'post not found' }, { status: 404 });
        }

        const newComment = new Comment({
            comment,
            author,
        });

        const savedComment = await newComment.save();
        post.comments.push(savedComment._id);
        await post.save();

        return Response.json({ success: true, message: 'comment add successfully', data: savedComment }, { status: 200 });

    } catch (error) {
        if (error.name === 'MongoError' && error.code === 50) {
            console.error('Error: Database operation timed out');
            return Response.json({ success: false, message: 'Database operation timed out' }, { status: 500 });
        } else {
            console.error('Error updating like count:', error);
            return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
        }
    }
}