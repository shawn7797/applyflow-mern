# ApplyFlow 🚀

> A modern, full-stack job application tracker built with the MERN stack. Designed to help job seekers track, organize, and analyze their application pipeline in real time.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?logo=mongodb)

---

## 💡 Origin & Motivation

During my active job search, I found existing application tracking methods either overly complex or lacking real-time analytics for pipeline tracking. I built **ApplyFlow** to solve my own problem—creating a minimal, responsive dashboard tailored to track application statuses (`Applied`, `Interviewing`, `Offered`, `Rejected`), store recruiter notes, and monitor pipeline metrics at a glance.

---

## ✨ Features

- 📊 **Real-Time Pipeline Analytics:** Instant metrics on application totals, active interviews, offers, and rejections.
- ⚡ **Interactive Application Board:** Direct status transitions (`Applied` → `Interviewing` → `Offered` / `Rejected`) with color-coded badges.
- 📝 **Detailed Entry Logging:** Save company names, target roles, application dates, job posting URLs, and recruiter notes.
- 🎨 **Sleek UI/UX:** Styled using Tailwind CSS v4 and Lucide React icons for a responsive dashboard feel.
- 🛡️ **RESTful API Architecture:** Robust backend handling CRUD operations with Mongoose schema validation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud Cluster)
- **Object Data Modeling (ODM):** [Mongoose](https://mongoosejs.com/)

---

## 📂 Monorepo Architecture

```text
applyflow/
├── client/                 # Frontend React (Vite) App
│   ├── src/
│   │   ├── components/     # UI components (AddJobModal, etc.)
│   │   ├── App.jsx         # Main Dashboard component
│   │   └── main.jsx        # App entry point
│   └── package.json
│
└── server/                 # Backend Express API
    ├── models/             # Mongoose schemas (Job.js)
    ├── routes/             # REST API routes (jobRoutes.js)
    ├── index.js            # Express server entry point
    └── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas cluster account (or local MongoDB database)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/applyflow.git
   cd applyflow
   ```

2. **Setup Server:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file inside the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
   Start the server in development mode:
   ```bash
   npm run dev
   ```

3. **Setup Client:**
   Open a new terminal window from the root directory:
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file inside the `client/` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:5173` in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/jobs` | Retrieve all job applications |
| `POST` | `/api/jobs` | Create a new job application |
| `PUT` | `/api/jobs/:id` | Update an existing application (e.g., status, notes) |
| `DELETE` | `/api/jobs/:id` | Remove a job application record |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.