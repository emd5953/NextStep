# NextStep - A Swipe-Based Job Matching App

<img src="assets/NextStep_Logo.png">

NextStep is a **web and mobile job-matching platform** designed to simplify the job search process using a **swipe-based** interface. It leverages **AI-driven recommendations** and **real-time tracking** to connect job seekers with employers efficiently.

##  Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Overview

**NextStep** is a job-matching application with a **swipe-based** interface that helps job seekers efficiently browse and apply for jobs. Employers can post job listings, track applications, and connect with candidates in real time.


### 🎯 **Core Objectives**
 **Swipe-Based Job Discovery** – Browse jobs with a swipe-like/scroll experience inspired from popular apps such as Hinge, Tiktok, Tinder.
 **AI-Powered Job Recommendations** – Tailored job suggestions based on profile & history  
 **One-Click Apply** – Apply instantly with stored profile/resume  
 **Application Tracking** – Track job application statuses in real-time  
 **Employer Dashboard** – Post jobs, review candidates, and schedule interviews  
 **Multi-Platform Support** – Accessible via Web and Mobile  

---

## 🛠 **Technologies Used**

### **Backend**
- **Node.js** – Server-side runtime
- **Express.js** – Web framework
- **MongoDB Atlas** – Cloud-based NoSQL database
- **Mongoose** – ODM for MongoDB schema validation
- **JWT (JSON Web Tokens)** – Authentication system
- **Firebase Cloud Messaging (FCM)** – Push notifications
- **AWS/GCP** – Cloud hosting (for scalability)

### **Frontend**
- **React.js (Web App)**
- **React Native (Mobile App)**
- **React Router** – Frontend navigation
- **Axios** – API communication

### **DevOps & Deployment**
- pending.


---

## 🔧 **Installation**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/nextstep.git
cd nextstep

### **2️⃣ Install Backend Dependencies**
cd backend
npm install

### **3️⃣ Install Frontend Dependencies**
cd ../frontend
npm install


## ⚙️ **Configuration**
Before running the app, configure the environment variables.

**Backend .env File**

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nextstep
PORT=5000
JWT_SECRET=your_jwt_secret
FIREBASE_SERVER_KEY=your_firebase_server_key

**Frontend .env File**
REACT_APP_BACKEND_URL=http://localhost:5000
