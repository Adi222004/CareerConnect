# CareerConnect — Backend

The backend service for **CareerConnect**, a full-stack job portal and recruitment platform. It provides RESTful APIs for authentication, user profiles, company management, job postings, and job applications.

Built using **Node.js, Express.js, MongoDB, and Mongoose**, the backend implements JWT-based authentication, role-based authorization, secure password hashing, and Cloudinary integration for profile, resume, and company-logo uploads.

---

## 🚀 Key Features

- 🔐 JWT-based authentication using HTTP-only cookies
- 👥 Role-based access for Students and Recruiters
- 🔑 Secure password hashing using bcryptjs
- 👤 User profile management
- 📄 Resume and profile photo uploads
- 🏢 Company creation and management
- 💼 Job posting and management
- 🔎 Job search functionality
- 📩 Job application management
- ✅ Accept / Reject applicant functionality
- ☁️ Cloudinary integration for file and image storage
- 🗄️ MongoDB database with Mongoose
- ⚡ RESTful API architecture

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + HTTP-only Cookies |
| Password Security | bcryptjs |
| File Upload | Multer |
| Cloud Storage | Cloudinary |
| Architecture | RESTful APIs |
| Module System | ES Modules |

---

# 📂 Project Structure

```text
backend/
│
├── config/
│   ├── db.js                    # MongoDB connection
│   └── cloudinary.js            # Cloudinary configuration
│
├── controllers/
│   ├── user.controller.js
│   ├── company.controller.js
│   ├── job.controller.js
│   └── application.controller.js
│
├── middlewares/
│   ├── auth.middleware.js       # JWT verification
│   └── multer.middleware.js     # File upload handling
│
├── models/
│   ├── user.model.js
│   ├── company.model.js
│   ├── job.model.js
│   └── application.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── company.routes.js
│   ├── job.routes.js
│   └── application.routes.js
│
├── utils/
│   └── cloudinary.utils.js
│
├── index.js                     # Server entry point
├── .env.example                 # Environment variable template
├── package.json
└── package-lock.json
```

---

# ⚙️ Prerequisites

Before running the backend, make sure you have:

- Node.js v18 or above
- MongoDB (Local MongoDB or MongoDB Atlas)
- Cloudinary account
- npm

---

# 🔧 Environment Configuration

Create a `.env` file inside the `backend` directory.

You can use `.env.example` as a template.

```env
PORT=5011

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_jwt_secret

JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:3000
```

### Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port on which the backend server runs |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `JWT_EXPIRES_IN` | JWT token expiration duration |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLIENT_URL` | Frontend application URL |

> **Security:** Never commit the `.env` file, database credentials, JWT secrets, or Cloudinary credentials to GitHub. Only `.env.example` should be included in the repository.

---

# 📦 Installation

From the project root:

```bash
cd backend
npm install
```

---

# ▶️ Running the Backend

### Development

```bash
npm run dev
```

The development server runs on:

```text
http://localhost:5011
```

### Production

```bash
npm start
```

---

# 🔌 API Reference

## 🔐 Authentication & User APIs

**Base Route:**

```text
/api/user
```

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ❌ | Register a new Student or Recruiter |
| POST | `/login` | ❌ | Authenticate user and set JWT cookie |
| GET | `/logout` | ❌ | Clear authentication cookie |
| POST | `/profile/update` | ✅ | Update profile and upload resume |

### Register

**Endpoint:**

```text
POST /api/user/register
```

**Content Type:**

```text
multipart/form-data
```

**Fields:**

```text
fullname
email
password
role
phoneNumber
pancard
adharcard
file
```

`role` can be:

```text
Student
Recruiter
```

The `file` field is used for profile photo upload.

### Login

**Endpoint:**

```text
POST /api/user/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "role": "Student"
}
```

---

# 🏢 Company APIs

**Base Route:**

```text
/api/company
```

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ✅ | Create a company |
| GET | `/get` | ✅ | Get recruiter's companies |
| GET | `/get/:id` | ✅ | Get a specific company |
| PUT | `/update/:id` | ✅ | Update company and upload logo |

Company management is primarily available to authenticated **Recruiters**.

---

# 💼 Job APIs

**Base Route:**

```text
/api/job
```

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/post` | ✅ | Create a new job |
| GET | `/get?keyword=...` | ✅ | Retrieve jobs with search |
| GET | `/getadminjobs` | ✅ | Retrieve recruiter's jobs |
| GET | `/get/:id` | ✅ | Retrieve a specific job and its applications |

### Job Search Example

```text
GET /api/job/get?keyword=developer
```

---

# 📩 Application APIs

**Base Route:**

```text
/api/application
```

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/apply/:id` | ✅ | Apply for a job as a Student |
| GET | `/get` | ✅ | Get student's applications |
| GET | `/:id/applicants` | ✅ | Get applicants for a job |
| POST | `/status/:id/update` | ✅ | Accept or reject an application |

### Application Status

Applications can have the following statuses:

```text
Pending
Accepted
Rejected
```

---

# 🗄️ Database Models

CareerConnect uses MongoDB with Mongoose for database management.

## 👤 User

```text
fullname
email
password (hashed)
phoneNumber
role
pancard
adharcard

profile:
  ├── bio
  ├── skills[]
  ├── resume
  ├── resumeOriginalName
  └── profilePhoto
```

Supported roles:

```text
Student
Recruiter
```

---

## 🏢 Company

```text
name
description
website
location
logo
userId
```

`userId` references the associated Recruiter.

---

## 💼 Job

```text
title
description
requirements[]
salary
location
jobType
experience
position
company
created_by
applications[]
```

The Job model maintains references to the associated company, recruiter, and applications.

---

## 📩 Application

```text
job
applicant
status
```

Possible application statuses:

```text
Pending
Accepted
Rejected
```

---

# 🔐 Authentication & Authorization

CareerConnect uses **JWT authentication with HTTP-only cookies**.

The authentication flow is:

```text
User Login
     ↓
Credentials Verification
     ↓
JWT Token Generated
     ↓
HTTP-only Cookie
     ↓
Protected API Request
     ↓
JWT Verification Middleware
     ↓
Role-Based Authorization
     ↓
Controller
```

This approach helps protect authenticated routes and restricts functionality according to the user's role.

---

# ☁️ File Upload & Cloudinary

CareerConnect uses **Multer** to process uploaded files and **Cloudinary** for cloud-based storage.

Files handled by the application include:

- Profile photos
- Resumes
- Company logos

The upload flow is:

```text
Frontend
   ↓
Multer
   ↓
Backend
   ↓
Cloudinary
   ↓
Stored File URL
   ↓
MongoDB
```

The generated file URLs are stored in the relevant MongoDB documents.

---

# 🔄 Application Workflow

```text
                 CAREERCONNECT
                       │
          ┌────────────┴────────────┐
          │                         │
       STUDENT                   RECRUITER
          │                         │
    Create Profile            Create Company
          │                         │
     Browse Jobs               Post Jobs
          │                         │
     Apply for Job            View Applicants
          │                         │
 Track Applications        Accept / Reject
          │                         │
          └────────────┬────────────┘
                       │
                Recruitment Process
```

---

# 🧪 API Development

The backend follows a structured architecture:

```text
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Models
   ↓
MongoDB
```

This separation improves maintainability and makes the application easier to extend.

---

# 🔗 Frontend Integration

The backend is designed to work with the CareerConnect React frontend.

Default frontend URL:

```text
http://localhost:3000
```

Default backend URL:

```text
http://localhost:5011
```

Make sure the `CLIENT_URL` environment variable matches the URL of your frontend application.

---

# 🛡️ Security Considerations

The application implements several security practices:

- JWT-based authentication
- HTTP-only authentication cookies
- Password hashing using bcryptjs
- Protected API routes
- Role-based authorization
- Environment variables for sensitive credentials
- Secure cloud storage through Cloudinary

> Do not upload real MongoDB credentials, JWT secrets, Cloudinary API keys, or other private credentials to GitHub.

---

# 🚀 Future Enhancements

Potential improvements include:

- 📧 Email notifications
- 🔔 Real-time application notifications
- 🤖 AI-based job recommendations
- 📄 AI-powered resume parsing
- 📅 Interview scheduling
- 🔎 Advanced job filtering
- 📊 Recruiter analytics dashboard
- 💬 Student-recruiter communication
- 🔐 Additional security and validation features

---

# 🎯 Learning Outcomes

This backend demonstrates practical implementation of:

- Full-Stack Web Development
- RESTful API Development
- MVC-style Backend Architecture
- MongoDB Database Design
- Mongoose ODM
- JWT Authentication
- Role-Based Access Control
- Password Hashing
- File Upload Handling
- Cloudinary Integration
- CRUD Operations
- API Design
- Client-Server Architecture

---

# 👨‍💻 Author

**Aditya Gupta**

Master of Computer Applications (MCA)  
Mumbai University

**Project:** CareerConnect — Full Stack Job Portal & Resume Builder

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.