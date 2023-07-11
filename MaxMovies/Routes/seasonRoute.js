import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createSeason, deleteSeason, updateSeason } from "../Controllers/seasonController.js"

const router = express.Router()

router.post("/create-season",requireSignIn,createSeason)

router.put("/update-season/:id",requireSignIn,updateSeason)

router.delete("/delete-season/:id",requireSignIn,deleteSeason)


export default router