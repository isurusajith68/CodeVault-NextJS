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
    const isFeatured = searchParams.get("featured");
    const postLength = searchParams.get("lengthCheck");
    const page = searchParams.get("page");
    const pageSize = 4;

    try {
        if (page) {
            const posts = await Post.find().sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)
            return Response.json({ data: posts  }, { status: 200 })
        }

        if (postLength === "true") {
            const posts = await Post.find().sort({ createdAt: -1 })
            return Response.json({ data: posts.length }, { status: 200 })
        }

        if (isFeatured === "true") {
            const posts = await Post.find({ isFeatured: isFeatured }).sort({ createdAt: -1 })
            return Response.json({ data: posts }, { status: 200 })
        }

        const posts = await Post.find().sort({ createdAt: -1 }) 
        return Response.json({ data: posts }, { status: 200 })
        
    } catch (error) {
        console.log(error)
    }

}
