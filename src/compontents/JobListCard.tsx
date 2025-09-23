import React, { useState } from "react";
import type { Job, User } from "../types";
import Modal from "react-modal";
import Button from "./Button";
import JobDetails from "./JobDetails";

interface JobListCardProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

export default function JobListCard({ jobs, setJobs }: JobListCardProps) {
  const [openJobId, setOpenJobId] = useState<number | null>(null); // track which job's modal is open

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
    const updatedUser: User = { ...user, jobs: updatedJobs };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
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
            <h3>{job.title}</h3>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Date Applied:</strong> {job.applicationDate}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <select
                value={job.status}
                onChange={(e) =>
                  handleStatusChange(job.id, e.target.value as Job["status"])
                }
              >
                <option value="applied">Applied</option>
                <option value="interviewed">Interviewed</option>
                <option value="denied">Denied</option>
              </select>
            </p>
            <p>
              <strong>Contact Info:</strong> {job.contactInfo}
            </p>
            <p>
              <strong>Location:</strong> {job.location || "N/A"}
            </p>

            <div className="button-container">
              <Button
                name="View More"
                color="#fff"
                backgroundColor="#007BFF"
                onClick={() => setOpenJobId(job.id)}
              />
            </div>

            {/* Modal */}
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
    </div>
  );
}
