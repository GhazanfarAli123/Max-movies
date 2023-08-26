import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createSeaMov, deleteSeaMov, getSeaMov, getSeaMovCat, getSeaMovPhoto, getSeaMovSlug, getSeaMovid, updateSeaMov } from "../Controllers/seamovController.js"
import formidable from "express-formidable"

const router = express.Router()

router.post("/create-seamov",requireSignIn,formidable(),createSeaMov)

router.get("/sea-photo/:id",getSeaMovPhoto)

router.get("/get-seaMovs",getSeaMov)

router.get("/get-seaMov/:slug",getSeaMovSlug)

router.get("/get-seaMovs/:category",getSeaMovCat)

router.get("/get-seaMovis/:id",getSeaMovid)

router.delete("/delete-seamov/:id",requireSignIn,deleteSeaMov)

router.put("/update-seamov/:id",requireSignIn,formidable(),updateSeaMov)


export default router