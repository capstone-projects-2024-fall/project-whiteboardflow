---
sidebar_position: 3
---

# Sequence Diagrams

## 1: Mock Interview

```mermaid

sequenceDiagram

participant User
participant Server
participant Database
participant AI

activate User
User ->> Server: Generate interview question
deactivate User

activate Server
Server ->> Database: Get random question
deactivate Server

activate Database
Database -->> Server: Return question and time limit
deactivate Database

activate Server
Server -->> User: Display question, time <br/>limit, and whiteboard
Server -->> User: Begin written test
deactivate Server

activate User
User ->> Server: Written test complete
deactivate User

activate Server
Server -->> User: Begin oral test
deactivate Server

activate User
User ->> Server: Oral test complete
deactivate User

activate Server
Server ->> AI: Send user's written and oral answers
deactivate Server

activate AI
AI -->> Server: Return AI response
deactivate AI

activate Server
Server -->> Database: Store question, user's answer, and AI response
Server -->> User: Display AI response
deactivate Server

```

## 2: Digital Whiteboard

```mermaid

sequenceDiagram

participant User
participant Server
participant Whiteboard

activate Server
Server -->> User: Generate question
deactivate Server

activate User
User ->> Whiteboard: new()
activate Whiteboard
deactivate Whiteboard
User ->> Whiteboard: Send touchscreen input to draw
deactivate User

activate Whiteboard
Whiteboard -->> User: Display pencil strokes
deactivate Whiteboard

activate User
User ->> Whiteboard: Send touchscreen input to erase
deactivate User

activate Whiteboard
Whiteboard -->> User: Erase pencil strokes
deactivate Whiteboard

```

## 3: AI Assistant

```mermaid

sequenceDiagram 

participant User
participant Server
participant AI

activate Server
Server -->> User: Generate question
deactivate Server

activate User
User ->> AI: Request hint (send question)
deactivate User

activate AI
AI -->> Server: Return hint
deactivate AI

activate Server
Server -->> User: Display hint
deactivate Server

```

## 4: Account Creation

```mermaid

sequenceDiagram

participant User
participant Server
participant OAuth Provider
participant Database

activate User
User ->> Server: User selects "Create Account"
deactivate User

activate Server
Server -->> User: Redirect to OAuth login
deactivate Server

activate User
User ->> OAuth Provider: Enter credentials
deactivate User

activate OAuth Provider
OAuth Provider -->> Server: Verify credentials
deactivate OAuth Provider

activate Server
Server ->> Database: Store credentials
deactivate Server

activate Database
Database -->> Server: Return success
deactivate Database

activate Server
Server -->> User: Redirect to home page
deactivate Server

```

## 5: Account Deletion

```mermaid

sequenceDiagram

participant User
participant Server
participant Database

activate User
User ->> Server: Request account deletion
deactivate User

activate Server
Server -->> User: OAuth confirmation request
deactivate Server

activate User
User ->> Server: OAuth confirmation
deactivate User

activate Server
Server ->> Database: Request account deletion
deactivate Server

activate Database
Database -->> Server: Return success
deactivate Database

activate Server
Server -->> User: Deletion success
deactivate Server

```

## 6: User Question History

```mermaid

sequenceDiagram

participant User
participant Server
participant OAuth Provider
participant Database

activate User
User ->> Server: OAuth login request
deactivate User

activate Server
Server ->> OAuth Provider: OAuth request
deactivate Server

activate OAuth Provider
OAuth Provider -->> Server: OAuth success
deactivate OAuth Provider

activate Server
Server -->> User: OAuth success
deactivate Server

activate User
User ->> Server: Request question history
deactivate User

activate Server
Server ->> Database: Request question history
deactivate Server

activate Database
Database -->> Server: Question/score history data
deactivate Database

activate Server
Server -->> User: Displays question history
deactivate Server

```

## 7: Hints

```mermaid

sequenceDiagram

participant User
participant Server
participant AI Assistant

activate Server
Server -->> User: User is given prompt to answer
deactivate Server

activate User
User ->> Server: User requests hint from AI assistant
deactivate User

activate Server
Server ->> AI Assistant: Sends current user progress
deactivate Server

activate AI Assistant
AI Assistant -->> Server: Returns result of analysis
deactivate AI Assistant

activate Server
Server -->> User: Displays feedback from AI Assistant
deactivate Server

```

## 8: Unexpected Exit

```mermaid

sequenceDiagram

participant User
participant Server
participant Database

activate User
User ->> Server: Unexpected exit
deactivate User

activate Server
Server ->> Database: Sends current data to store
deactivate Server

activate Database
Database -->> Server: Return success
deactivate Database

activate Server
Server -->> User: Return success
deactivate Server

activate User
User ->> Server: Requests to load previous progress
deactivate User

activate Server
Server ->> Database: Requests previous progress
deactivate Server

activate Database
Database -->> Server: Return data
deactivate Database

activate Server
Server -->> User: Return data
deactivate Server

```
