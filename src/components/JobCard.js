import React, { useContext } from 'react';
import '../styles/JobCard.css';
import { TokenContext } from './TokenContext';

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
  const { employerFlag } = useContext(TokenContext);

  const description =
    jobDescription ||
    "We are seeking an experienced professional to join our team. In this role, you will work on cutting-edge projects, collaborate with a talented group, and contribute to innovative solutions. Responsibilities include project management, client engagement, and strategic planning. Enjoy a competitive salary, excellent benefits, and a dynamic work environment.";

  const handleApply = () => {
    console.log("Clicked job id " + job_id);
    onApplyClick(job_id);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="header-left">
          <h2 className="job-title">{title}</h2>
          <div className="company-info">
            <a href={companyWebsite} target="_blank" rel="noopener noreferrer">
              {companyName}
            </a>
            <span className="job-location">{locations.join(', ')}</span>
          </div>
        </div>
        {!employerFlag && (
          <div className="header-right">
            <button onClick={handleApply} className="apply-button">
              Apply
            </button>
          </div>
        )}
      </div>
      <div className="job-card-body">
        <div className="job-details">
          <div className="job-info-row">
            <p className="salary-range">
              <strong>Salary:</strong> {salaryRange}
            </p>
            <p className="job-schedule">
              <strong>Schedule:</strong> {schedule}
            </p>
          </div>
          {benefits && benefits.length > 0 && (
            <p className="job-benefits">
              <strong>Benefits:</strong> {benefits.join(', ')}
            </p>
          )}
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
      </div>
    </div>
  );
};

export default JobCard;
