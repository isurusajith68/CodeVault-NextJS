import { getServerSession } from "next-auth";
import MongoDb from "../../../util/db/db"
import authOption from "../../api/auth/[...nextauth]/route"
import File from "../../../model/File"

MongoDb();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const fileLength = searchParams.get("lengthCheck");
    const searchText = searchParams.get("q");
    try {

       if(fileLength === "true"){
        const files = await File.find().sort({ createdAt: -1 })
        return Response.json({ data: files.length }, { status: 200 })
        }

        if (searchText) {
            const files = await File.find({
                filename: {
                    $regex: searchText,
                    $options: "i"
                }
            }).sort({ createdAt: -1 })
            return Response.json({ data: files }, { status: 200 })
        }

        const files = await File.find().sort({ createdAt: -1 })
        return Response.json({ data: files }, { status: 200 })

    } catch (error) {
        console.log(error)
    }
}

export async function POST(request) {
    const session = await getServerSession(authOption)

    const { fileName, downloadURL } = await request.json();

    try {
        const checkExistFile = await File.findOne({ filename: fileName })
        if (checkExistFile) {
            return Response.json({ status: false, message: "File name already exist" }, { status: 400 })
        }

        if (fileName && downloadURL && session) {
            const uploadFile = await File.create({
                filename: fileName,
                url: downloadURL,
                uploader: session.user.name,
            })
            return Response.json({ data: uploadFile, status: true, message: "Upload file successfully" }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
    }
}
