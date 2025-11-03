import React, { useEffect, useState } from "react";
import type { Job, User } from "../types";
import Modal from "react-modal";
import Button from "./Button";
import JobDetails from "./JobDetails";
import JobForm from "./JobForm";

interface JobListCardProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

export default function JobListCard({ jobs, setJobs }: JobListCardProps) {
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  const [editJob, setEditJob] = useState<Job | null>(null);

  // ✅ Handle status change
  const handleStatusChange = async (id: number, newStatus: Job["status"]) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);

    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: newStatus } : job
    );

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobs: updatedJobs }),
    });

    if (!res.ok) {
      alert("Failed to update job status");
      return;
    }

    setJobs(updatedJobs);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, jobs: updatedJobs })
    );
  };

  // ✅ Handle job deletion
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);

    const updatedJobs = jobs.filter((job) => job.id !== id);

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobs: updatedJobs }),
    });

    if (!res.ok) {
      alert("Failed to delete job");
      return;
    }

    setJobs(updatedJobs);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, jobs: updatedJobs })
    );
  };

  // ✅ Handle job edit
  const handleEdit = async (job: Job) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);

    // Fetch fresh user data to ensure we have the latest jobs from the server
    const res = await fetch(`http://localhost:5000/users/${user.id}`);
    if (!res.ok) {
      alert("Failed to fetch job data");
      return;
    }

    const data: User = await res.json();
    const updatedJob = data.jobs.find((j: Job) => j.id === job.id);

    if (!updatedJob) {
      alert("Job not found on server");
      return;
    }

    setEditJob(updatedJob);
  };

  // ✅ Status badge colors
  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "denied":
        return { backgroundColor: "#ffe5e5", color: "#d32f2f" }; // red
      case "applied":
        return { backgroundColor: "#fff8e1", color: "#fbc02d" }; // yellow
      case "interviewed":
        return { backgroundColor: "#e8f5e9", color: "#388e3c" }; // green
      default:
        return { backgroundColor: "#f0f0f0", color: "#000" };
    }
  };

  useEffect(() => {}, [editJob]);

  return (
    <div className="job-list-card">
      {jobs.length === 0 ? (
        <div className="welcome-message">
          <h2>Welcome to job tracker app!!!</h2>
          <p>
            you have not added any jobs yet. <br />
            please the "Add Job" button and <strong>get started</strong>
          </p>
        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px",
              borderRadius: "8px",
            }}
          >
            <div
              className="card-content"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="info">
                <h2>{job.company}</h2>
                <p>{job.title}</p>
                <p>{job.applicationDate}</p>
              </div>

              <div
                className="button-container"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <p
                  className="status"
                  style={{
                    ...getStatusColor(job.status),
                    padding: "6px 12px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    minWidth: "100px",
                    textAlign: "center",
                  }}
                >
                  {job.status}
                </p>

                <select
                  value={job.status}
                  onChange={(e) =>
                    handleStatusChange(job.id, e.target.value as Job["status"])
                  }
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="applied">Applied</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="denied">Denied</option>
                </select>

                <Button
                  name="View More"
                  color="#000000ff"
                  backgroundColor="#ffffffff"
                  onClick={() => setOpenJobId(job.id)}
                  className="view-more"
                />
                <Button
                  name="Edit"
                  color="#000000ff"
                  backgroundColor="#ffffffff"
                  onClick={() => handleEdit(job)}
                  className="edit-button"
                />
                <Button
                  name="Delete"
                  color="#000000ff"
                  backgroundColor="#fdfbfbff"
                  onClick={() => handleDelete(job.id)}
                  className="delete-button"
                />
              </div>
            </div>

            {/* View Details Modal */}
            <Modal
              isOpen={openJobId === job.id}
              onRequestClose={() => setOpenJobId(null)}
              style={{
                overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
                content: { width: "50%", height: "50%", margin: "auto" },
              }}
              ariaHideApp={false}
            >
              <JobDetails job={job} setJobs={setJobs} />
              <Button
                name="Close"
                color="#fff"
                backgroundColor="#DC3545"
                onClick={() => setOpenJobId(null)}
              />
            </Modal>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {editJob && (
        <Modal
          isOpen={!!editJob}
          onRequestClose={() => setEditJob(null)}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
            content: { width: "50%", height: "60%", margin: "auto" },
          }}
          ariaHideApp={false}
        >
          <h2>Edit Job</h2>
          <JobForm
            {...{ existingJob: editJob, onJobAdded: handleEdit }} // reuse form for editing
          />
          <Button
            name="Cancel"
            color="#fff"
            backgroundColor="#6c757d"
            onClick={() => setEditJob(null)}
          />
        </Modal>
      )}
    </div>
  );
}
