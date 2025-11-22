import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000

// Connect to database (non-blocking, but log status)
connectDB().catch(err => {
    console.error('Database connection error:', err.message)
    console.log('Server will continue running but database operations may fail')
    console.log('Please check:')
    console.log('  1. MongoDB Atlas IP whitelist includes your IP')
    console.log('  2. Internet connectivity')
    console.log('  3. MongoDB Atlas cluster status')
});

connectCloudinary();

// middlewares
app.use(express.json())

// CORS configuration for production and development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // In development, allow all localhost origins
    if (process.env.NODE_ENV !== 'production') {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
    }
    
    // List of allowed origins for production
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== 'production') {
      // In development, allow all origins
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, ()=> {
    console.log('Server started on port: ' + port)
    console.log('API available at http://localhost:' + port)
});

// Handle uncaught errors to prevent server crash
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message)
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message)
});