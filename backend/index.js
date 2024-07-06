import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js ";
import bookRoute from './routes/bookRoute.js';
import cors from "cors";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello World!");
  });
app.use('/books',bookRoute);

//middleware for handling cors policy
//option1:allow all origins with default of cors
//app.use(cors());
//option2:allow custom origins
//app.use(cors({
   // origin:'http://localhost:5000',
   // methods:['GET','POST','PUT','DELETE'],
   // alllowedHeaders:['Content-Type'],
//}))

mongoose.connect(process.env.URI, {}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
