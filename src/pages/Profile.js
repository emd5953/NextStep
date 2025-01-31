import React, { useState } from 'react';

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
    // You could send this data to a backend, etc.
    alert('Profile info submitted!');
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Photo Upload */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Profile Photo</label>
          <input style={styles.input} type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        {/* Resume Upload */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Resume (PDF or DOC)</label>
          <input style={styles.input} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
        </div>

        {/* First Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            style={styles.input}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            style={styles.input}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Phone */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            style={styles.input}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="123-456-7890"
            required
          />
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" style={styles.button}>Submit Profile</button>
      </form>
    </div>
  );
};

// Simple inline styles for demonstration
const styles = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    backgroundColor: '#ff7eb3',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Profile;
