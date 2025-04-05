import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitJob,
  fetchJobs,
  deleteJob,
  resubmitJob,
  pollJobStatus, 
} from "../store/jobsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // Initial fetch and polling setup
  useEffect(() => {
    dispatch(fetchJobs());

    const interval = setInterval(() => {
      dispatch(pollJobStatus());
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(submitJob(file)).then(() => {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // <-- reset input field
        }
      });
    }
  };

  const handleResubmit = (id,filename) => {
    dispatch(resubmitJob(id,filename));
  };

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <div className="p-4 space-y-8">
      {/* Upload Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 bg-white shadow p-4 rounded items-center"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-sm file:text-sm file:bg-gray-200"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Job
        </button>
      </form>

      {/* Job List */}
      <div className="bg-white shadow rounded p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Submitted Jobs</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {!loading && jobs.length === 0 && (
          <p className="text-gray-500">No jobs submitted yet.</p>
        )}
        {!loading && jobs.length > 0 && (
          <table className="w-full text-left table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2">Job ID</th>
                <th className="p-2">Filename</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{job.id}</td>
                  <td className="p-2">{job.filename}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-sm rounded capitalize ${
                        job.status === "done"
                          ? "bg-green-100 text-green-700"
                          : job.status === "error"
                          ? "bg-red-100 text-red-700"
                          : job.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    {job.status === "error" && (
                      <button
                        onClick={() => handleResubmit(job.id,job.filename)}
                        className="text-blue-600 hover:underline"
                      >
                        Resubmit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
