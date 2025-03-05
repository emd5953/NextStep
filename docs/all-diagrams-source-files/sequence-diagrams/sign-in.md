```mermaid
sequenceDiagram
    title Sign-In
    actor JobSeeker
    JobSeeker ->> SignInForm: Enter credentials
    SignInForm ->> AccountDB: Verify credentials
    AccountDB -->> SignInForm: Verification result
    SignInForm -->> JobSeeker: Sign-in successful

```