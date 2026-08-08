import express from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// POST /api/company/register
router.post("/register", isAuthenticated, registerCompany);

// GET  /api/company/get
router.get("/get", isAuthenticated, getCompanies);

// GET  /api/company/get/:id
router.get("/get/:id", isAuthenticated, getCompanyById);

// PUT  /api/company/update/:id
router.put("/update/:id", isAuthenticated, upload.single("file"), updateCompany);

export default router;
