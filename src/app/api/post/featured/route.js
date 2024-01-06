import Post from "@/model/postModel"

export async function GET() {
    try {
        const posts = await Post.find({ isFeatured: true })
        return Response.json({ data: posts }, 200)
    } catch (error) {
        console.log(error)
    }
}