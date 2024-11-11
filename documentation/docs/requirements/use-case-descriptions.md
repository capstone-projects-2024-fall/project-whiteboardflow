---
sidebar_position: 5
---

# Use-case Descriptions

## Use Case 1: Mock Interview

**Actor**: A recent graduate who is somewhat uncertain about their problem-solving skills and wants to prepare for upcoming job interviews by practicing on WhiteboardFlow.

**Pre-Condition**: The user is logged into the WhiteboardFlow application and on the main dashboard.

**Post-Condition**: The user receives immediate feedback on their answer.

### Main Success Scenario
1. The user selects the “Start Interview” button on the dashboard.
2. The system displays a new interview question on the digital whiteboard.
3. The user writes their solution on the whiteboard.
4. The system provides real-time feedback on the user's answer.

---

## Use Case 2: Digital Whiteboard

**Actor**: A student who learns best through visual methods and needs a space to draw out answers for problem-solving.

**Pre-Condition**: The user has started an exercise and is on the digital whiteboard screen.

**Post-Condition**: The user successfully draws, edits, or erases their responses on the whiteboard.

### Main Success Scenario
1. The user starts an exercise.
2. The system presents a digital whiteboard interface for answering questions.
3. The user uses a stylus or finger to write on the whiteboard.
4. The user erases or deletes content as needed.
5. The user can undo or redo individual pen strokes.

---

## Use Case 3: AI Assistant

**Actor**: A user who is practicing for technical interviews and occasionally needs hints to overcome challenging questions.

**Pre-Condition**: The user is logged in, has started a practice problem, but is uncertain about their approach.

**Post-Condition**: The user receives AI-generated guidance on how to proceed with the question.

### Main Success Scenario
1. The user selects a question to answer.
2. The user becomes unsure of how to proceed.
3. The user clicks a "Request Help" button.
4. The system generates a hint or guiding question based on the user's current work.

---

## Use Case 4: Account Creation

**Actor**: A new user who has recently downloaded WhiteboardFlow and wants to set up their profile quickly to start practicing.

**Pre-Condition**: The user has opened the WhiteboardFlow application for the first time.

**Post-Condition**: A new account is created for the user, and they are logged in.

### Main Success Scenario
1. The user opens the WhiteboardFlow application.
2. The user selects "Create Account."
3. The user links an existing Google or Facebook account through OAuth.
4. The system confirms the account creation and logs the user in.

---
## Use Case 5: Account Deletion

**Actor**: A user who has decided to stop using WhiteboardFlow and wants to remove their account and all related data.

**Pre-Condition**: The user is logged into WhiteboardFlow and has navigated to their settings/preferences menu.

**Post-Condition**: The user's account and data are removed from the Firebase database.

### Main Success Scenario
1. The user accesses the preferences drop-down menu.
2. The user selects "Delete Account."
3. The system prompts the user to confirm by re-authenticating via OAuth.
4. The system deletes the user’s profile and all associated data from Firebase.

---

## Use Case 6: User Practice History

**Actor**: A user who wants to track their progress and review feedback on previous practice problems.

**Pre-Condition**: The user is logged into WhiteboardFlow.

**Post-Condition**: The user can review past questions and feedback.

### Main Success Scenario
1. The user logs into their WhiteboardFlow account.
2. The user accesses the "Previous Questions" table via the hamburger menu on the homepage.
3. The user clicks on a specific question from the history list.
4. The system displays the question, AI-generated feedback, and the user’s speech emotion score.
5. The user reviews the feedback and closes the view.

---

## Use Case 7: Hints

**Actor**: A user who is answering a question but gets stuck and requires guidance to continue.

**Pre-Condition**: The user is answering a question but is unsure how to proceed.

**Post-Condition**: The user receives a helpful hint or guiding question based on their work so far.

### Main Success Scenario
1. The user begins answering a question but encounters difficulty.
2. The user clicks the "Hint" button.
3. The system analyzes the user’s current work and generates a hint or leading question.
4. The user receives AI-generated guidance.

---

## Use Case 8: Unexpected Exit

**Actor**: A user who accidentally exits the application mid-interview but wants to continue from where they left off.

**Pre-Condition**: The user is logged in and answering a question.

**Post-Condition**: The user is able to continue their session seamlessly from where they left off.

### Main Success Scenario
1. The user is actively answering a question.
2. The user accidentally exits the WhiteboardFlow tab.
3. The user reopens WhiteboardFlow and logs back in.
4. The system prompts the user to restore their previous session.
5. The user selects "Yes" to continue.
6. The system restores the previous session, including whiteboard drawings and time remaining.

---