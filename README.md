# ApplyFlow 🚀

> A full-stack MERN job application tracker built to streamline your job search, manage application pipelines, and monitor status metrics in real-time.

---

## 🌟 Features

- **User Authentication:** Secure, multi-tenant authentication powered by **Clerk** (`@clerk/clerk-react` & `@clerk/express`).
- **User-Scoped Data:** Each user’s pipeline, metrics, and job records are isolated to their unique account ID.
- **Analytics Dashboard:** Real-time metrics tracking total applications, interviews, offers, and rejections.
- **Interactive Pipeline:** Manage job stages (`Applied`, `Interviewing`, `Offered`, `Rejected`) with inline status updates.
- **Full CRUD Operations:** Add, view, edit, and delete application logs cleanly.
- **Modern UI:** Styled using Tailwind CSS v4 and Lucide React icons.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Authentication:** Clerk React SDK (`@clerk/clerk-react`)
- **HTTP Client:** Axios
- **Icons:** Lucide React

### **Backend (`/server`)**
- **Runtime:** Node.js & Express
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication Middleware:** `@clerk/express` (`requireAuth` & `getAuth`)
- **Environment Management:** `dotenv`
- **CORS:** Configured for credential & header support

---

## 📁 Repository Structure (Monorepo)

```text
applyflow-mern/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/    # AddJobModal.jsx & modular components
│   │   ├── App.jsx        # Dashboard & Auth integration
│   │   └── main.jsx       # ClerkProvider wrapper
│   └── package.json
└── server/                 # Express REST API
    ├── models/            # Mongoose schemas (Job.js with userId)
    ├── routes/            # Protected REST endpoints (jobRoutes.js)
    ├── index.js           # Express app & Clerk middleware configuration
    └── package.json