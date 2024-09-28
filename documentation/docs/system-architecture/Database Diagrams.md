---
sidebar_position: 4
---

# Database Diagrams

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

    %% AUTHENTICATION entity
    AUTHENTICATION {
        String auth_id PK
        String user_id FK
        Date auth_date
        String provider
    }

    %% Relationships
    USER ||--o{ SESSION: "owns"
    USER ||--o{ AUTHENTICATION: "uses"
    USER ||--o{ USER_PREFERENCES: "configures"
    SESSION ||--o{ QUESTION: "contains"
    SESSION ||--o{ ANALYSIS: "generates"
    QUESTION ||--o{ CATEGORY: "classified in"
