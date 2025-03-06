```mermaid
sequenceDiagram
    title View Recommendations
    actor JobSeeker
    JobSeeker ->> RecommendationsPage: View recommendations
    RecommendationsPage ->> Recommendation API: Retrieve recommendations
    Recommendation API ->> DB: Retrieve recommendations
    DB -->> Recommendation API: Send recommendations
    Recommendation API -->> RecommendationsPage: Send recommendations
    RecommendationsPage -->> JobSeeker: Display recommendations
    alt Browse Through Recommendations
        JobSeeker ->> RecommendationsPage: Navigate through recommendations
        RecommendationsPage -->> JobSeeker: Display next/previous recommendations
    end
    alt Optionally View Job Details Card
        JobSeeker ->> RecommendationsPage: Click on job listing
        RecommendationsPage ->> Recommendation API: Retrieve job details
        Recommendation API ->> DB: Retrieve job details
        DB -->> Recommendation API: Send job details
        Recommendation API -->> RecommendationsPage: Send job details
        RecommendationsPage -->> JobSeeker: Display job details
        alt Optionally Apply for Recommended Job
            JobSeeker ->> RecommendationsPage: Click on apply button
            RecommendationsPage ->> Apply API: Submit application
            Apply API ->> DB: Submit application
            DB -->> Apply API: Application submitted
            Apply API -->> RecommendationsPage: Application confirmation
            RecommendationsPage -->> JobSeeker: Application confirmation
        end
    end
```