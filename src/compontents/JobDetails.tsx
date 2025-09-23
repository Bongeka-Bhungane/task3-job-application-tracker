// JobDetails.tsx
import React from "react";
import type { Job } from "../types";

interface JobDetailsProps {
  job: Job;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

export default function JobDetails({ job, setJobs }: JobDetailsProps) {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {job.company}
      </p>
      <p>
        <strong>Status:</strong> {job.status}
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
