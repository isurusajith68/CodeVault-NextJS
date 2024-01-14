import mongoose from 'mongoose';
const fileSchema = new mongoose.Schema({
    filename: String,
    cloudinary_id: String,
    url: String,
});

export default mongoose.models.File || mongoose.model('File', fileSchema);