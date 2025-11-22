import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        mongoose.connection.on('connected', ()=>{
            console.log('Connected to MongoDB')
        })
        mongoose.connection.on('error', (err)=>{
            console.log('MongoDB connection error:', err.message)
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB disconnected')
        })
        
        // MongoDB URI - use as is (it already includes database name 'onecart')
        const mongoUri = process.env.MONGODB_URI;
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 60000, // 60 seconds
            socketTimeoutMS: 60000,
            connectTimeoutMS: 60000,
            maxPoolSize: 10,
            minPoolSize: 1,
            retryWrites: true,
            w: 'majority',
            bufferCommands: false // Disable mongoose buffering to prevent timeout errors
        })
        console.log('MongoDB connection established')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        console.log('Server will continue running but database operations may fail')
    }
}

export default connectDB;