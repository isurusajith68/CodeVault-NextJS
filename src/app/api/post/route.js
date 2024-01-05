import connectDB from "../../../util/db/db"
import Post from "../../../model/postModel"
connectDB();

export async function POST(request) {

    const body = await request.json();

    await Post.create(body)

    return Response.json({ message: "Post Create succefully" })
}

export async function GET() {

    const posts = await Post.find().sort({ createdAt: -1 })

    return Response.json({ data: posts })
}
