---
sidebar_position: 1
---

# System Overview

## Project Abstract
	This innovative web-based platform will assist job seekers in interview preparation through dynamic means of practicing coding problems. With this application, users will have an interactive learning experience wherein they describe problems using a stylus or touch input on tablets and state their reasons verbally. This system uses AI technologies that have been applied to review the user's problem-solving approach, provide real-time guidance for more complex questions, and assess the precision and clarity of the user's answers. This comprehensive feedback mechanism not only refines key skills necessary for successful job interviews but also enhances a user's ability to perform under real-world conditions, preparing job seekers technically while coaching them to articulate their thoughts clearly and effectively.

## Conceptual Design

	The interactions of this application are front-ended in HTML5 with JavaScript frameworks like React that will provide a dynamic and responsive user interface; for instance, this could be implemented to render drawings and input using the implementation of the Canvas API or SVG. Node.js will be used for the architecture of the backend, allowing the handling of API requests and real-time communication by using WebSocket, while Python-based frameworks like Flask or Django will be used for the incorporation of AI/ML components, such as handwriting recognition and natural language processing. The integration of AI and ML will include the use of TensorFlow or PyTorch for machine learning models, while the use of NLTK or spaCy will provide support for NLP analysis in verbal inputs. The application will store user information securely, question banks, and user progress using Firebase, while authentication is done via SSO, allowing users to access the system using their Facebook or Google accounts.
  
## Background
	
	There are existing products such as [MockAI](https://mock-ai.com/home#home-function-href) and [Final Round AI](https://www.finalroundai.com/) that have similar functionalities. These platforms are designed to enhance interview preparation through AI-driven simulations. MockAI focuses on creating coding interviews that provide real-time feedback, allowing for performance analysis to help users improve their skills. Similarly, Final Round AI offers a set of tools including real-time transcription and personalized support based on industry-specific scenarios. Whiteboard Assist also aims to utilize advanced AI technologies to prepare users for interviews. However, this software introduces unique features like handwriting recognition, which aims to simulate a more realistic in some interview environments, particularly for roles requiring technical demonstrations or extensive problem-solving discussions, thus preparing users effectively for both digital and in-person interactions.
	
 	[Google Keep](https://keep.google.com/u/0/) and [Microsoft OneNote](https://www.onenote.com/notebooks?auth=2&nf=1) both work effectively in transcribing handwriting to text. By combining such functionality with interview practice, Whiteboard Assist provides users with more options to mock an interview based on their specific situations, helping them achieve career success.

