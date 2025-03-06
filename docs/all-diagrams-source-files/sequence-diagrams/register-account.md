```mermaid
sequenceDiagram
    title Sign-up
    actor User
    User ->> Sign-up Page: Fill out Sign-up form
    Sign-up Page ->> Sign-up API: Submit sign up info
    Sign-up API ->> DB: Save account data 
    DB -->> Sign-up API: data saved
    Sign-up API ->> Sign-up Page: Account created
    Sign-up Page -->> User: Sign-up confirmation
```