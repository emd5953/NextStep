// File: /src/pages/YourJobs.js
import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


import '../styles/YourJobs.css';
import { TokenContext } from '../components/TokenContext';

const YourJobs = () => {
  const { token } = useContext(TokenContext);

  const [ myApplications, setMyApplications ] = useState([]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMM D, YYYY");
  };

  useEffect(() => {
    const fetchMyApplications = async () =>{
      console.log("fetching applications");
      if (token) {
        try {
          const response = await axios.get(`https://nextstep-td90.onrender.com/applications`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`${response.status} ${response.statusText}\n`);
          setMyApplications(response.data);
          
        } catch (error) {
          console.error('Applications error:', error);
        }
      }
    };

    fetchMyApplications();
  },
  [token]);
  //const [jobs, setJobs] = useState(initialJobs);
  const [editedNote, setEditedNote] = useState("");
  const saveInitiated = useRef(false);

  const handleEdit = (id) => {
    const job = myApplications.find(job => job.jobDetails._id === id);
    setEditedNote(job.notes);
    setMyApplications(myApplications.map(job => job.jobDetails._id === id ? { ...job, isEditing: true } : job));
  };

  const handleCancel = (id) => {
    setMyApplications(myApplications.map(job => job.jobDetails._id === id ? { ...job, isEditing: false } : job));
    setEditedNote("");
  };

  const handleSave = (id) => {
    setMyApplications(myApplications.map(job => job.jobDetails._id === id ? { ...job, notes: editedNote, isEditing: false } : job));
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
          {myApplications.map(job => (
            <tr key={job.jobDetails._id}>
              <td>{job.jobDetails.title}</td>
              <td>{job.jobDetails.companyName}</td>
              <td>{formatDate(job.date_applied)}</td>
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
                    <button onClick={() => handleEdit(job.jobDetails._id)}>Edit</button>
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
