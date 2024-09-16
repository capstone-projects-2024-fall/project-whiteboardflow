---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

#### WhiteboardFlow will require the user to register through a Facebook/Google account.
- Account preferences related to a profile may be changed/updated such as the display name, password, or the Google account connected to the profile.
- User profiles will be stored securely in a database using Firebase.
- A forgot password option will allow users to change their password.
#### After signing-in, the app will navigate to the home page.
- The home page will contain a button to start the interview.
- An icon in the upper right corner will be available, which drops down to give access to account preferences and a logout button.
- A table in the upper left corner will show the user’s previous question history.
#### In the account preferences option, the user will be able to change various account options.
- The user may change their password, display name, or the Google account which is connected to their profile.
- The user may delete their account.
#### In the user’s previous question history, they will be able to see the previous questions they answered. 
- The question is shown, along with being able to expand the tab to show AI feedback received, including written feedback and a speech emotion score.
#### After the user initiates the written test, the question will appear on the top of the whiteboard screen.
- A question time limit will appear immediately on the top right, with its duration depending on the question’s complexity.
- The whiteboard will appear for the user to demonstrate their written solution and thought process.
- The option for a new question will be available for the user.
#### During the oral test, the user must explain their thought process verbally for the AI to determine their level of confidence.
- Microphone input must be detected in real-time to check for any hesitation/uncertainty.
- Speaker output must be detected to determine that the user can hear the voice prompts.
#### If the user is stuck on a problem, they may be given a hint from the AI to point them in the right direction.
- Bigger hints will be given if it is detected that the user is highly uncertain about their answer—for example, if the user is immediately stuck on the problem, or if the user continues to have difficulty with the same problem.
#### The whiteboard will contain a minimal amount of features.
- Pencil tool.
- Eraser and clear screen.
- Undo/redo for draw strokes.


## Nonfunctional Requirements

#### WhiteboardFlow will present the user with an intuitive interface.
- There will be a prominent “performance” table
    - Important historical data like written or oral test scores
    - Number of attempts
- The system will display reassuring AI-generated messages and prompts.
    - In the written test, the user will receive alerts with hints, code examples, and relevant feedback
    - In the oral test, the user will receive appropriate prompts based on the analysis of their speech emotion recognition and correctness of their response and give relevant feedback.
    - Each message will assure that the user is moving in the right direction.
- “Don’t panic!” will be incorporated somewhere in the UI.
#### To simulate an interview scenario, the system will begin the written test before the oral test.
- A score of 65% is considered passing for each test.
- Feedback will be tailored for each test based on content and performance.
#### The app utilizes speech emotion recognition to analyze the mood or emotional state of the speaker.
- The speaker’s tone is analyzed using pitch, intensity, rate and timbre.
- The confidence of the speaker is also analyzed based on duration of speech and pauses, speech patterns, word choice, and content analysis.
#### Use of Firebase for the backend will allow the app to be scalable and easier to work with, as well as ensuring an acceptable level of availability and performance.
- User login information will be securely stored in Firebase and linked with either FaceBook or Google’s authentication system.
- We will also store user historical data on Firebase.
