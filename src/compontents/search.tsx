import React, { useState, useCallback } from "react";
import type { Job } from "../types"; // ✅ Import type

interface SearchProps {
  jobs: Job[];
  onSearch: (filteredJobs: Job[]) => void;
}

export default function Search({ jobs, onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    (q: string) => {
      const filtered = jobs.filter(
        (job) =>
          job.company.toLowerCase().includes(q.toLowerCase()) ||
          job.title.toLowerCase().includes(q.toLowerCase())
      );
      onSearch(filtered);
    },
    [jobs, onSearch]
  );

  return (
    <input
      type="text"
      placeholder="Search by company or role"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
      }}
      style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
    />
  );
}
