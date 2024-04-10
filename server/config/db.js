import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        // console.log('Connected to db');
    } catch (error) {
        console.log(`Error with db: ${error}`);
    }
}

export default connectDB;