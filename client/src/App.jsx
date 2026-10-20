import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Briefcase,
  ExternalLink,
  Trash2,
  Pencil,
  CheckCircle2,
  Clock,
  XCircle,
  Award,
  FileText,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import AddJobModal from "./components/AddJobModal";
import EditJobModal from "./components/EditJobModal";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function App() {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJobToEdit, setSelectedJobToEdit] = useState(null);

  const api = async () => {
    const token = await getToken();
    return axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const fetchJobs = async () => {
    try {
      const client = await api();
      const res = await client.get("/jobs");
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

  const handleAddJob = async (jobData) => {
    try {
      const client = await api();
      const res = await client.post("/jobs", jobData);
      setJobs([res.data, ...jobs]);
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  const handleUpdateJob = async (jobId, updatedData) => {
    try {
      const client = await api();
      const res = await client.put(`/jobs/${jobId}`, updatedData);
      setJobs(jobs.map((j) => (j._id === jobId ? res.data : j)));
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const client = await api();
      const res = await client.put(`/jobs/${id}`, { status: newStatus });
      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const client = await api();
      await client.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const handleOpenEdit = (job) => {
    setSelectedJobToEdit(job);
    setIsEditModalOpen(true);
  };

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

          <div className="flex items-center gap-4">
            <SignedIn>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Application
              </button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SignedOut>
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto shadow-sm mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to ApplyFlow
            </h2>
            <p className="text-slate-600 mb-6 text-sm">
              Your personal dashboard to track job applications, interviews, and
              offers in one streamlined place.
            </p>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm">
                Get Started / Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
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

          {/* Job Pipeline Table */}
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
                      <th className="py-3 px-6 font-medium">Notes</th>
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
                        <td className="py-4 px-6 text-slate-600 max-w-xs">
                          {job.notes ? (
                            <div
                              className="truncate text-xs bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md text-slate-600"
                              title={job.notes}
                            >
                              {job.notes}
                            </div>
                          ) : (
                            <span className="text-slate-300 text-xs italic">
                              No notes
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-xs whitespace-nowrap">
                          {new Date(job.appliedDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEdit(job)}
                              className="text-slate-400 hover:text-blue-600 p-1.5 transition-colors rounded-md hover:bg-blue-50"
                              title="Edit job application"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors rounded-md hover:bg-rose-50"
                              title="Delete job application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </SignedIn>
      </main>

      {/* Add Modal */}
      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onJobAdded={handleAddJob}
      />

      {/* Edit Modal */}
      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedJobToEdit(null);
        }}
        onJobUpdated={handleUpdateJob}
        job={selectedJobToEdit}
      />
    </div>
  );
}
