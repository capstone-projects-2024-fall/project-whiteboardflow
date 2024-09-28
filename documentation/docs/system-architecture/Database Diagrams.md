---
sidebar_position: 4
---

# Database Diagrams
## Entity-Relation Diagram
```mermaid
erDiagram

     %% Entities and their attributes

    USER ||--o{ SESSION: "owns"
    USER ||--o{ AUTHENTICATION: "uses"
    USER ||--o{ USER_PREFERENCES: "configures"
    SESSION ||--o{ QUESTION: "contains"
    SESSION ||--o{ ANALYSIS: "generates"
    QUESTION ||--o{ CATEGORY: "classified in"

    %% USER entity
    USER {
        String user_id PK
        String name
        String email
        String password
        Boolean audio_feedback_enabled
        Boolean handwriting_feedback_enabled
        String preferred_difficulty
    }

    %% SESSION entity
    SESSION {
        String session_id PK
        String user_id FK
        Date start_time
        Date end_time
        Text feedback_text
        Date feedback_timestamp
    }

    %% QUESTION entity
    QUESTION {
        String question_id PK
        String question_text
        String difficulty_level
        String category_id FK
    }

    %% CATEGORY entity
    CATEGORY {
        String category_id PK
        String category_name
    }

    %% ANALYSIS entity
    ANALYSIS {
        String analysis_id PK
        String session_id FK
        Text handwriting_result
        Text nlp_result
        Text speech_transcription
        Float speech_confidence
    }

    %% Relationships
    USER ||--o{ SESSION: "owns"
    USER ||--o{ AUTHENTICATION: "uses"
    USER ||--o{ USER_PREFERENCES: "configures"
    SESSION ||--o{ QUESTION: "contains"
    SESSION ||--o{ ANALYSIS: "generates"
    QUESTION ||--o{ CATEGORY: "classified in"
```
USER manages user authentication and profile information.</br>
SESSION manages user sessions, detailing each instance where a user engages with coding and estimation problems on the digital whiteboard (one-to-many with USER). </br>
QUESTION contains the coding and estimation problems available for user interaction within sessions, classified into categories (many-to-one with CATEGORY). </br>
CATEGORY organizes questions into distinct categories based on their content or difficulty level (one-to-many with QUESTION). </br>
ANALYSIS stores results from handwriting, speech, and natural language processing analysis related to user inputs during sessions (many-to-one with SESSION). </br>
FEEDBACK captures feedback provided to users based on their session performance, linked directly to SESSION (one-to-one with SESSION). </br>
USER_PREFERENCES holds user-configured settings that affect how the application behaves and interacts with the user, such as feedback options and interface preferences (one-to-one with USER).
