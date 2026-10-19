import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Briefcase,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Award,
} from "lucide-react";
import AddJobModal from "./components/AddJobModal";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch jobs from Express API
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Add new job application
  const handleAddJob = async (jobData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/jobs`, jobData);
      setJobs([res.data, ...jobs]);
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  // Update status inline
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/jobs/${id}`, {
        status: newStatus,
      });
      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete job record
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  // Stats calculation
  const totalApplied = jobs.length;
  const interviewing = jobs.filter((j) => j.status === "Interviewing").length;
  const offers = jobs.filter((j) => j.status === "Offered").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  const getStatusBadge = (status) => {
    const styles = {
      Applied: "bg-blue-50 text-blue-700 border-blue-200",
      Interviewing: "bg-amber-50 text-amber-700 border-amber-200",
      Offered: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Rejected: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return `px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.Applied}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              ApplyFlow
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Analytics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Applied
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {totalApplied}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Interviewing
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {interviewing}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Offers
              </p>
              <p className="text-2xl font-bold text-slate-900">{offers}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-lg text-rose-600">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Rejected
              </p>
              <p className="text-2xl font-bold text-slate-900">{rejected}</p>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-800">
              Job Pipeline
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Loading applications...
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No applications logged yet. Click{" "}
              <span className="font-semibold text-blue-600">
                "Add Application"
              </span>{" "}
              to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                    <th className="py-3 px-6 font-medium">Company</th>
                    <th className="py-3 px-6 font-medium">Position</th>
                    <th className="py-3 px-6 font-medium">Status</th>
                    <th className="py-3 px-6 font-medium">Applied Date</th>
                    <th className="py-3 px-6 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2">
                        {job.company}
                        {job.jobUrl && (
                          <a
                            href={job.jobUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-blue-600"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        {job.position}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusChange(job._id, e.target.value)
                          }
                          className={`${getStatusBadge(job.status)} cursor-pointer outline-none`}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        {new Date(job.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors rounded-md hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Component */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobAdded={handleAddJob}
      />
    </div>
  );
}
