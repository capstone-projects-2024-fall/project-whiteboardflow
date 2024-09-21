---
sidebar_position: 1
---

# System Overview

## Project Abstract
	This innovative web-based platform will assist job seekers in interview preparation through dynamic means of practicing coding problems. With this application, users will have an interactive learning experience wherein they describe problems using a stylus or touch input on tablets and state their reasons verbally. This system uses AI technologies that have been applied to review the user's problem-solving approach, provide real-time guidance for more complex questions, and assess the precision and clarity of the user's answers. This comprehensive feedback mechanism not only refines key skills necessary for successful job interviews but also enhances a user's ability to perform under real-world conditions, preparing job seekers technically while coaching them to articulate their thoughts clearly and effectively.

## Conceptual Design

	The interactions of this application are front-ended in HTML5 with JavaScript frameworks like React that will provide a dynamic and responsive user interface; for instance, this could be implemented to render drawings and input using the implementation of the Canvas API or SVG. Node.js will be used for the architecture of the backend, allowing the handling of API requests and real-time communication by using WebSocket, while Python-based frameworks like Flask or Django will be used for the incorporation of AI/ML components, such as handwriting recognition and natural language processing. The integration of AI and ML will include the use of TensorFlow or PyTorch for machine learning models, while the use of NLTK or spaCy will provide support for NLP analysis in verbal inputs. The application will store user information securely, question banks, and user progress using Firebase, while authentication is done via SSO, allowing users to access the system using their Facebook or Google accounts.
  
## Background
	
	WhiteboardFlow is designed to help job seekers prepare for technical interviews by providing a realistic simulation of whiteboard problem-solving scenarios. The application generates coding and Fermi approximation questions, monitors user input and verbal explanation, and uses AI to analyze their responses while offering real-time feedback and suggestions for improvement.	
 
    Current offerings for whiteboard practice leave a bit to be desired. Websites like LeetCode allow users to practice coding problems, along with community-driven solutions or forums. While these solutions are helpful, they do not focus on the specific simulation of whiteboard interviews or provide feedback on the user's verbal explanation and handwritten inputs.
 
    WhiteboardFlow will leverage open source tools such as Tensorflow for handwriting recognition and natural language processing. The use of alternative open source software to accomplish AI/ML tasks allows us to bypass the current high pricing model that chatGPT has in place. The system will build a unique interface and feedback system tailored to whiteboard interview practices.


