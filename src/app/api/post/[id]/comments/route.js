import Post from "@/model/postModel";

export async function GET(request, { params }) {

    try {
        const id = await params.id
        console.log(id)

        const post = await Post.findById(id).populate('comments');
        if (!post) {
            return Response.json({ message: 'Post not found' });
        }
     
        return Response.json(post.comments);

    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Internal Server  comment ' });
    }


}