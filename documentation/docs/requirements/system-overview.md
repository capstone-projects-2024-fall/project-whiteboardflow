---
sidebar_position: 1
---

# System Overview

## Project Abstract
	WhiteboardFlow is a web-based application designed to help users prepare for job interviews by generating coding and Fermi approximation questions and guiding them conceptually through the solutions. The goal of WhiteboardFlow is to provide realistic practice with whiteboard problem-solving and offer feedback to improve these skills, ultimately preparing job seekers for the interview process.

	Users will interact with WhiteboardFlow on a tablet or similar device, using a stylus or touch input to answer questions and verbally explain their thought process. The application uses AI to analyze the user's approach, provide assistance when they are stuck, and evaluate the accuracy and clarity of their solutions.

	By simulating the whiteboard interview experience and offering targeted feedback, WhiteboardFlow aims to enhance users' understanding of interview expectations and improve their performance.

## Conceptual Design

    WhiteboardFlow is a web-based, platform-independent application aimed at preparing users for job interviews by simulating whiteboard problem-solving scenarios, including coding challenges and Fermi approximation questions. The application will guide users through questions, monitor their problem-solving approaches, and provide feedback to help them improve their skills.

    WhiteboardFlow is designed to help job seekers prepare for technical interviews by providing a realistic simulation of whiteboard problem-solving scenarios. The application generates coding and Fermi approximation questions, monitors user input and verbal explanation, and uses AI to analyze their responses while offering real-time feedback and suggestions for improvement.

## Hardware/Software Architecture

    - Frontend: The client-side interface will be built using HTML5 and JavaScript frameworks (React) to create a dynamic and responsive user experience. The whiteboard simulation might utilize the Canvas API or SVG for rendering drawings and input. (not sure what we’re using for this part yet)

    - Backend: A server-side architecture using Node.js for handling API requests and managing real-time communication via WebSocket. An open source, Python-based backend (Flask or Django) will integrate AI/ML components, such as handwriting recognition and natural language processing.

    - AI/ML Integration: TensorFlow or PyTorch will be employed for machine learning models, including handwriting recognition and solution analysis. NLP tools like Natural Language Toolkit (NLTK) or spaCy will be used for analyzing verbal inputs.

    - Database: Firebase will be used to store user data, question banks, and track progress securely.

    - User Authentication: The application will implement SSO for user authentication, allowing users to sign in using their Facebook or Google accounts, ensuring a secure and streamlined login process.


  
## Background
	
    For students entering the workforce, the prospects of finding a job can be daunting. Not only is the application process long and exhausting, once you are able to land an interview the pressure to perform increases. One particularly nerve-wracking part of the interview process involves solving whiteboard problems, where a candidate may be asked to work out a problem on a whiteboard in front of a panel of developers for the purpose of analyzing the candidate’s problem solving process.
	
    Current offerings for whiteboard practice leave a bit to be desired. Websites like LeetCode allow users to practice coding problems, along with community-driven solutions or forums. While these solutions are helpful, they do not focus on the specific simulation of whiteboard interviews or provide feedback on the user's verbal explanation and handwritten inputs.
 
    WhiteboardFlow will leverage open source tools such as Tensorflow for handwriting recognition and natural language processing. The use of alternative open source software to accomplish AI/ML tasks allows us to bypass the current high pricing model that chatGPT has in place. The system will build a unique interface and feedback system tailored to whiteboard interview practices.


