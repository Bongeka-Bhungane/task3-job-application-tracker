import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  jobs: any[];
  onFilter: (filteredJobs: any[]) => void;
}

export default function Filter({ jobs, onFilter }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");

  const handleFilter = useCallback(() => {
    if (!status) {
      onFilter(jobs);
    } else {
      const filtered = jobs.filter((job) => job.status === status);
      onFilter(filtered);
    }
  }, [status, jobs, onFilter]);

  useEffect(() => {
    handleFilter();
    if (status) {
      setSearchParams({ status });
    } else {
      setSearchParams({});
    }
  }, [status, handleFilter, setSearchParams]);

  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      style={{ marginLeft: "10px", padding: "6px" }}
    >
      <option value="">All Status</option>
      <option value="applied">Applied</option>
      <option value="interviewed">Interviewed</option>
      <option value="denied">Denied</option>
    </select>
  );
}
