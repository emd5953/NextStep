```mermaid
sequenceDiagram
    title Track Applications
    actor JobSeeker
    JobSeeker ->> Applications Page: View applications
    Applications Page ->> Applications API: Retrieve applications
    Applications API ->> DB: Query applications
    DB -->> Applications API: Return applications data
    Applications API ->> Applications Page: Return applications
    Applications Page -->> JobSeeker: Display applications

```