import connectDB from "../../../util/db/db"
import Post from "../../../model/postModel"

connectDB();

export async function POST(request) {

    const body = await request.json();

    await Post.create(body)

    return Response.json({ message: "Post Create succefully" })
}

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const siteCategory = searchParams.get("featured");

    try {
        if (!siteCategory) {
            const posts = await Post.find().sort({ createdAt: -1 })
            return Response.json({ data: posts }, { status: 200 })
        }

        const posts = await Post.find({ isFeatured: siteCategory }).sort({ createdAt: -1 })

        return Response.json({ data: posts }, { status: 200 })
    } catch (error) {
        console.log(error)
    }

}
