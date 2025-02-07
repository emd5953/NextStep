```mermaid
sequenceDiagram
    title Browse Jobs
    actor JobSeeker
    JobSeeker ->> JobsPage: Navigate to jobs page
    JobsPage ->> SearchCriteriaForm: Enter search criteria
    SearchCriteriaForm ->> JobsDB: Retrieve job listings based on criteria
    JobsDB -->> JobsPage: Send job listings
    JobsPage -->> JobSeeker: Display job listings
    alt Optionally View Job Details Card
        JobSeeker ->> JobsPage: Click/Swipe on job listing
        JobsPage ->> JobsDB: Retrieve job details
        JobsDB -->> JobsPage: Send job details
        JobsPage -->> JobSeeker: Display job details
        alt Optionally Apply for Job
            JobSeeker ->> ApplicationForm: Click on apply button
            ApplicationForm ->> ApplicationsDB: Submit application
            ApplicationsDB -->> ApplicationForm: Application submitted
            ApplicationForm -->> JobSeeker: Application confirmation
        end
    end

