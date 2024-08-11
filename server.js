import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connnectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import cors from "cors"
import path from 'path'
import { fileURLToPath } from 'url';
//configure env
dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// database config
connnectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//client
app.use(express.static(path.join(__dirname,'/client/build')))

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoute)


app.get("*",(req,res)=> res.sendFile(path.join(__dirname,'/client/build/index.html')))
//rest api
app.get("/", (req, res) => {
    res.send({
        message: "welcome to ecommmerce app"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})