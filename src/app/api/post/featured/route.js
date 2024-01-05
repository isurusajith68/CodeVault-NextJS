import Post from "@/model/postModel"

export async function GET(request) {
    const posts = await Post.find().find({ isFeatured: true })

    return Response.json({ data: posts })
}