import MongoDb from "../../../../util/db/db"
import User from "../../../../model/User"

MongoDb();

export async function DELETE(request, { params }) {

    request
    const id = await params.id

    console.log(id)

    const findUser = await User.findById(id)

    if (!findUser) {
        return Response.json({ message: "can not find user" })
    }
    await User.findByIdAndDelete(id);

    return Response.json({ message: "user delete successfully" })
}


export async function PUT(request, { params }) {
    const id = await params.id
    const data = await request.json()

    const findUser = await User.findById(id)
    if (!findUser) {
        return Response.json({ message: "can not find user" })
    }

    await User.findByIdAndUpdate(id, data)


    return Response.json({ message: "update successfully" })
}