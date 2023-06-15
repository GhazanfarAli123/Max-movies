import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createGernse, deleteGernse, getGernse, updateGernse } from "../Controllers/gernseController.js"

const router = express.Router()

router.post("/create-gernse",requireSignIn,createGernse)

router.put("/update-gernse/:id",requireSignIn,updateGernse)

router.get("/get-gernse/",getGernse)

router.delete("/delete-gernse/:id",requireSignIn,deleteGernse)


export default router