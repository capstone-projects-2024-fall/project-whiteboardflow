---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1: Mock interview
User wants to practice their problem solving skills before a job interview.
1. User opens the WhiteboardFlow application.
2. User logs into their WhiteboardFlow account.
3. After logging in, the user generates a practice interview question.
4. User is given a certain amount of time to complete question.
5. User is graded and given feedback on their answer.

## Use case 2: Digital whiteboard
User wants to answer question by drawing out answer on whiteboard.
1. User opens the WhiteboardFlow application.
2. User logs into their account.
3. User chooses to generate a question.
4. User is prompted to begin answering question.
5. User is presented with a digital whiteboard with ability to draw and erase with finger or stylus.

## Use case 3: AI assistant
User needs help with a practice problem..
1. User opens the WhiteboardFlow application
2. User logs into their account.
3. User chooses to generate a question.
4. User is unsure of how to start answering the question.
5. WhiteboardFlow AI assitant recognizes the user's hesitation.
6. WhiteboardFlow generates a hint or leading question to guide user.

## Use case 4: Account creation
User wants to sign up for an account.
1. User opens WhiteboardFlow application.
2. User selects "Create Account."
3. User is given option to link an existingn account or use an email address.
4. User chooses option to create account with email address. 
5. User chooses a user name and password and connects an account to email.
6. User verifies email and account is created.

## Use Case 5: Account deletion
A user wants to delete their account.
1. User navigates to the preferences drop-down menu.
2. User selects ‘delete account’.
3. User must confirm that they want to delete their account by typing in their password.
4. System deletes all of the user's profile and information from the Firebase database.

<!-- ## Use Case 3-unexpected exit
A user accidentally exits the app mid-interview but is able to restore their session.
1. User is currently answering a question.
2. User accidentally exits out of the WhiteboardFlow tab.
3. User logs back in to the homepage.
4. A prompt appears, asking if the user wants to continue their session.
5. User selects ‘Yes’.
6. User continues their interview question, with their previous whiteboard drawings and time remaining saved from the previous session. -->

## Use Case 6: User practice history
A user wants to review their performance history.
1. User logs into their WhiteboardFlow account.
2. On the homepage, the user selects the "Previous Questions" table in the upper left corner.
3. User clicks on a question from the history list to expand it.
4. The system displays the question, the AI-generated feedback, and the user’s speech emotion score.
5. User reviews the feedback and closes the expanded view.

## Use Case 7: Request a different question
A user requests a more challenging question.
1. User logs into WhiteboardFlow and starts an interview.
2. After completing the first question, the user selects the “New Question” option
3. User opts for a “High Difficulty” question from the dropdown menu.
4. The system generates a more complex problem, with a longer time limit.
5. User begins solving the problem on the whiteboard, with Ai monitoring their progress.
6. User finishes some questions, clicks on the exit button, and logs out from the application.

## Use Case 8: Further explaination on hint
A user requests clarification on a hint provided by the AI.
1. User is solving a question and requests a hint.
2. AI provides an initial hint, but the user is still unsure about how to proceed.
3. User clicks the “More Help” option
4. System provides additional, more detailed guidance, such as a code snippet or further explanation.
5. User applies the hint and continues solving the problem.