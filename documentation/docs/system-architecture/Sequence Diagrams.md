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

User->>Server:Generate interview question

activate Server
Server->>Database:Get random question
deactivate Server

activate Database
Database-->>Server:Return question and time limit
deactivate Database

activate Server
note right of Server:Display question, time limit, and \nwhiteboard for user
Server-->>User:Begin written test
deactivate Server

User->>Server:Written test complete

activate Server
Server-->>User:Begin oral test
deactivate Server

User->>Server:Oral test complete

activate Server
Server->>AI:Send user's written and oral answers
deactivate Server

activate AI
AI-->>Server:Return AI response
deactivate AI

activate Server
Server-->>Database:Store question, user's answer, and AI response
Server-->>User:Display AI response
deactivate Server

```

## 2: Digital Whiteboard

```mermaid

sequenceDiagram

participant User
participant Server
participant Whiteboard

activate Server
Server-->>User:Generate question
deactivate Server

User->>*Whiteboard:new()
User->>Whiteboard:Send touchscreen input to draw

activate Whiteboard
Whiteboard-->>User:Display pencil strokes
deactivate Whiteboard

User->>Whiteboard:Send touchscreen input to erase

activate Whiteboard
Whiteboard-->>User:Erase pencil strokes
deactivate Whiteboard

 
```

## 3: AI Assistant

```mermaid

sequenceDiagram 

participant User
participant Server
participant AI

activate Server
Server-->>User:Generate question
deactivate Server

User->>AI:Request hint (send question)

activate AI
AI-->>Server:Return hint
deactivate AI

activate Server
Server-->>User:Display hint
deactivate Server


```

## 4: Account Creation

```mermaid

sequenceDiagram

participant User
participant Server
participant OAuth Provider
participant Database

User->>Server:User selects "Create Account"

activate Server
Server-->>User:Redirect to OAuth login
deactivate Server

User->>OAuth Provider:Enter credentials

activate OAuth Provider
OAuth Provider-->>Server:Verify credentials
deactivate OAuth Provider

activate Server
Server->>Database:Store credentials
deactivate Server

activate Database
Database-->>Server:Return success
deactivate Database

activate Server
Server-->>User:Redirect to home page
deactivate Server

```

## 5: Account Deletion

```mermaid

sequenceDiagram

participant User
participant Server
participant Database

User->>Server:User request account deletion
activate Server
Server->>User:Oauth confirmation request
User-->>Server:Oauth confirmation
Server->>Database:Server requests account deletion
activate Database
Database-->>Server:Success message
deactivate Database
Server-->>User:Deletion success
deactivate Server

```

## 6: User Question History

```mermaid

sequenceDiagram

participant User
participant Server
participant Oauth Provider
participant Database

User->>Server:Oauth login request
activate Server

Server->>Oauth Provider:Oauth request
activate Oauth Provider
Oauth Provider-->>Server:Oauth success
deactivate Oauth Provider

Server-->>User:Oauth success
deactivate Server

User->>Server:Request question history
activate Server

Server->>Database:Request question history
activate Database

Database-->>Server:Questio/Score history data
deactivate Database

Server-->>User:Displays question history
deactivate Server

```

## 7: Hints

```mermaid

sequenceDiagram

participant User
participant Server
participant AI Assistant

activate Server
Server-->>User:User is given prompt to answer
deactivate Server

User->>Server: User requests hint from AI assistant
activate Server
Server ->> AI Assistant: Sends current user progress
activate AI Assistant

AI Assistant -->> Server: Returns result of analysis
deactivate AI Assistant

Server -->> User: Displays feedback from AI Assistant
deactivate Server

```

## 8: Unexpected Exit

```mermaid

sequenceDiagram

participant User
participant Server
participant Database

User ->> Server: Unexpected exit
activate Server
Server ->> Database: Sends current data to store
activate Database
Database -->> Server: success
deactivate Database
deactivate Server

User ->> Server: Requests to load previous progress
activate Server
Server ->> Database: Requests previous progress
activate Database
Database -->> Server: Returns data
deactivate Database
Server -->> User: Returns data
deactivate Server

```
