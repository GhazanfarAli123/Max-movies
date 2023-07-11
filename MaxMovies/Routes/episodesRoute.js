import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { addEpisode, deleteEpisodes, getEpisodes, updateEpisodes } from "../Controllers/episodesController.js"

const router = express.Router()

router.post("/add-episodes",requireSignIn,addEpisode)

router.get("/get-episodes",getEpisodes)

router.put("/update-episodes/:id",requireSignIn,updateEpisodes)

router.delete("/delete-episodes/:id",requireSignIn,deleteEpisodes)

export default router