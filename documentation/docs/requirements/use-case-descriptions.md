---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1: Mock interview
A user wants to practice a problem using WhiteBoardFlow.
1. User opens the WhiteboardFlow application.
2. User logs into their WhiteboardFlow account.
3. After logging in, the user clicks the button to begin an interview question.
4. User writes out their answer on digital whiteboard.
5. User is prompted to orally explain their thought process.
6. User recieves feedback on their answer and thought processes.

## Use case 2: Digital whiteboard
A user wants to answer question by drawing out answer on whiteboard.
1. User starts an exercise.
2. User is presented with a digital whiteboard to answer question.
3. User is able to write their problem out with a stylus or their finger.
4. User is able to erase or delete what they've written.
5. User is able to undo/redo individual pen strokes.

## Use case 3: AI assistant
A user needs help with a practice problem.
1. User chooses to  answer a question.
2. User is unsure of how to start answering the question.
3. User clicks button to request help.
4. WhiteboardFlow generates a hint or leading question to guide user based on user's current project.

## Use case 4: Account creation
A user wants to sign up for an account.
1. User opens WhiteboardFlow application.
2. User selects "Create Account."
3. User links an existing Google/Facebook account to their new account through
   OAuth.
4. User verifies account is created.

## Use Case 5: Account deletion
A user wants to delete their account.
1. User navigates to the preferences drop-down menu.
2. User selects ‘delete account’.
3. User must confirm that they want to delete their account by re-signing in
   through OAuth.
4. System deletes all of the user's profile and information from the Firebase database.


## Use Case 6: User practice history
A user wants to review their performance history.
1. User logs into their WhiteboardFlow account.
2. On the homepage, the user selects the "Previous Questions" table in the upper left corner hamburger menu.
3. User clicks on a question from the history list to expand it.
4. The system displays the question, the AI-generated feedback, and the user’s speech emotion score.
5. User reviews the feedback and closes the expanded view.

<!--## Use Case 7: Request a different question
A user requests a more challenging question.
1. User logs into WhiteboardFlow and starts an interview.
2. After completing the first question, the user selects the “New Question” option
3. User opts for a “High Difficulty” question from the dropdown menu.
4. The system generates a more complex problem, with a longer time limit.
5. User begins solving the problem on the whiteboard, with Ai monitoring their progress.
6. User finishes some questions, clicks on the exit button, and logs out from the application. -->

## Use Case 7: Further explaination on hint
A user requests clarification on a hint provided by the AI.
1. User is solving a question and requests a hint.
2. AI provides an initial hint, but the user is still unsure about how to proceed.
3. User clicks the “More Help” option
4. System provides additional, more detailed guidance, such as a code snippet or further explanation.
5. User applies the hint and continues solving the problem.

## Use Case 8: Unexpected exit
A user accidentally exits the app mid-interview but is able to restore their session.
1. User is currently answering a question.
2. User accidentally exits out of the WhiteboardFlow tab.
3. User logs back in to the homepage.
4. A prompt appears, asking if the user wants to continue their session.
5. User selects ‘Yes’.
6. User continues their interview question, with their previous whiteboard drawings and time remaining saved from the previous session. -->
