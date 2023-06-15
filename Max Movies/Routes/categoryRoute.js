import express from "express"
import {requireSignIn} from "../middleware/authmiddleware.js"
import { createCategory, deleteCategory, showCategory, updateCategory } from "../Controllers/categoryController.js"

const router = express.Router()

router.post("/create-category",requireSignIn,createCategory)

router.put("/update-category/:id",requireSignIn,updateCategory)

router.get("/get-category",requireSignIn,showCategory)

router.delete("/delete-category/:id",requireSignIn,deleteCategory)


export default router