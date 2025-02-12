// File: /src/components/JobCard.js
import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({
  title,
  companyName,
  companyWebsite,
  salaryRange,
  benefits,
  locations,
  schedule,
  jobDescription,
  skills,
}) => {
  return (
    <div className="job-card">
      <h2 className="job-title">{title}</h2>
      <p className="company-name">
        <a href={companyWebsite} target="_blank" rel="noopener noreferrer">
          {companyName}
        </a>
      </p>
      <p className="salary-range"><strong>Salary:</strong> {salaryRange}</p>
      <p className="job-schedule"><strong>Schedule:</strong> {schedule}</p>
      <p className="job-locations">
        <strong>Location:</strong> {locations.join(', ')}
      </p>
      <p className="job-benefits">
        <strong>Benefits:</strong> {benefits.join(', ')}
      </p>
      <div className="job-description">
        <p>{jobDescription}</p>
      </div>
      <div className="job-skills">
        <strong>Skills/Requirements:</strong>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobCard;
