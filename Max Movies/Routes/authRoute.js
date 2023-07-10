import express from "express"
import { registerController, loginController } from "../Controllers/userController.js"
import { requireSignIn } from "../middleware/authmiddleware.js"

const router = express.Router()

router.post("/register",registerController)

router.post("/login",loginController)

router.get("/admin-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router