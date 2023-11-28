import MongoDb from "../../util/db/db"

MongoDb();


export function GET() {
    return Response.json({ ms: "s" })
}


