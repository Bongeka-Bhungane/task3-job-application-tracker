import React from "react";
import type { Job } from "../types";

interface JobDetailsProps {
  job: Job;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

export default function JobDetails({ job }: JobDetailsProps) {
  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {job.company}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              job.status === "applied"
                ? "#2563eb" // blue
                : job.status === "interviewed"
                ? "#16a34a" // green
                : "#dc2626", // red
            fontWeight: "bold",
          }}
        >
          {job.status || "N/A"}
        </span>
      </p>
      <p>
        <strong>Date Applied:</strong> {job.applicationDate}
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
      <p>
        <strong>Contact Info:</strong> {job.contactInfo}
      </p>
    </div>
  );
}
