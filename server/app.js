import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {config} from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.route.js';
import errorMiddleware from './middleware/error.middleware.js';
config();

const app = express () ;

app.use (express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    CredentialS: true
}));

app.use(cookieParser ());

app.use(morgan('dev'));

app.use('/ping',  function(req, res){
    res.send ('Pong');

});

//routes of 3 module
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.all('*', (req, res) =>{
    res.status (404).send ('OOPs!! 404 page not found');
});

app.use (errorMiddleware);

export default app;