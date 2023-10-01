import mongoose, { ConnectOptions } from 'mongoose';
import { config } from '../config/config';

export const connectMongo = async () => {
    try {
        const options: ConnectOptions = {
            autoIndex: false,
            autoCreate: false,
            dbName: config.database.name
        }
        await mongoose.connect(config.database.uri, options)
        console.log("Connected to MongoDB")
    } catch(error) {
        console.log("MongoDB connection error", error)
        throw new Error("Unable to connect to MongoDB");
    }
}