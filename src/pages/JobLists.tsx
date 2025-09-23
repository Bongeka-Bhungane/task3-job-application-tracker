import React, { useState, useEffect } from "react";
import JobForm from "../compontents/JobForm";
import JobListCard from "../compontents/JobListCard";
import type { Job, User } from "../types";

export default function JobLists() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs for logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);
    setJobs(user.jobs || []);
  }, []);

  return (
    <div>
      <JobForm onJobAdded={(newJob) => setJobs((prev) => [...prev, newJob])} />
      <JobListCard jobs={jobs} setJobs={setJobs} />
    </div>
  );
}
