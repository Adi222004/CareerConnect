import Job from "../models/job.model.js";

// ─── POST JOB (Recruiter only) ────────────────────────────────────────────────
export const postJob = async (req, res) => {
  try {
    if (req.user.role !== "Recruiter") {
      return res.status(403).json({ success: false, message: "Only recruiters can post jobs." });
    }

    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

    if (!title || !description || !salary || !location || !jobType || !companyId) {
      return res.status(400).json({ success: false, message: "Please fill in all required job fields." });
    }

    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : requirements
      ? requirements.split(",").map((r) => r.trim()).filter(Boolean)
      : [];

    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: Number(salary),
      location,
      jobType,
      experience: Number(experience) || 0,
      position: Number(position) || 1,
      company: companyId,
      created_by: req.user.userId,
    });

    return res.status(201).json({ success: true, message: "Job posted successfully.", job });
  } catch (error) {
    console.error("Post job error:", error);
    return res.status(500).json({ success: false, message: "Server error posting job." });
  }
};

// ─── GET ALL JOBS (Students – with optional keyword search) ───────────────────
export const getAllJobs = async (req, res) => {
  try {
    const { keyword } = req.query;

    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
            { jobType: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(query)
      .populate("company")
      .populate("created_by", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ status: true, success: true, jobs });
  } catch (error) {
    console.error("Get all jobs error:", error);
    return res.status(500).json({ status: false, success: false, message: "Server error fetching jobs." });
  }
};

// ─── GET SINGLE JOB ───────────────────────────────────────────────────────────
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company")
      .populate({
        path: "applications",
        populate: { path: "applicant", select: "-password" },
      });

    if (!job) {
      return res.status(404).json({ success: false, status: false, message: "Job not found." });
    }

    return res.status(200).json({ success: true, status: true, job });
  } catch (error) {
    console.error("Get job by id error:", error);
    return res.status(500).json({ success: false, status: false, message: "Server error fetching job." });
  }
};

// ─── GET ADMIN JOBS (jobs posted by logged-in recruiter) ─────────────────────
export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ created_by: req.user.userId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ status: true, success: true, jobs });
  } catch (error) {
    console.error("Get admin jobs error:", error);
    return res.status(500).json({ status: false, success: false, message: "Server error fetching admin jobs." });
  }
};
