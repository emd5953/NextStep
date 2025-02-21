// File: /src/components/JobCard.js
import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({
  job_id,
  title,
  companyName,
  companyWebsite,
  salaryRange,
  benefits,
  locations,
  schedule,
  jobDescription,
  skills, 
  onApplyClick
}) => {
  const description =
    jobDescription ||
    "We are seeking an experienced professional to join our team. In this role, you will work on cutting-edge projects, collaborate with a talented group, and contribute to innovative solutions. Responsibilities include project management, client engagement, and strategic planning. Enjoy a competitive salary, excellent benefits, and a dynamic work environment.";

    const handleApply = () => {
      // Pass the job_id to the parent component's click handler
      console.log("Clicked job id " + job_id);
      onApplyClick(job_id);
    };
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h2 className="job-title">{title}</h2>
        <div className="job-meta">
          <span className="company-name">
            <a href={companyWebsite} target="_blank" rel="noopener noreferrer">
              {companyName}
            </a>
          </span>
          <span className="job-location">{locations.join(', ')}</span>
        </div>
      </div>
      <div className="job-card-body">
        <div className="job-details">
          <div className="job-info-row">
            <p className="salary-range">
              <strong>Salary:</strong> {salaryRange}
            </p>
            <p className="job-benefits">
              <strong>Benefits:</strong> {benefits.join(', ')}
            </p>
          </div>
          <p className="job-schedule">
            <strong>Schedule:</strong> {schedule}
          </p>
        </div>
        <div className="job-description">
          <p>{description}</p>
        </div>
        {skills && skills.length > 0 && (
          <div className="job-skills">
            <strong>Skills/Requirements:</strong>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <button onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
