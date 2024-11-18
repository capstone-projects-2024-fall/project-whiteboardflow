[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15804769)
<div align="center">

# WhiteboardFlow(WF)
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2024-fall.github.io/project-whiteboardflow/)


</div>


## Keywords

Section 001, Coding exercises, speech-to-text/dictation software, handwriting detection, AI

## Project Abstract

This document proposes a tool to help professionals and students entering the development workforce practice whiteboard-style interview questions.product will generate interview-style coding questions and prompt the user to reason out their solution, either through text or voice dictation, and generate feedback on the thought process to guide the user through the correct thought process to solve the problem. The user can then attempt the problem with actual code or using handwriting dictation to determine correctness, optimization, and efficiency and then provide the feedback.

## Requirements

1. Have [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install).
2. Have API keys from [OpenAI](https://openai.com/), [Firebase](https://firebase.google.com/), and [iink-ts](https://github.com/MyScript/iinkTS).
3. Have a browser that supports speech recognition from mdn web docs, to see if your browser supports speech recognition, you can check [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility).

## Installation
### Backend
Our backend is a Python Flask server that uses the OpenAI API to generate interview questions and analyze user responses. To install the backend, follow these steps:
#### With a virtual environment
Navigate to the `backend` directory
```bash
cd whiteboardflow-backend
```
Create a virtual environment
```bash
python3 -m venv [your-virtual-environment-name]
```
Activate the virtual environment(assume your virtual environment name is `venv`)
```bash
source venv/bin/activate
```
Install the required packages
```bash
pip install -r requirements.txt
```
Run the server
```bash
python server.py
```
#### Without a virtual environment
You may skip the virtual environment steps if you do not want to use a virtual environment.
### Frontend
Our frontend is a React application that uses the iink-ts library to capture handwriting input. To install the frontend, follow these steps:
Navigate to the `frontend` directory
```bash
cd whiteboardflow-frontend
```
Install the required packages
```bash
npm install
```
Run the server
```bash
npm start
```
## Usage
To use the application, navigate to `http://localhost:3000` in your browser. You will be prompted to sign in with Google. Once you sign in, you will be able to generate interview questions and attempt to solve them using handwriting input or text input. The application will analyze your response and provide feedback on your solution.

## High Level Requirement

This app will:

Generate interview questions

Interpret user written input or spoken input

Give feedback to user prior to attempting the problem

Interpret user’s solution to problem and analyze correctness and optimization

Detail specifically where user can improve

## Conceptual Design

For ease of access and simplicity of code, I believe this would best be done as a web app with optimization for tablets where users can actually write out their code with a stylus or their finger. This would ideally make the product available across both mobile and desktop platforms and help with accessibility if the user is unable to use any specific type of device. I would propose JS/React for the front end with a Python backend for processing. 

## Background

This project will ideally make use of various open source softwares in order to meet project requirements. For speech to text dictation, OpenAI’s open source Whisper could be leveraged, as well as Open AI for the language processing. This product hopes to improve on existing technologies used to test coding aptitude for interviews such as LeetCode or Codewars which simply use unit testing to determine if a solution is correct or incorrect, rather than testing the thought process of the user which is a major part of interview whiteboard questions. 

## Required Resources

This project would require background knowledge of large language models and research into the most efficient uses for this specific problem. Additional research into how best to implement handwriting detection and pseudocode detection would additionally be needed. Additionally, members of the team would need access to a tablet with a stylus for testing purposes. 

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
            <sub><b>Vince Lubkan</b></sub>
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
