import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  jobs: any[];
  onSearch: (filteredJobs: any[]) => void;
}

export default function Search({ jobs, onSearch }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

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

  // Update filtered jobs whenever the query or jobs change
  useEffect(() => {
    handleSearch(query);
    setSearchParams(query ? { q: query } : {});
  }, [query, handleSearch, setSearchParams]);

  return (
    <input
      type="text"
      placeholder="Search by company or role"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
    />
  );
}
