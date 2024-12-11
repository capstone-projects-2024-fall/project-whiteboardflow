[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15804769)
<div align="center">

# Whiteboard Assistant
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2024-fall.github.io/project-whiteboardflow/)
</div>

<p align="center" justifyContent="space-between" display="flex">
  <img src="https://github.com/user-attachments/assets/36a4cbaa-2f41-4d56-ae7f-29cc0d8e0515" alt="Image 1" width="45%" style={{ marginRight: "30px"}}/>
  <img src="https://github.com/user-attachments/assets/a2bda6fb-1403-4cb8-8d8c-4878f4f9a65b" alt="Image 2" width="45%" />
</p>

## Keywords

Section 001, coding exercises, speech-to-text/dictation software, handwriting
detection, AI

## Project Abstract

This document proposes a tool to help professionals and students entering the
development workforce practice whiteboard-style interview questions. This
product will generate interview-style coding questions and prompt the user to
reason out their solution through text and voice dictation. Then, it will
generate feedback from the user's answer and thought process to provide them
with potential areas of improvement and additional problem-solving techniques.

## High Level Requirement

This app will:
- Provide practice whiteboard interview questions.
- Interpret the user's written input and spoken input.
- Give feedback to the user after attempting a problem.
- Interpret the user’s solution to the problem and analyze it for correctness
  and optimization.
- Detail specifically where the user can improve.

## Conceptual Design

For ease of access and simplicity of code, I believe this would best be done as
a web app with optimization for tablets where users can actually write out
their code with a stylus or their finger. This would ideally make the product
available across both mobile and desktop platforms and help with accessibility
if the user is unable to use any specific type of device. I would propose
JS/React for the frontend with a Python backend for processing.

## Background

This project will ideally make use of various open source software in order to
meet project requirements. For speech to text dictation, Open AI could be
leveraged, as well as for the language processing. This product hopes to
improve on existing technologies used to test coding aptitude for interviews
such as LeetCode or Codewars which simply use unit testing to determine if a
solution is correct or incorrect, rather than testing the thought process of
the user which is a major part of interview whiteboard questions.

## Required Resources

This project would require background knowledge of large language models and
research into the most efficient uses for this specific problem. Additional
research into how best to implement handwriting detection and pseudocode
detection would additionally be needed. Additionally, members of the team would
need access to a tablet with a stylus for testing purposes.

## Web App

To start using Whiteboard Assistant, visit the web app here: [Whiteboard
Assistant](https://project-whiteboardflow-eowa.vercel.app/)

**Notes:** 
- Currently, the app is **not supported on Firefox**. Please use a supported
  browser such as Chrome, Edge, or Safari.
- For the best experience, use a laptop/tablet device with a stylus pen.

## How to Build

### Requirements

1. Have [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install).
2. Have API keys from [OpenAI](https://openai.com/), [Firebase](https://firebase.google.com/), and [iink-ts](https://github.com/MyScript/iinkTS).
3. Have a browser that supports speech recognition from mdn web docs, to see if your browser supports speech recognition, you can check [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility).
4. Clone this repository:

```bash
git clone https://github.com/capstone-projects-2024-fall/project-whiteboardflow
```

#### API Keys
Create a `.env` file in the `whiteboardflow-frontend` directory and add your
API keys here. The `.env` file should look like this:

```bash
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

Create another `.env` file in the `whiteboardflow-backend` directory. Then, add
your OpenAI API key in the file:

```bash
OPENAI_API_KEY=your-openai-api-key
```

Create a file named `server-configuration.json` in the
`whiteboardflow-frontend\public` directory. Then, add your
MyScript API key in the file:

```bash
{
    "applicationKey": "your-myscript-application-key",
    "hmacKey": "your-myscript-hmac-key"
}
```

### Run Backend

Navigate to the `backend` directory:
```bash
cd whiteboardflow-backend
```

**Optional:** Create and start a virtual environment:
```bash
python3 -m venv [your-virtual-environment-name]
source venv/bin/activate
```

Install the required packages:
```bash
pip install -r requirements.txt
```

Run the server:
```bash
python server.py
```

### Run Frontend

Navigate to the `frontend` directory:
```bash
cd whiteboardflow-frontend
```

Install the required packages:
```bash
npm install
```

Run the server:
```bash
npm start
```

## Usage
To use the application, navigate to `http://localhost:3000` in your browser.
You will be prompted to sign in with Google. Once you sign in, you will be able
to practice interview questions and attempt to solve them through handwritten
input. The application will then analyze your response and provide feedback on
your solution.

## Features

### Handwriting Analysis
- Ability to analyze handwritten input to understand and interpret problem-solving strategies and logic.

### Microphone Integration for Speech Detection
- Incorporates speech recognition to allow verbal commands and explanations, enhancing user interaction and input versatility.

### AI-Powered Feedback and Performance Tracking
- Provides real-time, intelligent feedback on the user's problem-solving techniques and solutions.
- Features a comprehensive analytics page that tracks and displays progress in problem-solving efficiency and accuracy.
- Delivers personalized insights into strengths and developmental areas, aiding in targeted skill improvement and ensuring a tailored learning experience.

### Expanded Problem Library
- Extensive collection of coding and estimation problems ranging across various difficulty levels and programming languages.

### Customizable Interface
- Includes a Dark Mode setting to reduce eye strain and improve visibility during extended use.
  
### Security Enhancements
- Integration with Google account for secure and streamlined user authentication.
- Uses Firebase for secure backend services, including data storage and handling, ensuring that all user information is protected with the latest security standards.

## Known Bugs

### Apple Pencil Compatibility
- Users may experience intermittent loss of pen strokes when using the Apple Pencil.

### Session Timeouts
- On some devices, users might encounter "session timed out" errors occasionally.

### Whiteboard Interface Adjustment
- Occasionally, resizing the problem area on the whiteboard interface by dragging (not using buttons) may fail to adjust properly.

### Tool Button Hover State
- After using certain tools on the whiteboard (e.g., eraser, undo), the hover state on buttons may not disappear as expected.

### Initial Problem List Loading
- Some users may experience longer than usual loading times when accessing the problem list for the first time.

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/DeanRoos">
            <img src="https://avatars.githubusercontent.com/u/143642744?v=4" width="100;" alt="DeanRoos"/>
            <br />
            <sub><b>Dean Roos</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bstephe9">
            <img src="https://avatars.githubusercontent.com/u/123014920?v=4" width="100;" alt="bstephe9"/>
            <br />
            <sub><b>Ben Stephenson</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/VinceLukban">
            <img src="https://avatars.githubusercontent.com/u/112022481?v=4" width="100;" alt="VinceLubkan"/>
            <br />
            <sub><b>Vince Lukban</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Edwardd02">
            <img src="https://avatars.githubusercontent.com/u/122767943?v=4" width="100;" alt="Edwardd02"/>
            <br />
            <sub><b>Renxuan Yao</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/dhruvilpatel999">
            <img src="https://avatars.githubusercontent.com/u/112565839?v=4" width="100;" alt="dhruvilpatel999"/>
            <br />
            <sub><b>Dhruvil Patel</b></sub>
        </a>
    </td></tr>
</table>

[//]: # ( readme: collaborators -end )
