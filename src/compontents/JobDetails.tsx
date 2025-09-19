import React, { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  applicationDate: string;
  status: string;
  contactInfo: string;
  location: string;
  description: string;
  requirements: string;
  duties: string;
  notes: string;
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
              <strong>Company: </strong> {job.company}
            </p>
            <p>
              <strong>Date: </strong> {job.applicationDate}
            </p>
            <p>
              <strong>Status: </strong> {job.status}
            </p>
            <p>
              <strong>Contact info: </strong> {job.contactInfo}
            </p>
            <p>
              <strong>Location: </strong>
              {job.location}
            </p>
            <p>
              <strong>Description: </strong>
              {job.description}
            </p>
            <p>
              <strong>Requirements: </strong>
              {job.requirements}
            </p>
            <p>
              <strong>Duties: </strong>
              {job.duties}
            </p>
            <p>
              <strong>Notes: </strong>
              {job.notes}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
