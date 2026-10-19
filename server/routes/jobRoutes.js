const express = require("express");
const router = express.Router();
const { requireAuth, getAuth } = require("@clerk/express");
const Job = require("../models/Job");

// Protect all routes with Clerk auth
router.use(requireAuth());

// Helper function to extract userId safely
const getUserId = (req) => {
  const auth = typeof getAuth === "function" ? getAuth(req) : req.auth;
  return auth?.userId || null;
};

// 1. GET all job applications for the logged-in user
router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User ID missing from session." });
    }

    const jobs = await Job.find({ userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST a new job application for the logged-in user
router.post("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User ID missing from session." });
    }

    const newJob = new Job({ ...req.body, userId });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. PUT (update) an existing job (ensuring user owns it)
router.put("/:id", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User ID missing from session." });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedJob) {
      return res
        .status(404)
        .json({ error: "Job application not found or unauthorized" });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. DELETE a job application (ensuring user owns it)
router.delete("/:id", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User ID missing from session." });
    }

    const deletedJob = await Job.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deletedJob) {
      return res
        .status(404)
        .json({ error: "Job application not found or unauthorized" });
    }

    res.json({ message: "Job application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
