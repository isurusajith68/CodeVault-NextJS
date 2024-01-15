import mongoose from 'mongoose';
const fileSchema = new mongoose.Schema({
    filename: String,
    url: String,
    size: Number,
    downloadCount: {
        type: Number,
        default: 0
    },
    uploader: {
        type: String,
    },
    tags: [String],
});

export default mongoose.models.File || mongoose.model('File', fileSchema);