import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/logout", logout);          // Navbar calls POST /logout
router.post("/profile/update", isAuthenticated, upload.single("file"), updateProfile);

export default router;
