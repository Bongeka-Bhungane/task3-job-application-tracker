import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Job } from "../types"; // ✅ Import the type

interface FilterProps {
  jobs: Job[];
  onFilter: (filteredJobs: Job[]) => void;
}

export default function Filter({ jobs, onFilter }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");

  const handleFilter = useCallback(() => {
    let filtered = [...jobs];

    if (status) {
      filtered = filtered.filter((job) => job.status === status);
    }

    if (date) {
      filtered = filtered.filter((job) => job.applicationDate === date);
    }

    onFilter(filtered);
  }, [status, date, jobs, onFilter]);

  useEffect(() => {
    handleFilter();
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (date) params.date = date;
    setSearchParams(params);
  }, [status, date, handleFilter, setSearchParams]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "6px" }}
      >
        <option value="">All Status</option>
        <option value="applied">Applied</option>
        <option value="interviewed">Interviewed</option>
        <option value="denied">Denied</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "6px" }}
      />
    </div>
  );
}
