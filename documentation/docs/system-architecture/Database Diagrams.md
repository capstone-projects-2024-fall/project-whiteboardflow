---
sidebar_position: 4
---

# Database Diagrams

```mermaid
    %% Entities and their attributes
    
    USER ||--o{ QUESTION_HISTORY: "logs"
    USER ||--o{ WHITEBOARD_SESSION: "initiates"
    USER ||--o{ HANDWRITING_ANALYSIS: "receives"
    USER ||--o{ NLP_ANALYSIS: "receives"
    USER ||--o{ FEEDBACK: "receives"
    USER ||--o{ AUTHENTICATION: "has"
    USER ||--o{ SPEECH_ANALYSIS: "verbalizes"
    USER ||--o{ AUDIO_DATA: "stores audio"
    USER ||--o{ PERFORMANCE_METRICS: "tracked by"
    USER ||--o{ USER_PREFERENCES: "configures"

    WHITEBOARD_SESSION ||--o{ HANDWRITING_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ NLP_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ SPEECH_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ AUDIO_DATA: "includes"
    
    QUESTION ||--o{ QUESTION_HISTORY: "is part of"
    QUESTION ||--o{ PERFORMANCE_METRICS: "related to"
    QUESTION ||--o{ QUESTION_CATEGORY: "classified by"

    %% USER entity
    USER {
        String user_id PK
        String name
        String email
        String password
    }

    %% QUESTION entity
    QUESTION {
        String question_id PK
        String question_text
        String question_type
        String difficulty_level
        String category_id FK
    }

    %% QUESTION_CATEGORY entity
    QUESTION_CATEGORY {
        String category_id PK
        String category_name
    }

    %% QUESTION_HISTORY entity
    QUESTION_HISTORY {
        String history_id PK
        String user_id FK
        String question_id FK
        String answer
        Date timestamp
        Boolean is_correct
        String feedback
    }

    %% WHITEBOARD_SESSION entity
    WHITEBOARD_SESSION {
        String session_id PK
        String user_id FK
        Date start_time
        Date end_time
    }

    %% HANDWRITING_ANALYSIS entity
    HANDWRITING_ANALYSIS {
        String analysis_id PK
        String session_id FK
        String user_id FK
        Text analysis_result
    }

    %% NLP_ANALYSIS entity
    NLP_ANALYSIS {
        String analysis_id PK
        String session_id FK
        String user_id FK
        Text analysis_result
    }

    %% FEEDBACK entity
    FEEDBACK {
        String feedback_id PK
        String user_id FK
        Text feedback_text
        Date timestamp
    }

    %% AUTHENTICATION entity
    AUTHENTICATION {
        String auth_id PK
        String user_id FK
        Date auth_date
        String provider
    }

    %% SPEECH_ANALYSIS entity
    SPEECH_ANALYSIS {
        String speech_id PK
        String session_id FK
        String user_id FK
        Text transcription_text
        Float confidence_score
        Date timestamp
    }

    %% AUDIO_DATA entity
    AUDIO_DATA {
        String audio_id PK
        String session_id FK
        String user_id FK
        Binary audio_file
        Date timestamp
    }

    %% PERFORMANCE_METRICS entity
    PERFORMANCE_METRICS {
        String performance_id PK
        String user_id FK
        String question_id FK
        Float accuracy_score
        Float time_taken
        Text improvement_suggestions
        Date timestamp
    }

    %% USER_PREFERENCES entity
    USER_PREFERENCES {
        String preference_id PK
        String user_id FK
        Boolean audio_feedback_enabled
        Boolean handwriting_feedback_enabled
        String preferred_difficulty
    }

    %% Relationships
    USER ||--o{ QUESTION_HISTORY: "logs"
    USER ||--o{ WHITEBOARD_SESSION: "initiates"
    USER ||--o{ HANDWRITING_ANALYSIS: "receives"
    USER ||--o{ NLP_ANALYSIS: "receives"
    USER ||--o{ FEEDBACK: "receives"
    USER ||--o{ AUTHENTICATION: "has"
    USER ||--o{ SPEECH_ANALYSIS: "verbalizes"
    USER ||--o{ AUDIO_DATA: "stores audio"
    USER ||--o{ PERFORMANCE_METRICS: "tracked by"
    USER ||--o{ USER_PREFERENCES: "configures"
    QUESTION ||--o{ QUESTION_HISTORY: "is part of"
    QUESTION ||--o{ PERFORMANCE_METRICS: "related to"
    QUESTION ||--o{ QUESTION_CATEGORY: "classified by"
    WHITEBOARD_SESSION ||--o{ HANDWRITING_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ NLP_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ SPEECH_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ AUDIO_DATA: "includes"

```
erDiagram

    %% Entities and their attributes
    
    USER ||--o{ QUESTION_HISTORY: "logs"
    USER ||--o{ WHITEBOARD_SESSION: "initiates"
    USER ||--o{ HANDWRITING_ANALYSIS: "receives"
    USER ||--o{ NLP_ANALYSIS: "receives"
    USER ||--o{ FEEDBACK: "receives"
    USER ||--o{ AUTHENTICATION: "has"
    USER ||--o{ SPEECH_ANALYSIS: "verbalizes"
    USER ||--o{ AUDIO_DATA: "stores audio"
    USER ||--o{ PERFORMANCE_METRICS: "tracked by"
    USER ||--o{ USER_PREFERENCES: "configures"

    WHITEBOARD_SESSION ||--o{ HANDWRITING_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ NLP_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ SPEECH_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ AUDIO_DATA: "includes"
    
    QUESTION ||--o{ QUESTION_HISTORY: "is part of"
    QUESTION ||--o{ PERFORMANCE_METRICS: "related to"
    QUESTION ||--o{ QUESTION_CATEGORY: "classified by"

    %% USER entity
    USER {
        String user_id PK
        String name
        String email
        String password
    }

    %% QUESTION entity
    QUESTION {
        String question_id PK
        String question_text
        String question_type
        String difficulty_level
        String category_id FK
    }

    %% QUESTION_CATEGORY entity
    QUESTION_CATEGORY {
        String category_id PK
        String category_name
    }

    %% QUESTION_HISTORY entity
    QUESTION_HISTORY {
        String history_id PK
        String user_id FK
        String question_id FK
        String answer
        Date timestamp
        Boolean is_correct
        String feedback
    }

    %% WHITEBOARD_SESSION entity
    WHITEBOARD_SESSION {
        String session_id PK
        String user_id FK
        Date start_time
        Date end_time
    }

    %% HANDWRITING_ANALYSIS entity
    HANDWRITING_ANALYSIS {
        String analysis_id PK
        String session_id FK
        String user_id FK
        Text analysis_result
    }

    %% NLP_ANALYSIS entity
    NLP_ANALYSIS {
        String analysis_id PK
        String session_id FK
        String user_id FK
        Text analysis_result
    }

    %% FEEDBACK entity
    FEEDBACK {
        String feedback_id PK
        String user_id FK
        Text feedback_text
        Date timestamp
    }

    %% AUTHENTICATION entity
    AUTHENTICATION {
        String auth_id PK
        String user_id FK
        Date auth_date
        String provider
    }

    %% SPEECH_ANALYSIS entity
    SPEECH_ANALYSIS {
        String speech_id PK
        String session_id FK
        String user_id FK
        Text transcription_text
        Float confidence_score
        Date timestamp
    }

    %% AUDIO_DATA entity
    AUDIO_DATA {
        String audio_id PK
        String session_id FK
        String user_id FK
        Binary audio_file
        Date timestamp
    }

    %% PERFORMANCE_METRICS entity
    PERFORMANCE_METRICS {
        String performance_id PK
        String user_id FK
        String question_id FK
        Float accuracy_score
        Float time_taken
        Text improvement_suggestions
        Date timestamp
    }

    %% USER_PREFERENCES entity
    USER_PREFERENCES {
        String preference_id PK
        String user_id FK
        Boolean audio_feedback_enabled
        Boolean handwriting_feedback_enabled
        String preferred_difficulty
    }

    %% Relationships
    USER ||--o{ QUESTION_HISTORY: "logs"
    USER ||--o{ WHITEBOARD_SESSION: "initiates"
    USER ||--o{ HANDWRITING_ANALYSIS: "receives"
    USER ||--o{ NLP_ANALYSIS: "receives"
    USER ||--o{ FEEDBACK: "receives"
    USER ||--o{ AUTHENTICATION: "has"
    USER ||--o{ SPEECH_ANALYSIS: "verbalizes"
    USER ||--o{ AUDIO_DATA: "stores audio"
    USER ||--o{ PERFORMANCE_METRICS: "tracked by"
    USER ||--o{ USER_PREFERENCES: "configures"
    QUESTION ||--o{ QUESTION_HISTORY: "is part of"
    QUESTION ||--o{ PERFORMANCE_METRICS: "related to"
    QUESTION ||--o{ QUESTION_CATEGORY: "classified by"
    WHITEBOARD_SESSION ||--o{ HANDWRITING_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ NLP_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ SPEECH_ANALYSIS: "includes"
    WHITEBOARD_SESSION ||--o{ AUDIO_DATA: "includes"

