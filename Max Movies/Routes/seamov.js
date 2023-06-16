import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createSeaMov, deleteSeaMov, getSeaMov, getSeaMovPhoto, getSeaMovSlug } from "../Controllers/seamovController.js"
import formidable from "express-formidable"

const router = express.Router()

router.post("/create-seamov",requireSignIn,formidable(),createSeaMov)

router.get("/sea-photo/:id",getSeaMovPhoto)

router.get("/get-seaMovs",getSeaMov)

router.get("/get-seaMov/:slug",getSeaMovSlug)

router.delete("/delete-seamov/:id",requireSignIn,deleteSeaMov)



export default router