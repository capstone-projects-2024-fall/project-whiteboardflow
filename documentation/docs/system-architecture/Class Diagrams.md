---
sidebar_position: 2
---

# Class Diagrams

## Front End Diagram

```mermaid

graph TD
    subgraph Frontend
        HomePage --> QuestionSelect
        QuestionSelect --> DataTable
        QuestionSelect --> Whiteboard
        Whiteboard --> QuestionDisplay
        Whiteboard --> Editor
        Whiteboard --> SubmitButton
        Whiteboard --> HintButton
        OralTest --> ResponseImage
        OralTest --> MicPrompt
        Results --> FeedbackDisplay
        Layout --> History
        Layout --> Results
    end



```

## Back End Diagram

```mermaid

graph TD
    %% Main Components
    A[FastAPI Server] --> B[ai_assistant.py]
    A --> C[questions.py]
    A --> D[history.py]

    %% Firebase Integration
    B --> F(Firebase Config)
    C --> F
    D --> F
    G[Firebase Storage] --> F

    %% Supporting Components
    B --> H[base_models.py]
    B --> I[utils.py]
    A --> J[dependencies.py]

    %% Description of Each Component
    subgraph Backend
        A
        B
        C
        D
        F
    end

    subgraph Firebase
        G
    end

    subgraph Helpers
        H
        I
        J
    end

```



## Components diagrams

```mermaid

classDiagram
    HomePage --> QuestionSelect : Navigates
    QuestionSelect --> DataTable : Uses
    QuestionSelect --> Whiteboard : Selects Question
    Whiteboard --> QuestionDisplay : Displays Question
    Whiteboard --> Editor : Provides Editing
    Whiteboard --> SubmitButton : Submits Response
    SubmitButton --> OralTest : Navigates
    OralTest --> ResponseImage : Displays Uploaded Response
    OralTest --> MicPrompt : Records Explanation
    OralTest --> API : Submits for Processing
    API --> Results : Provides Feedback
    Results --> FeedbackDisplay : Displays Feedback
    Results --> QuestionSelect : Allows Retry
    Results --> History : Provides Access
    Layout --> History : Navigates
    History --> DataTable : Displays History
    class HomePage {
        +navigateToQuestionSelect()
    }
    class QuestionSelect {
        +selectQuestion()
        +confirmSelection()
    }
    class DataTable {
        +renderTable()
    }
    class Whiteboard {
        +displayQuestion()
        +editResponse()
        +submitResponse()
    }
    class QuestionDisplay {
        +renderQuestion()
    }
    class Editor {
        +captureInput()
    }
    class SubmitButton {
        +triggerNavigation()
    }
    class OralTest {
        +displayResponse()
        +recordExplanation()
        +submitForAnalysis()
    }
    class ResponseImage {
        +renderImage()
    }
    class MicPrompt {
        +startRecording()
    }
    class API {
        +processData()
    }
    class Results {
        +displayFeedback()
        +retryQuestion()
    }
    class FeedbackDisplay {
        +renderFeedback()
    }
    class History {
        +displayHistory()
    }
    class Layout {
        +navigateToHistory()
    }


``` -->
