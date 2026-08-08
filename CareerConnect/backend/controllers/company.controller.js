import Company from "../models/company.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// ─── REGISTER COMPANY ─────────────────────────────────────────────────────────
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName || !companyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    // Check if a company with same name already exists
    const existing = await Company.findOne({
      name: { $regex: new RegExp(`^${companyName.trim()}$`, "i") },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A company with this name already exists.",
      });
    }

    const company = await Company.create({
      name: companyName.trim(),
      userId: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully.",
      company,
    });
  } catch (error) {
    console.error("Register company error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error registering company." });
  }
};

// ─── GET ALL COMPANIES (for logged-in recruiter) ──────────────────────────────
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Get companies error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching companies." });
  }
};

// ─── GET SINGLE COMPANY ───────────────────────────────────────────────────────
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }
    return res.status(200).json({ success: true, company });
  } catch (error) {
    console.error("Get company by id error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching company." });
  }
};

// ─── UPDATE COMPANY ───────────────────────────────────────────────────────────
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    // Ensure only the owner can update
    if (company.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this company.",
      });
    }

    if (name) company.name = name;
    if (description !== undefined) company.description = description;
    if (website !== undefined) company.website = website;
    if (location !== undefined) company.location = location;

    // Upload logo if provided
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file,
        "careerconnect/company-logos"
      );
      company.logo = result.secure_url;
    }

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      company,
    });
  } catch (error) {
    console.error("Update company error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error updating company." });
  }
};
