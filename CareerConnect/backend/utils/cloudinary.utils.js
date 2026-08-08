import cloudinary from "../config/cloudinary.js";
import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

/**
 * Converts a multer memory-buffer file to a DataURI string
 * and uploads it to Cloudinary.
 *
 * @param {Object} file  - multer file object (from req.file)
 * @param {string} folder - Cloudinary folder to upload to
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (file, folder = "careerconnect") => {
  const ext = path.extname(file.originalname);
  const fileContent = parser.format(ext, file.buffer);

  const result = await cloudinary.uploader.upload(fileContent.content, {
    folder,
    resource_type: "auto",
  });

  return result;
};
