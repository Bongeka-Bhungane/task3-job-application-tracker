import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  jobs: any[];
  onSearch: (filteredJobs: any[]) => void;
}

export default function Search({ jobs = [], onSearch }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // 🔍 Filter jobs
  const handleSearch = useCallback(
    (q: string) => {
      const lowerQ = q.toLowerCase().trim();

      if (!lowerQ) {
        onSearch(jobs); // show all if empty
        return;
      }

      const filtered = jobs.filter(
        (job) =>
          job.company?.toLowerCase().includes(lowerQ) ||
          job.title?.toLowerCase().includes(lowerQ)
      );
      onSearch(filtered);
    },
    [jobs, onSearch]
  );

  // ✅ Run search when jobs or query changes
  useEffect(() => {
    handleSearch(query);
  }, [query, jobs, handleSearch]);

  // ✅ Only update URL when the query actually changes (prevents flickering)
  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    if (query !== currentQ) {
      if (query) setSearchParams({ q: query });
      else setSearchParams({});
    }
  }, [query, searchParams, setSearchParams]);

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search by company or role..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
