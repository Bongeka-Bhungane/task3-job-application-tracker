import React, { useState } from "react";
import type { Job, User } from "../types";

interface JobFormProps {
  onJobAdded: (job: Job) => void;
}

export default function JobForm({ onJobAdded }: JobFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"applied" | "interviewed" | "denied">(
    "applied"
  );
  const [applicationDate, setApplicationDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [duties, setDuties] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not logged in");
      return;
    }

    const user: User = JSON.parse(storedUser);

    const newJob: Job = {
      id: Date.now(),
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

    const updatedJobs = [...(user.jobs || []), newJob];

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobs: updatedJobs }),
    });

    if (!res.ok) {
      alert("Failed to add job");
      return;
    }

    const updatedUser: User = await res.json();
    localStorage.setItem("user", JSON.stringify(updatedUser));
    onJobAdded(newJob);

    // Reset form
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
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add Job</button>
    </form>
  );
}
