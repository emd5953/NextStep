```mermaid
sequenceDiagram
    title Manage Profile
    actor User
    User ->> Profile Page: Navigate to profile page
    Profile Page ->> Profile API: Retrieve profile information
    Profile API ->> DB: Query profile data
    DB -->> Profile API: Send profile details
    Profile API -->> Profile Page: Return profile info
    Profile Page -->> User: Show Profile info
    User ->> Profile Page: Change profile information
    Profile Page ->> Profile API: Save updated profile
    Profile API ->> DB: Update profile data
    DB -->> Profile API: Return update status
    Profile API -->> Profile Page: Confirm update
    Profile Page -->> User: Show confirmation
```