import Post from "../../../../../model/postModel";

export async function POST(request, { params }) {
    const postId  = await params.id
  
    try {
        const post = await Post.findById(postId).maxTimeMS(5000);

        if (!post) {
            return Response.json({ success: false, message: 'post not found' }, { status: 404 });
        }

        post.views += 1;
        await post.save();

        return Response.json({ success: true, message: 'post updated' }, { status: 200 });

    } catch (error) {

    }
}