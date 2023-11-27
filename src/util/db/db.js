import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('mongo uri Not found');
}



export default async function connectDB() {
    try {
        const dbConnection = await mongoose.connect(MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        return dbConnection;

    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}