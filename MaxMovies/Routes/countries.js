import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createCountry, deleteCountry, getCountry, updateCountry ,getcountrybyslug} from "../Controllers/countriesController.js"


const router = express.Router()

router.post("/create-country",requireSignIn,createCountry)

router.put("/update-country/:id",requireSignIn,updateCountry)

router.get("/get-country",getCountry)

router.get("/get-country/:slug",getcountrybyslug)

router.delete("/delete-country/:id",requireSignIn,deleteCountry )


export default router