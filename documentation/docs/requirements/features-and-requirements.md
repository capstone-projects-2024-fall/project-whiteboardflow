---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

### Interview Questions
- The application will include a database of interview questions for users to answer.
- The question categories will include:
  - Fermi approximation questions (estimation and problem-solving based on limited information).
  - Conditional statements
  - Loops
  - Strings
  - Arrays
  - Data structures
  - Algorithms
  - Recursion

### Question Process
- The application will follow a structured question flow:
  1. Present a question and prompt the user to respond using the digital whiteboard.
  2. After the user completes their response, prompt them to explain their thought process verbally.
  3. The AI assistant will analyze the user's work and provide feedback.

### Digital Whiteboard
- Users will be able to write answers on a digital whiteboard with the following tools:
  - Pencil tool for drawing and writing.
  - Eraser tool with a clear screen option.
  - Undo/redo functionality for drawing strokes.

### Speech to Text
- The application will transcribe the user's spoken explanations to facilitate analysis during problem-solving.

### AI Assistant
- The AI assistant will use the OpenAI API to:
  - Analyze the user's handwriting, code, and solutions for correctness and logic.
  - Evaluate the user's thought process and problem-solving approach.
  - Provide feedback on identified weaknesses.
  - Offer hints or feedback upon request based on the user’s progress.

### Account Sign-Up and Login
- Users will sign up and log in using Google authentication.
- User profiles will be securely stored in a Firebase database.
- After signing in, users will be directed to the home page.

### Home Page
- The application’s home page will feature:
  - A button to start a mock interview.
  - A navigation menu (hamburger menu) with:
    - Log-out option.
    - Previous questions and results.

### Account Deletion
- The application will allow secure account deletion, which includes:
  - Re-authentication through OAuth (Google) for security.
  - A confirmation email.
  - Removal of all user records from the Firebase database.

### Question History
- Users can view their past questions and feedback from the AI assistant.

## Nonfunctional Requirements

### AI Assistant Flexibility
- The AI assistant will:
  - Provide specific feedback tailored to the user’s work.
  - Offer hints and feedback upon the user’s request.

### Accessibility
- The application will be accessible through:
  - **Written input** using a stylus, touch, mouse, or keyboard.
  - **Oral input** using a microphone or keyboard.

### Interface
- The user interface will be designed for simplicity and ease of use, following modern design principles.
- The application will support both dark and light modes.

### Security
- The application will employ secure data solutions, such as Firebase, OAuth, and bearer token authentication for user authentication and data management.
