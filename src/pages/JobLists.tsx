import React, { useState, useEffect } from "react";
import JobForm from "../compontents/JobForm";
import JobListCard from "../compontents/JobListCard";
import type { Job, User } from "../types";
import Model from "react-modal";
import Button from "../compontents/Button";

export default function JobLists() {
  const [visible, setVisible] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs for logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);
    setJobs(user.jobs || []);
  }, [visible]);

  return (
    <div>
      <div className="button-container">
        <Button
          name="Add Job"
          color="green"
          className="round-button"
          onClick={() => setVisible(true)}
        />
        <Model
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={{
            overlay: {
              background: "#818D92",
            },
            content: {
              width: "50%",
              height: "50%",
              margin: "auto",
            },
          }}
        >
          <JobForm
            onJobAdded={(newJob) => setJobs((prev) => [...prev, newJob])}
          />
        </Model>
      </div>

      <JobListCard jobs={jobs} setJobs={setJobs} />
    </div>
  );
}
