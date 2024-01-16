import MongoDb from "../../../util/db/db"
import User from "../../../model/User"
MongoDb();


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postLength = searchParams.get("lengthCheck");
    
    try {
      if(postLength === "true"){
        const users = await User.find().sort({ createdAt: -1 })
        return Response.json({ data: users.length }, { status: 200 })
      }

        const users = await User.find().sort({ createdAt: -1 })
        return Response.json({ data: users }, { status: 200 })

    } catch (error) {
        console.log(error)
    }
}
