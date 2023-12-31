import Post from "@/model/postModel";

export async function GET(request, { params }) {
    
    const id = await params.id
    try {
       
        const post = await Post.findById(id).populate('comments');

        if (!post) {
            return Response.json({ message: 'Post not found' }, { status: 404 });
        }
     
        return Response.json(post.comments);

    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Internal Server  comment ' }, { status: 500 });
    }


}