import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/application/apply/:id  (student applies to a job)
router.post("/apply/:id", isAuthenticated, applyJob);

// GET  /api/application/get  (student: my applications)
router.get("/get", isAuthenticated, getAppliedJobs);

// GET  /api/application/:id/applicants  (recruiter: all applicants for a job)
router.get("/:id/applicants", isAuthenticated, getApplicants);

// POST /api/application/status/:id/update  (recruiter: accept/reject)
router.post("/status/:id/update", isAuthenticated, updateApplicationStatus);

export default router;
