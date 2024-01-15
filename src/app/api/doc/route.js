import { getServerSession } from "next-auth";
import MongoDb from "../../../util/db/db"
import authOption from "../../api/auth/[...nextauth]/route"
import File from "../../../model/File"

MongoDb();

export async function GET() {
    try {
        
        const data =await File.find().sort({ createdAt: -1 })
        return Response.json({ data, status: true, message: "Get file successfully" }, { status: 200 })

    } catch (error) {
        console.log(error)
    }
}

export async function POST(request) {
    const session = await getServerSession(authOption)

    const { fileName, downloadURL } = await request.json();

    if (fileName && downloadURL && session) {
        const uploadFile = await File.create({
            filename: fileName,
            url: downloadURL,
            uploader: session.user.name,
        })
        return Response.json({ data: uploadFile, status: true, message: "Upload file successfully" }, { status: 200 })
    }
}
