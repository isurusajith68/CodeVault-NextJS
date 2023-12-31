import Post from "@/model/postModel";

export async function GET(request, { params }) {
    const id = await params.id;

    try {
        const post = await Post.findById(id).populate('comments');

        if (!post) {
            console.log('Post not found:', id);
            return Response.json({ message: 'Post not found' }, { status: 404 });
        }

        console.log('Comments fetched successfully:', post.comments);
        return Response.json(post.comments);

    } catch (error) {
        console.error('Error fetching comments:', error);
        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
