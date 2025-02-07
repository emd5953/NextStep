```mermaid
sequenceDiagram
    title Register Account
    actor JobSeeker
    JobSeeker ->> RegistrationForm: Fill out registration form
    RegistrationForm ->> AccountDB: Create new account
    AccountDB -->> RegistrationForm: Account created
    RegistrationForm -->> JobSeeker: Registration confirmation
```