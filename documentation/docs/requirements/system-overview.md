---
sidebar_position: 1
---

# System Overview

## Project Abstract

Whiteboard Assistant is a web application designed to help job seekers prepare for interviews by allowing users to solve coding and estimation problems on a digital whiteboard using a tablet and stylus. It includes microphone integration for speech detection, enabling users to verbalize their thought process after answering questions. The app leverages AI to provide feedback and assistance based on the user's progress and logs their performance history for ongoing study and improvement.

## Conceptual Design

The frontend will use React.JS to create the layout for the UI as well as the whiteboard element which will make use of iink-ts. Node.js will be used for the backend to handle API requests and real-time communication by using WebSocket. FastAPI will be used for the incorporation of AI/ML components, such as handwriting recognition and natural language processing.
  
## Background
	
There are existing products such as [MockAI](https://mock-ai.com/home#home-function-href) and [Final Round AI](https://www.finalroundai.com/) that are designed to enhance interview preparation through AI-driven simulations. MockAI focuses on creating coding interviews that provide real-time feedback, allowing for performance analysis to help users improve their skills. Final Round AI offers a set of tools including real-time transcription and personalized support based on industry-specific scenarios. WhiteBoardFlow is different from these solutions because it will handle handwriting recognition, allowing the user to practice physically writing out their solutions which better simulates an interviewing environment. Whiteboard Assistant also utilizes speech-to-text technology to allow the user to practice the verbal aspects of an interview and explain their thought process.
