import React from 'react'
import { useState } from 'react'

interface JobFormProps {
    onJobAdded: (job: any) => void;
}

export default function JobForm({ onJobAdded }: JobFormProps) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [duties, setDuties] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newJob = { title, company, status, applicationDate, contactInfo, location, description, requirements, duties, notes };

        const res =  await fetch("http://localhost:5000/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newJob),
        });

        const data = await res.json();
        onJobAdded(data);
        setTitle("");
        setCompany("");
        setStatus("");
        setApplicationDate("");
        setContactInfo("");
        setLocation("");    
        setDescription("");
        setRequirements("");
        setDuties("");
        setNotes("");
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="position"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="application date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="company contact info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="job location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="job decription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="job requirments"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="job duties"
          value={duties}
          onChange={(e) => setDuties(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="job notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
        <button type='submit'
        onClick={handleSubmit}
        >submit</button>
      </form>
    </div>
  );
}
