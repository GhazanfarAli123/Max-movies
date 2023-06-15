import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createSeaMov, getSeaMovPhoto } from "../Controllers/seamovController.js"
import formidable from "express-formidable"

const router = express.Router()

router.post("/create-seamov",requireSignIn,formidable(),createSeaMov)

router.get("/product-photo/:pid",getSeaMovPhoto)

router.put("/update-seamov/:id",requireSignIn)

router.delete("/delete-seamov/:id",requireSignIn)

router.get("/get-seamov/:id",requireSignIn)


export default router