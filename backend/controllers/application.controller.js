import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// ─── APPLY TO JOB (Student) ───────────────────────────────────────────────────
export const applyJob = async (req, res) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({ success: false, message: "Only students can apply for jobs." });
    }

    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    const existing = await Application.findOne({ job: jobId, applicant: userId });
    if (existing) {
      return res.status(409).json({ success: false, message: "You have already applied for this job." });
    }

    const application = await Application.create({ job: jobId, applicant: userId });

    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({ success: true, message: "Application submitted successfully!", application });
  } catch (error) {
    console.error("Apply job error:", error);
    return res.status(500).json({ success: false, message: "Server error submitting application." });
  }
};

// ─── GET APPLIED JOBS (Student) ───────────────────────────────────────────────
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
      });

    return res.status(200).json({ success: true, application: applications });
  } catch (error) {
    console.error("Get applied jobs error:", error);
    return res.status(500).json({ success: false, message: "Server error fetching applied jobs." });
  }
};

// ─── GET APPLICANTS FOR A JOB (Recruiter) ────────────────────────────────────
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", select: "-password" },
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    return res.status(200).json({ success: true, applicants: job });
  } catch (error) {
    console.error("Get applicants error:", error);
    return res.status(500).json({ success: false, message: "Server error fetching applicants." });
  }
};

// ─── UPDATE APPLICATION STATUS (Recruiter) ───────────────────────────────────
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required." });
    }

    const allowedStatuses = ["Pending", "Accepted", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowedStatuses.join(", ")}` });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({ success: true, message: `Application ${status}.`, application });
  } catch (error) {
    console.error("Update status error:", error);
    return res.status(500).json({ success: false, message: "Server error updating status." });
  }
};
