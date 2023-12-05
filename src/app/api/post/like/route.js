import Post from "@/model/postModel";

export async function POST(request) {

    const { postId, userId } = await request.json();
    console.log(postId)
    try {

        const post = await Post.findById(postId);

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
        console.error('Error updating like count:', error);
        return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}