import React, { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  applicationDate: string;
  status: "applied" | "interviewed" | "denied";
};

export default function JobDetails() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Fetch jobs when component loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/jobs");
        const data: Job[] = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Update job status
  const handleStatusChange = async (id: number, newStatus: Job["status"]) => {
    try {
      // Update on server
      const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Update locally
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
      );
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
              <strong>Date:</strong> {job.applicationDate}
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
          </div>
        ))
      )}
    </div>
  );
}
