import MongoDb from "../../util/db/db"

MongoDb();


export async function GET() {
    return Response.json({ ms: "s" })
}


