import File from "../../../../model/File";
import connectDB from "../../../../util/db/db"
connectDB();


export async function DELETE(request, { params }) {
    request
    const id = await params.id

    console.log(id)

    const findPost = await File.findById(id)

    if (!findPost) {
        return Response.json({ message: "can not find post" })
    }
    await File.findByIdAndDelete(id);

    return Response.json({ message: "posts delete successfully" })
}

export async function PUT(request, { params }) {
    request
    const id = await params.id
    const { fileName, downloadURL } = await request.json();

    try {
        const findPost = await File.findById(id)

        if (!findPost) {
            return Response.json({ message: "can not find post" })
        }
        await File.findByIdAndUpdate(id, {
            filename: fileName,
            url: downloadURL,
        });

        return Response.json({ message: "posts update successfully" })
    } catch (error) {
        console.log(error)
    }
}