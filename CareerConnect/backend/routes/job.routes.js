import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/job/post
router.post("/post", isAuthenticated, postJob);

// GET  /api/job/get?keyword=...
router.get("/get", isAuthenticated, getAllJobs);

// GET  /api/job/getadminjobs
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// GET  /api/job/get/:id
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
