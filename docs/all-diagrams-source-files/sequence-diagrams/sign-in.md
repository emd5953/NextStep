```mermaid
sequenceDiagram
    title Sign-In
    actor User
    User ->> Sign-in Form: Enter credentials
    Sign-in Form ->> Sign-in API: Submit credentials
    Sign-in API ->> DB: Lookup account
    DB -->> Sign-in API: Retreive matched profile
    Sign-in API -->> Sign-in Form: Return success  
    Sign-in Form -->> User: Sign-in successful

```