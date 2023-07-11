import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from './Routes/authRoute.js'
import gernse from "./Routes/gernseRoute.js";
import category from "./Routes/categoryRoute.js";
import episode from "./Routes/episodesRoute.js";
import season from "./Routes/seasonRoute.js"
import movie from "./Routes/moviesRoute.js"
import countries from "./Routes/countries.js"
import seamov from "./Routes/seamov.js"

dotenv.config()

connectDb()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/api/v1/auth",authRouter)
app.use("/api/v1/gernse",gernse)
app.use("/api/v1/category",category)
app.use("/api/v1/episode",episode)
app.use("/api/v1/season",season)
app.use("/api/v1/movie",movie)
app.use("/api/v1/country",countries)
app.use("/api/v1/seamov",seamov)

app.get('/' , (req,res)=>{
    res.send("hallo world")
})


const PORT = process.env.PORT || 1000

app.listen(PORT,()=>{
    console.log("server is running on " + PORT)
})