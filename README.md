# 🚀 CareerConnect – Full Stack Job Portal & Resume Builder

CareerConnect is a **full-stack MERN (MongoDB, Express.js, React.js, Node.js)** web application that connects **job seekers** and **recruiters** through a centralized recruitment platform. The application enables students to create professional profiles, build resumes, search and apply for jobs, while recruiters can post job openings, manage companies, and review applications through a dedicated dashboard.

---

## ✨ Features

### 👨‍🎓 Student Module
- User Registration & Secure Login
- Browse and Search Jobs
- Apply for Jobs
- Track Applied Jobs
- Create & Update Profile
- Resume Upload & Management

### 🏢 Recruiter Module
- Recruiter Registration & Authentication
- Company Creation & Management
- Post, Edit & Delete Jobs
- View Applicants
- Accept / Reject Applications

### 🔐 Security
- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Secure Password Handling

---

# 🛠 Tech Stack

## Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- JWT Authentication
- Cloudinary
- Multer

## Database
- MongoDB
- Mongoose

---

# 📂 Project Structure

```
CareerConnect
│
├── client/                 # React Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend/                # Node.js Backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   ├── package.json
│   └── index.js
│
└── README.md
```

---

# ⚙️ Prerequisites

Before running the project, ensure you have:

- Node.js (v18 or above)
- MongoDB (Local or MongoDB Atlas)
- Cloudinary Account (Free Tier)

---

# 🔧 Backend Configuration

Create a `.env` file inside the `backend` folder and add the following:

```env
PORT=5011

MONGO_URI=mongodb://localhost:27017/careerconnect

JWT_SECRET=careerconnect_secret_2024

JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:3000
```

Cloudinary: https://cloudinary.com

---

# ▶️ Running the Project

## Clone Repository

```bash
git clone https://github.com/yourusername/CareerConnect.git
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5011
```

---

## Frontend

Open another terminal.

```bash
cd client
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 👨‍💻 Usage

## Student

1. Register as Student
2. Complete your profile
3. Browse available jobs
4. Apply for jobs
5. Track application status

---

## Recruiter

1. Register as Recruiter
2. Create Company
3. Post Jobs
4. View Applicants
5. Accept or Reject Applications

---

# 📸 Screenshots

> Add screenshots here after uploading them.

Example:

```
Home Page

Login Page

Student Dashboard

Recruiter Dashboard

Job Details

Applicant Management
```

---

# 🚀 Future Enhancements

- Email Notifications
- Resume Parsing
- AI-Based Job Recommendations
- Interview Scheduling
- Real-Time Notifications
- Advanced Search Filters

---

# 👨‍🎓 Author

**Aditya Gupta**

Master of Computer Applications (MCA)

Mumbai University

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.