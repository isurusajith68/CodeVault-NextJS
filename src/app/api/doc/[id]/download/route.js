import File from "../../../../../model/File";

export async function POST(request, { params }) {
    const fileId = await params.id

    try {
        const file = await File.findById(fileId).maxTimeMS(5000);

        if (!file) {
            return Response.json({ success: false, message: 'file not found' }, { status: 404 });
        }

        file.downloadCount += 1;
        await file.save();

        return Response.json({ success: true, message: 'file updated' }, { status: 200 });

    } catch (error) {

    }
}