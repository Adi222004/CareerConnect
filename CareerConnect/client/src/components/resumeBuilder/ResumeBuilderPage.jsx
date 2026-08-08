import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ResumeBuilderPage.css";

const SECTIONS = [
  "Personal",
  "Education",
  "Experience",
  "Projects",
  "Skills",
  "Certifications",
];

const defaultResume = {
  title: "My Resume",
  template: "modern",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  experienceType: "fresher", 
  projects: [],
  skills: [],
  certifications: [],
};

const ResumeBuilderPage = () => {
  const [resume, setResume] = useState(defaultResume);
  const [activeSection, setActiveSection] = useState("Personal");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const savedResume = localStorage.getItem("careerconnect_resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
    if (user) {
      setResume((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          fullName: user?.fullname || "",
          email: user?.email || "",
        },
      }));
    }
    setLoading(false);
  }, [user]);

  const saveResume = async () => {
    setSaving(true);
    try {
      localStorage.setItem("careerconnect_resume", JSON.stringify(resume));
      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => window.print();

  // --- Update Handlers ---
  const updatePersonalInfo = (key, value) => {
    setResume({ ...resume, personalInfo: { ...resume.personalInfo, [key]: value } });
  };

  const updateEducation = (index, key, value) => {
    const updated = resume.education.map((item, i) => i === index ? { ...item, [key]: value } : item);
    setResume({ ...resume, education: updated });
  };

  const updateExperience = (index, key, value) => {
    const updated = resume.experience.map((item, i) => i === index ? { ...item, [key]: value } : item);
    setResume({ ...resume, experience: updated });
  };

  const updateProject = (index, key, value) => {
    const updated = resume.projects.map((item, i) => i === index ? { ...item, [key]: value } : item);
    setResume({ ...resume, projects: updated });
  };

  const updateSkill = (index, value) => {
    const updated = resume.skills.map((s, i) => i === index ? value : s);
    setResume({ ...resume, skills: updated });
  };

  const updateCertificate = (index, key, value) => {
    const updated = resume.certifications.map((item, i) => i === index ? { ...item, [key]: value } : item);
    setResume({ ...resume, certifications: updated });
  };

  // --- Add Handlers ---
  const addEducation = () => setResume({ ...resume, education: [...resume.education, { institution: "", degree: "", field: "" }] });
  const addExperience = () => setResume({ ...resume, experience: [...resume.experience, { company: "", role: "", duration: "", description: "" }] });
  const addProject = () => setResume({ ...resume, projects: [...resume.projects, { title: "", link: "", description: "" }] });
  const addSkill = () => setResume({ ...resume, skills: [...resume.skills, ""] });
  const addCertificate = () => setResume({ ...resume, certifications: [...resume.certifications, { name: "", link: "" }] });

  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;

  return (
    <div className="resume-builder-page">
      <div className="rb-topbar">
        <div className="rb-topbar-left">
          <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-[#6B3AC2]">Career</span>
              <span className="text-[#FA4F09]">Connect</span>
          </h1>
          <p>Build your professional resume with ease</p>
        </div>
        <div className="rb-topbar-actions">
          <button className="btn btn-secondary" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? "✏️ Edit" : "👁 Preview"}
          </button>
          <button className="btn btn-secondary" onClick={handlePrint}>🖨 Print</button>
          <button className="btn btn-primary" onClick={saveResume} disabled={saving}>
            {saving ? "Saving..." : "💾 Save Resume"}
          </button>
        </div>
      </div>

      <div className={`rb-layout ${previewMode ? "preview-only" : ""}`}>
        {!previewMode && (
          <div className="rb-editor">
            <div className="rb-sections-nav">
              {SECTIONS.map((s) => (
                <button
                  key={s}
                  className={`rb-nav-btn ${activeSection === s ? "active" : ""}`}
                  onClick={() => setActiveSection(s)}
                >{s}</button>
              ))}
            </div>

            <div className="rb-form-area">
              {activeSection === "Personal" && (
                <div className="form-grid">
                  <div className="form-group span-2">
                    <label className="form-label">Full Name *</label>
                    <input className="form-control" value={resume.personalInfo.fullName} onChange={(e) => updatePersonalInfo("fullName", e.target.value)} placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-control" value={resume.personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-control" value={resume.personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input className="form-control" value={resume.personalInfo.location} onChange={(e) => updatePersonalInfo("location", e.target.value)} placeholder="City, Country" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn ID</label>
                    <input className="form-control" value={resume.personalInfo.linkedin} onChange={(e) => updatePersonalInfo("linkedin", e.target.value)} placeholder="linkedin.com/in/username" />
                  </div>
                  <div className="form-group span-2">
                    <label className="form-label">GitHub ID</label>
                    <input className="form-control" value={resume.personalInfo.github} onChange={(e) => updatePersonalInfo("github", e.target.value)} placeholder="github.com/username" />
                  </div>
                  <div className="form-group span-2">
                    <label className="form-label">Professional Summary</label>
                    <textarea className="form-control" rows="4" value={resume.personalInfo.summary} onChange={(e) => updatePersonalInfo("summary", e.target.value)} />
                  </div>
                </div>
              )}

              {activeSection === "Education" && (
                <div>
                  {resume.education.map((ed, i) => (
                    <div key={i} className="list-item-form">
                      <input className="form-control" value={ed.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} placeholder="Institution" />
                    </div>
                  ))}
                  <button className="btn btn-secondary add-btn" onClick={addEducation}>+ Add Education</button>
                </div>
              )}

              {activeSection === "Experience" && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Experience Status</label>
                    <select className="form-control" value={resume.experienceType} onChange={(e) => setResume({ ...resume, experienceType: e.target.value })}>
                      <option value="fresher">Fresher</option>
                      <option value="experienced">Experienced</option>
                    </select>
                  </div>
                  {resume.experienceType === "experienced" && (
                    <>
                      {resume.experience.map((exp, i) => (
                        <div key={i} className="list-item-form">
                          <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input className="form-control" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="e.g. Google" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Role / Designation</label>
                            <input className="form-control" value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="e.g. Software Engineer" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Duration</label>
                            <input className="form-control" value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} placeholder="e.g. Jan 2020 - Present" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Work Description</label>
                            <textarea className="form-control" rows="3" value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} placeholder="Describe your responsibilities and achievements..." />
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary add-btn" onClick={addExperience}>+ Add Experience</button>
                    </>
                  )}
                </div>
              )}

              {activeSection === "Projects" && (
                <div>
                  {resume.projects.map((p, i) => (
                    <div key={i} className="list-item-form">
                      <div className="form-group">
                        <label className="form-label">Project Title</label>
                        <input className="form-control" value={p.title} onChange={(e) => updateProject(i, "title", e.target.value)} placeholder="e.g. E-commerce Website" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Project Link (optional)</label>
                        <input className="form-control" value={p.link} onChange={(e) => updateProject(i, "link", e.target.value)} placeholder="https://github.com/..." />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Project Description</label>
                        <textarea className="form-control" rows="3" value={p.description} onChange={(e) => updateProject(i, "description", e.target.value)} placeholder="Briefly describe what you built..." />
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-secondary add-btn" onClick={addProject}>+ Add Project</button>
                </div>
              )}

              {activeSection === "Skills" && (
                <div>
                  {resume.skills.map((s, i) => (
                    <input key={i} className="form-control" value={s} onChange={(e) => updateSkill(i, e.target.value)} placeholder="Skill" style={{ marginBottom: "10px" }} />
                  ))}
                  <button className="btn btn-secondary add-btn" onClick={addSkill}>+ Add Skill</button>
                </div>
              )}

              {activeSection === "Certifications" && (
                <div>
                  {resume.certifications.map((c, i) => (
                    <div key={i} className="list-item-form">
                      <input className="form-control" value={c.name} onChange={(e) => updateCertificate(i, "name", e.target.value)} placeholder="Certificate Name" style={{ marginBottom: "10px" }} />
                      <input className="form-control" value={c.link} onChange={(e) => updateCertificate(i, "link", e.target.value)} placeholder="Certificate Link (URL)" />
                    </div>
                  ))}
                  <button className="btn btn-secondary add-btn" onClick={addCertificate}>+ Add Certification</button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="rb-preview-panel">
          <div className="rb-preview-wrapper">
            <div className="resume-preview">
              <div className="rp-header">
                <h1 className="rp-name">{resume.personalInfo.fullName || "Your Name"}</h1>
                <div className="rp-contact">
                  {resume.personalInfo.email && <span>✉ {resume.personalInfo.email}</span>}
                  {resume.personalInfo.phone && <span>📞 {resume.personalInfo.phone}</span>}
                  {resume.personalInfo.location && <span>📍 {resume.personalInfo.location}</span>}
                  {resume.personalInfo.linkedin && <span>🔗 LinkedIn</span>}
                  {resume.personalInfo.github && <span>💻 GitHub</span>}
                </div>
                <p className="rp-summary">{resume.personalInfo.summary}</p>
              </div>

              {/* Experience Preview */}
              {resume.experienceType === "experienced" && resume.experience.length > 0 && (
                <div className="rp-section">
                  <h2 className="rp-section-title">Experience</h2>
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="rp-item" style={{ marginBottom: '16px' }}>
                      <div className="rp-item-header">
                        <span className="rp-item-title">{exp.role} at {exp.company}</span>
                        <span className="rp-item-date">{exp.duration}</span>
                      </div>
                      <p className="rp-item-desc" style={{ whiteSpace: 'pre-line' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Preview */}
              {resume.projects.length > 0 && (
                <div className="rp-section">
                  <h2 className="rp-section-title">Projects</h2>
                  {resume.projects.map((p, i) => (
                    <div key={i} className="rp-item" style={{ marginBottom: '12px' }}>
                      <div className="rp-item-header">
                        <span className="rp-item-title">{p.title}</span>
                        {p.link && <a href={p.link} className="rp-link" target="_blank" rel="noreferrer">Link</a>}
                      </div>
                      <p className="rp-item-desc">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;