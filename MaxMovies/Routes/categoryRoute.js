import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createCategory, deleteCategory, getCatBySlug, showCategory, updateCategory } from "../Controllers/categoryController.js"

const router = express.Router()

router.post("/create-category",requireSignIn,createCategory)

router.put("/update-category/:id",requireSignIn,updateCategory)

router.get("/get-category",showCategory)

router.get("/get-category/:slug",getCatBySlug)

router.delete("/delete-category/:id",requireSignIn,deleteCategory)

export default router