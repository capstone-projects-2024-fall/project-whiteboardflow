---
sidebar_position: 2
---

# Class Diagrams

```mermaid
classDiagram

  App --> Main
```

```mermaid
classDiagram

%% Class definitions

class User {
  +String userID
  +String name
  +String email
  +String password
  +List<QuestionHistory> questionHistory
  +login()
  +register()
}

class Question {
  +String questionID
  +String questionText
  +String questionType
  +List<TestCase> testCases
  +submitAnswer()
  +getFeedback()
}

class QuestionHistory {
  +String questionID
  +String answer
  +Date timestamp
  +boolean isCorrect
  +String feedback
}

class Whiteboard {
  +String whiteboardID
  +String sessionID
  +void draw()
  +void erase()
}

class Microphone {
  +String micID
  +String sessionID
  +void startRecording()
  +void stopRecording()
  +String analyzeSpeech()
}

class AI {
  +String aiID
  +String sessionID
  +void analyzeHandwriting()
  +void provideFeedback()
  +void assistUser()
}

class Backend {
  +void handleAPIRequest()
  +void handleRealTimeComms()
}

class Frontend {
  +void renderUI()
  +void useCanvasAPI()
  +void useSVG()
}

%% Associations and relationships

User "1" --* "many" QuestionHistory : logs
User "1" --o "many" Whiteboard : uses
Whiteboard "1" --o "1" Microphone : has
Question "1" --o "many" TestCase : contains
Whiteboard "1" --|> Frontend : inherits
Microphone "1" --|> Backend : inherits
AI "1" --|> Backend : interfaces with
User "1" --o "many" AI : receives feedback from
Backend "1" --|> Flask
Backend "1" --|> Django
Frontend "1" --|> ReactJS


```
