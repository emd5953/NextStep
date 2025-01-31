import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  // Local state (for now) to track the form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just console log the data
    console.log({
      firstName,
      lastName,
      phone,
      email,
      photo,
      resume,
    });
    alert('Profile info submitted!');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        {/* Photo Upload */}
        <div className="profile-form-group">
          <label className="profile-label">Profile Photo</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePhotoChange} 
            className="profile-input"
          />
        </div>

        {/* Resume Upload */}
        <div className="profile-form-group">
          <label className="profile-label">Resume (PDF or DOC)</label>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            onChange={handleResumeChange} 
            className="profile-input"
          />
        </div>

        {/* First Name */}
        <div className="profile-form-group">
          <label className="profile-label">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
            className="profile-input"
          />
        </div>

        {/* Last Name */}
        <div className="profile-form-group">
          <label className="profile-label">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
            className="profile-input"
          />
        </div>

        {/* Phone */}
        <div className="profile-form-group">
          <label className="profile-label">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="123-456-7890"
            required
            className="profile-input"
          />
        </div>

        {/* Email */}
        <div className="profile-form-group">
          <label className="profile-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            className="profile-input"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="profile-button">Submit Profile</button>
      </form>
    </div>
  );
};

export default Profile;
