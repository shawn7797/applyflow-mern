require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

const jobRoutes = require("./routes/jobRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`ApplyFlow server running on port ${PORT}`),
    );
  })
  .catch((err) => console.error("Database connection error:", err));
