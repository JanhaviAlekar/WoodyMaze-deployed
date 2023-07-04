import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';

const connnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_url);
        console.log(`mongo server connected at ${conn.connection.host}`);
    } catch (error) {
        console.log(`mongoDB server not connected ${error}`);
    }
};

export default connnectDB;