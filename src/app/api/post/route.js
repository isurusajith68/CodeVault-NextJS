import connectDB from "../../../util/db/db"
import Post from "../../../model/postModel"
connectDB();

export async function POST(request) {

    const body = await request.json();
    const data = await Post.create(body)

    return Response.json({ message: "Post Create succefully" })
}

export async function GET(request) {

    const posts = await Post.find()

    return Response.json({ data: posts })
}
