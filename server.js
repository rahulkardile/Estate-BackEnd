import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/UserRoutes.js' 
import listingRouter from './routes/ListingRouter.js'

const app = express();

const Origin = "https://659fa83eca578a482093b054--extraordinary-belekoy-7126b7.netlify.app/"

app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: Origin }));

dotenv.config();
const PORT = process.env.PORT || 3100
const MONGO_URL = process.env.MONGOURL

try {
    mongoose.connect(MONGO_URL)
    .then(()=> console.log('Database is connected'))
} catch (error) {
console.log('Database is error ' + error);     
}

app.use("/api/user/", userRouter)
app.use('/api/listing/', listingRouter)

app.use((err, req, res, next ) => {
    const statusCode = err.statusCode || 400;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT} . . .`);
})
