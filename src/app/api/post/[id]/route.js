import connectDB from "../../../../util/db/db"
import Post from "../../../../model/postModel"
connectDB();

export async function DELETE(request, { params }) {

    const id = await params.id

    const findPost = await Post.findById(id)

    if (!findPost) {
        return Response.json({ message: "can not find post" })
    }
    const data = await Post.findByIdAndDelete(id);

    return Response.json({ message: "posts delete successfully" })
}

export async function GET(request, { params }) {

    const id = await params.id

    const findPost = await Post.findById(id)

    return Response.json({ data: findPost })
}

export async function PUT(request, { params }) {
    const id = await params.id
    const data = await request.json()

    const findPost = await Post.findById(id)
    if (!findPost) {
        return Response.json({ message: "can not find post" })
    }

    const updatePost = await Post.findByIdAndUpdate(id, data)


    return Response.json({ message: "update successfully" })

}