// File: /src/pages/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import '../styles/Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../components/TokenContext';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null); // for local photo viewer
  const [photo, setPhoto] = useState(null); // for mongo field
  const [resume, setResume] = useState(null);
  const [location, setLocation] = useState('');
  const navigate = useNavigate(1);
  //const location = useLocation();
  const { token, setToken } = useContext(TokenContext);
  const [ updateFlag, setUpdateFlag] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const response = await axios.get(`http://localhost:4000/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`${response.status} ${response.statusText}\n`);
          console.log('Get Profile Response:', response.data.email);
          setResume(response.data.resume);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setPhone(response.data.phone);
          setEmail(response.data.email);
          setLocation(response.data.location); 
          setProfileImage(response.data.encodedPhoto);         
          
        } catch (error) {
          console.error('Profile error:', error.response.data);
        }
      }
    };

    fetchProfile();

  }, [updateFlag, token, navigate, setToken]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setPhoto(file);

        // Preview the selected image so the user may 
        // verify that correct images is being uploaded
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
        const profileData = {
          firstName,
          lastName,
          phone,
          email,
          photo,
          resume,
          location,
        };*/

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    //formData.append("full_name", full_name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("location", location);

    if (photo) {
      formData.append("photo", photo); 
    }

    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const response = await axios.post('http://localhost:4000/updateprofile', formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      console.log(`${response.status} ${response.statusText}\n`);
      console.log('Update Profile Response:', response.data);
      setUpdateFlag(true);
      alert("Profile Updated");
    } catch (error) {
      console.error('Update Profile error:', error.response.data);
    }
    //setAuthToken(response.data.token);
    // You can handle the response data as needed
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        {/* Photo Upload */}
        <div>
          <img className="profile-image"
            src={profileImage}
            alt="Profile"
          />
        </div>
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

        {/* Location */}
        <div className="profile-form-group">
          <label className="profile-label">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
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
