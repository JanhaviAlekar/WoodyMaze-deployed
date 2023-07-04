import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connnectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import cors from "cors"
import path from "path"
import { fileUrlToPath } from 'url';
//configure env
dotenv.config();

// database config
connnectDB();

//rest object
const app = express();
//es-6 module
const __filename = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')))
//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoute)
//rest api
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})