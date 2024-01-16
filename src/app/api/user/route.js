import MongoDb from "../../../util/db/db"
import User from "../../../model/User"
MongoDb();


export async function GET() {
    
    try {
        const users = await User.find().select('-password');
        return Response.json({ status: true, data: users })

    } catch (error) {
        console.log(error)
    }
}
