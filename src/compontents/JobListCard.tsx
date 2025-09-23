import React, { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  applicationDate: string;
  status: "applied" | "interviewed" | "denied";
  contactInfo: string;
  location: string;
  description: string;
  requirements: string;
  duties: string;
  notes: string;
};

export default function JobListCard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // ✅ Load jobs for logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    // fetch latest user with jobs from server
    const fetchUserJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch user jobs");

        const freshUser = await res.json();
        setJobs(freshUser.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchUserJobs();
  }, []);

  // ✅ Update job status
  const handleStatusChange = async (id: number, newStatus: Job["status"]) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);

      const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      );

      // update user on server
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs: updatedJobs }),
      });

      if (!res.ok) throw new Error("Failed to update job status");

      setJobs(updatedJobs);

      // update localStorage user copy
      const updatedUser = { ...user, jobs: updatedJobs };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Requirements:</strong> {job.requirements}
            </p>
            <p>
              <strong>Duties:</strong> {job.duties}
            </p>
            <p>
              <strong>Notes:</strong> {job.notes}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
