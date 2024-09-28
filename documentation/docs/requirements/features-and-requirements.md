---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

#### Interview questions
- The application will have a database of interview questions it will ask the user.
- The application will contain Fermi Approximation questions.
- The application will contain coding interview questions.

#### Question process
- The application's questions flow will be:
  - Select a question and prompt the user to answer on the digital whiteboard.
  - After the user is finished, the application will prompt the user to explain their thought process orally.
  - After the user is done explaining, the AI assistant will analyze the work and give feedback.

#### Digital whiteboard
- The application will allow users to write out answers to the problems
- The Whiteboard will include the following features:
  - Pencil tool.
  - Eraser tool, clear screen.
  - Undo/redo of draw strokes.
 
#### Speech to text
- The application will transcribe the user's speech for use in problem-solving analysis.

#### AI assistant
- The application will feature an AI assistant that will interface with the openAI API to:
   - Analyze the user's handwriting and code.
   - Analyze the user's solutions for correctness and logic.
   - Analyze the user's thought process and approach to solving questions.
   - Give feedback on the user's weaknesses.
   - Give hints/feedback during questions when requested by the user based on work done already.

<!-- The user may request hints from the assistant during mock interviews when
  they are stuck on a problem.
- The assistant will be able to detect a user's hesitation during a problem,
  in which case, it will intervene by providing hints.
- Feedback will be generated from the assistant after the interview is
  complete, detailing to the user:
  - Number of hesitations/pauses.
  - The amount of time taken for the question compared to the set time limit.
  - Feedback on the correctness of code solutions, including any errors, along
    with suggested improvements.
  - How the user’s performance compares to their past mock interviews, helping
    them to track their progress over time.-->

#### Account sign-up and login
- The user will be required to register through a Facebook/Google account.
- User profiles will be stored securely in a database using Firebase.
- After signing in, the app will navigate to the home page.


<!--#### The application must include a digital whiteboard.
- The whiteboard will allow users to describe their thought process to the AI
  assistant during a mock interview.
- For simplicity, a minimal number of features will be included in the digital
  whiteboard:
  - Pencil tool.
  - Eraser tool, clear screen.
  - Undo/redo of draw strokes.-->


#### Home page
- Application will contain a home page featuring:
  - User greeting 
  - A button to start a mock interview.
  - A hamburger menu in the upper left corner containing:
    - User preferences.
    - Log out.
    - Previous questions and results.

#### Account preferences 
- The application will feature a preferences page which allows the user to:
  - Change the Facebook/Google account which is connected to their profile.
  - Delete their account.
  - Change language settings

#### Account deletion.
- The application will allow users to delete their account which will:
  - Be secure by prompting re-authentication through their OAuth provider (Facebook or Google).
  - Send a confirmation email.
  - Delete user's records from the Firebase database.

#### Question history.
- The application will allow the user to:
  - See all previous questions they have answered.
  - See all feedback received from the AI assistant.

<!--#### After the user initiates a written test, a question will appear on the top of the whiteboard screen.
- A question time limit will appear immediately on the top right, with its
  duration depending on the question’s complexity.
- The whiteboard will appear for the user to demonstrate their written solution
  and thought process.
- The user will be able to access a new question.

#### During the oral test, the user must explain their thought process verbally to the AI to determine their level of confidence.
- Microphone input must be detected in real-time to check for any
  hesitation/uncertainty.
- Speaker output must be detected to determine that the user can hear the voice
  prompts.

#### User can request clarity from a hint given by the AI assistant
- AI assistant will be able to rephrase assistance to give users multiple perspectives
- AI assistance will be able to generate multiple leading questions to guide users through prompts.

#### To simulate an interview scenario, the system will begin the written test before the oral test.
- Feedback will be tailored for each test based on content and performance.

#### WhiteboardFlow will present the user with an intuitive interface.
- There will be a prominent “performance” table
    - Important historical data like written or oral test scores.
    - Number of attempts.
- The system will display reassuring AI-generated messages and prompts.
    - After the written test, the user will receive alerts with hints, code
      examples, and relevant feedback.
    - After completing the oral test, the user will receive tailored prompts based on an analysis of their speech emotions, the accuracy of their responses, and will be provided with relevant feedback.
    - Each message will assure that the user is moving in the right direction.
- “Don’t panic!” will be incorporated somewhere in the UI. -->

## Nonfunctional Requirements

<!--#### The app utilizes speech emotion recognition to analyze the mood or emotional state of the speaker.
- The speaker’s tone is analyzed using pitch, intensity, rate and timbre.
- The confidence of the speaker is also analyzed based on duration of speech and pauses, speech patterns, word choice, and content analysis.
#### Use of Firebase for the backend will allow the app to be scalable and easier to work with, as well as ensuring an acceptable level of availability and performance.
- User login information will be securely stored in Firebase and linked with either Facebook or Google’s authentication system.
- We will also store user historical data on Firebase.-->

#### AI assistant flexibility
- AI assistant will be able to analyze the user's work and give specific feedback to what they've done
- AI assistant will be able to reword hints or feedback if user requests

#### Accessibility
- Written portions of the application will be able to be completed with:
  - Stylus and touch device
  - Finger and touch device
  - Mouse
  - Keyboard
- Oral portions of the application will be able to be completed with:
  - Microphone
  - Keyboard

#### Interface
- The application will be designed with the goal of a simple and intuitive user interface using modern design principles.
- The application will have a dark and light mode

#### Security
- The application will make use of secure data solutions such as Firebase and OAuth for security.

#### Resiliency
- The application will prompt user to confirm they want to navigate away from page if work is in progress.
- The application will be able to handle an unexpected exit by saving the user's progress within a question.
