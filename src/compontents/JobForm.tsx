import React, { useState, useEffect } from "react";
import type { Job, User } from "../types";

interface JobFormProps {
  onJobAdded: (job: Job) => void;
  existingJob?: Job | null; // ✅ allow pre-filling data when editing
}

export default function JobForm({ onJobAdded, existingJob }: JobFormProps) {
  const [title, setTitle] = useState(existingJob?.title || "");
  const [company, setCompany] = useState(existingJob?.company || "");
  const [status, setStatus] = useState<Job["status"]>(
    existingJob?.status || "applied"
  );
  const [applicationDate, setApplicationDate] = useState(
    existingJob?.applicationDate || ""
  );
  const [contactInfo, setContactInfo] = useState(
    existingJob?.contactInfo || ""
  );
  const [location, setLocation] = useState(existingJob?.location || "");
  const [description, setDescription] = useState(
    existingJob?.description || ""
  );
  const [requirements, setRequirements] = useState(
    existingJob?.requirements || ""
  );
  const [duties, setDuties] = useState(existingJob?.duties || "");
  const [notes, setNotes] = useState(existingJob?.notes || "");

  // ✅ Update form if a new job is passed in (e.g. when editing)
  useEffect(() => {
    if (existingJob) {
      setTitle(existingJob.title || "");
      setCompany(existingJob.company || "");
      setStatus(existingJob.status || "applied");
      setApplicationDate(existingJob.applicationDate || "");
      setContactInfo(existingJob.contactInfo || "");
      setLocation(existingJob.location || "");
      setDescription(existingJob.description || "");
      setRequirements(existingJob.requirements || "");
      setDuties(existingJob.duties || "");
      setNotes(existingJob.notes || "");
    }
  }, [existingJob]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not logged in");
      return;
    }

    const user: User = JSON.parse(storedUser);

    const jobToSave: Job = {
      id: existingJob?.id || Date.now(),
      title,
      company,
      status,
      applicationDate,
      contactInfo,
      location,
      description,
      requirements,
      duties,
      notes,
    };

    // ✅ Merge jobs correctly — if editing, replace the existing one
    const updatedJobs = existingJob
      ? user.jobs.map((j) => (j.id === existingJob.id ? jobToSave : j))
      : [...(user.jobs || []), jobToSave];

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobs: updatedJobs }),
    });

    if (!res.ok) {
      alert(existingJob ? "Failed to update job" : "Failed to add job");
      return;
    }

    const updatedUser: User = await res.json();
    localStorage.setItem("user", JSON.stringify(updatedUser));

    onJobAdded(jobToSave); 

    // Reset only if adding a new job
    if (!existingJob) {
      setTitle("");
      setCompany("");
      setStatus("applied");
      setApplicationDate("");
      setContactInfo("");
      setLocation("");
      setDescription("");
      setRequirements("");
      setDuties("");
      setNotes("");
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{existingJob ? "Edit Job" : "Add New Job"}</h2>

      <div className="form-grid">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Job["status"])}
        >
          <option value="applied">Applied</option>
          <option value="interviewed">Interviewed</option>
          <option value="denied">Denied</option>
        </select>
        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duties"
          value={duties}
          onChange={(e) => setDuties(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">
        {existingJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}
