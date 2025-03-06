```mermaid
sequenceDiagram
    title Browse Jobs
    actor Job Seeker
    Job Seeker ->> Jobs Page: Navigate to Jobs page
    Jobs Page ->> Jobs Page: Enter search criteria
    Jobs Page ->> Jobs API: Retrieve job listings based on criteria
    Jobs API ->> DB: Query Jobs
    DB ->> Jobs API: 
    Jobs API -->> Jobs Page: Return job listings
    Jobs Page -->> Job Seeker: Display job listings
    alt Optionally Apply for Job
        Job Seeker ->> Jobs Page: Click apply button
        Jobs Page ->> Apply API: Submit application
        Apply API -->> DB: Save Application Information
        DB ->> Apply API: Application saved
        Apply API -->> Jobs Page: Application submitted
        Jobs Page -->> Job Seeker: Display confirmation
    end

