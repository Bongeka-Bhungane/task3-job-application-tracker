import React from 'react'
import JobForm from '../compontents/JobForm'

export default function JobLists() {
  return (
    <div>
        <JobForm onJobAdded={function (job: any): void {
              // Handle the added job, e.g., log it or update state
              alert('Job: ' + JSON.stringify(job.title) + ' at ' + JSON.stringify(job.company) + ' added successfully!');
          }} />
    </div>
  )
}
