import connectDB from "../../../util/db/db"
import Post from "../../../model/postModel"
connectDB();

export async function POST(request) {

    const body = await request.json();

    await Post.create(body)

    return Response.json({ message: "Post Create succefully" })
}

export async function GET(request) {

    const { featured } = request.query;
    const query = featured ? { featured: true } : {};
    
    try {
        const posts = await Post.find(query).sort({ createdAt: -1 });
        return Response.json({ data: posts });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'An error occurred while fetching posts' }, { status: 500 });
    }
}
