import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  jobs: any[];
  onFilter: (filteredJobs: any[]) => void;
}

export default function Filter({ jobs, onFilter }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [date, setDate] = useState(searchParams.get("date") || ""); // ✅ new date filter

  const handleFilter = useCallback(() => {
    let filtered = [...jobs];

    if (status) {
      filtered = filtered.filter((job) => job.status === status);
    }

    if (date) {
      filtered = filtered.filter(
        (job) => job.applicationDate && job.applicationDate === date
      );
    }

    onFilter(filtered);
  }, [status, date, jobs, onFilter]);

  useEffect(() => {
    handleFilter();

    const params: any = {};
    if (status) params.status = status;
    if (date) params.date = date;
    setSearchParams(params);
  }, [status, date, handleFilter, setSearchParams]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginLeft: "10px",
      }}
    >
      {/* ✅ Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "6px" }}
      >
        <option value="">Status</option>
        <option value="applied">Applied</option>
        <option value="interviewed">Interviewed</option>
        <option value="denied">Denied</option>
      </select>

      {/* ✅ Date Filter */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "6px" }}
      />
    </div>
  );
}
