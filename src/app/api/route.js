import MongoDb from "../../util/db/db"

MongoDb();


export async function GET(request, response) {
    return Response.json({ ms: "s" })
}


