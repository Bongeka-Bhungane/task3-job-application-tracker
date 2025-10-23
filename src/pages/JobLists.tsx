import React, { useState, useEffect } from "react";
import JobForm from "../compontents/JobForm";
import JobListCard from "../compontents/JobListCard";
import type { Job, User } from "../types";
import Modal from "react-modal";
import Button from "../compontents/Button";
import Search from "../compontents/Search";
import Filter from "../compontents/Filter";
import NavBar from "../compontents/NavBar";
import Footer from "../compontents/Footer";

export default function JobLists() {
  const [visible, setVisible] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [displayJobs, setDisplayJobs] = useState<Job[]>([]);

  // Load jobs for logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: User = JSON.parse(storedUser);
    setJobs(user.jobs || []);
    setDisplayJobs(user.jobs || []);
  }, []);

  return (
    <div className="main-page">
      <div className="main-nav">
        <NavBar />
      </div>

      <div className="content-area">
        <div className="job-lists-container">
          <div className="job-card-container">
            <div className="search-filter-container">
              <div className="search-container">
                <Search jobs={jobs} onSearch={setDisplayJobs} />
              </div>
              <div className="filter-container">
                <Filter jobs={jobs} onFilter={setDisplayJobs} />
              </div>
            </div>
            <JobListCard jobs={displayJobs} setJobs={setJobs} />
          </div>

          <div className="add-button">
            <Button
              name="Add Job"
              color="green"
              className="round-button"
              onClick={() => setVisible(true)}
            />
            <Modal
              isOpen={visible}
              onRequestClose={() => setVisible(false)}
              style={{
                overlay: { background: "#818D92" },
                content: { width: "50%", height: "50%", margin: "auto" },
              }}
              ariaHideApp={false}
            >
              <JobForm
                onJobAdded={(newJob) => {
                  setJobs((prev) => [...prev, newJob]);
                  setDisplayJobs((prev) => [...prev, newJob]);
                  setVisible(false);
                }}
              />
            </Modal>
          </div>
        </div>
      </div>
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
}
