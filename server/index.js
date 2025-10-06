import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
import { postWatchly, getAllWatchly, getWatchlySearch, getWatchlyById, updateWatchlyById, putWatchlyRatingById, deleteWatchlyById } from "./controllers/watchlys.js";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        if(conn){
            console.log("MongoDB connected");
        }}
        catch(err){
            console.error(`\n❌ MongoDB connection error: ${err.message}`);
        }
}

app.get("/health", (req, res) => {
    res.json({message: "Server is healthy" });
});

app.post("/watchly", postWatchly);

app.get("/watchly", getAllWatchly);

app.get("/watchly/search", getWatchlySearch);

app.get("/watchly/:id", getWatchlyById);

app.put("/watchly/:id", updateWatchlyById);

app.patch("/watchly/:id/rating", putWatchlyRatingById);

app.delete("/watchly/:id/delete", deleteWatchlyById);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on port ${PORT}`);
    connectDB();
});