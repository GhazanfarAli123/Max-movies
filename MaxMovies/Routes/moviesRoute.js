import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createMovie, deleteMovie, getMovie, updateMovie } from "../Controllers/movieController.js"
import { deleteModel } from "mongoose"

const router = express.Router()

router.post("/create-movies",requireSignIn,createMovie)

router.get("/get-movies",getMovie)

router.put("/update-movies/:id",requireSignIn,updateMovie)

router.delete("/delete-movies/:id",requireSignIn,deleteMovie)

export default router