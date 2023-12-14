import Post from "@/model/postModel";

export async function POST(request) {

    const { postId, userId } = await request.json();

    try {

        const post = await Post.findById(postId).maxTimeMS(5000);

        if (!post) {
            return Response.json({ success: false, message: 'post not found' }, { status: 404 });
        }
        if (!post.likedBy) {
            post.likedBy = [];
        }

        if (!post.likedBy.includes(userId)) {

            post.likes += 1;


            post.likedBy.push(userId);


            await post.save();

            return Response.json({ success: true, message: 'post liked successfully' }, { status: 200 });
        } else {
            post.likes -= 1;

            post.likedBy.remove(userId);

            await post.save();

            return Response.json({ success: true, message: 'post unliked successfully' }, { status: 200 });
        }
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