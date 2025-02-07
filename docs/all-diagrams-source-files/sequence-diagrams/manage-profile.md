```mermaid
sequenceDiagram
    title Manage Profile
    actor JobSeeker
    JobSeeker ->> ProfilePage: Navigate to profile page
    ProfilePage ->> ProfileDB: Retrieve profile information
    ProfileDB -->> ProfilePage: Send profile details
    JobSeeker ->> ProfilePage: Update profile information
    ProfilePage ->> ProfileDB: Save updated profile
    ProfileDB -->> ProfilePage: Profile updated
    ProfilePage -->> JobSeeker: Update confirmation
```