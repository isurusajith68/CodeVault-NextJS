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

const File = mongoose.models.Files ?? mongoose.model('Files', fileSchema);
export default File;

