import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createCountry, deleteCountry, getCountry, updateCountry } from "../Controllers/countriesController.js"
import { deleteCategory } from "../Controllers/categoryController.js"

const router = express.Router()

router.post("/create-country",requireSignIn,createCountry)

router.put("/update-country/:id",requireSignIn,updateCountry)

router.get("/get-country",requireSignIn,getCountry)

router.delete("/delete-country/:id",requireSignIn,deleteCountry )


export default router