// File: /src/pages/YourJobs.js
import React, { useState, useRef } from 'react';
import '../styles/YourJobs.css';

const YourJobs = () => {
  const initialJobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      dateApplied: "2025-01-10",
      status: "Interview",
      notes: "Follow up next week",
      isEditing: false
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Web Solutions",
      dateApplied: "2025-01-12",
      status: "Pending",
      notes: "Waiting for feedback",
      isEditing: false
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Data Systems",
      dateApplied: "2025-01-15",
      status: "Rejected",
      notes: "Sent thank you note",
      isEditing: false
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "Innovatech",
      dateApplied: "2025-01-18",
      status: "Offer",
      notes: "Offer received, reviewing terms",
      isEditing: false
    }
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [editedNote, setEditedNote] = useState("");
  const saveInitiated = useRef(false);

  const handleEdit = (id) => {
    const job = jobs.find(job => job.id === id);
    setEditedNote(job.notes);
    setJobs(jobs.map(job => job.id === id ? { ...job, isEditing: true } : job));
  };

  const handleCancel = (id) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, isEditing: false } : job));
    setEditedNote("");
  };

  const handleSave = (id) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, notes: editedNote, isEditing: false } : job));
    setEditedNote("");
  };

  return (
    <div className="your-jobs-container">
      <h1>Your Jobs</h1>
      <p>Track and update your job applications below:</p>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.dateApplied}</td>
              <td>{job.status}</td>
              <td>
                {job.isEditing ? (
                  <div className="notes-edit">
                    <input
                      type="text"
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveInitiated.current = true;
                          handleSave(job.id);
                        }
                      }}
                      onBlur={() => {
                        if (saveInitiated.current) {
                          saveInitiated.current = false;
                        } else {
                          handleCancel(job.id);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="notes-display">
                    <span>{job.notes}</span>
                    <button onClick={() => handleEdit(job.id)}>Edit</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourJobs;
