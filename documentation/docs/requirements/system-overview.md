---
sidebar_position: 1
---

# System Overview

## Project Abstract
	The goal of WhiteBoardFlow is to assist job seekers in interview preparation by allowing users to answer coding and approximation questions on a digital whiteboard. WhiteBoardFlow will be a web application intended for use with a tablet and stylus with microphone and speech detection integration as well to allow the user to verbally explain their thought process and answer questions. WhiteBoardFlow will additionally make use of artificial intelligence to review and give feedback on the user's work, as well as to give help according to the work the student has done so far. The application will additionally log the user's history and results over time allowing for the user to study prior questions. 
 
 <!-- this is commented out
 
 . With this application, users will have an interactive learning experience wherein they describe problems using a stylus or touch input on tablets and state their reasons verbally. This system uses AI technologies that have been applied to review the user's problem-solving approach, provide real-time guidance for more complex questions, and assess the precision and clarity of the user's answers. This comprehensive feedback mechanism not only refines key skills necessary for successful job interviews but also enhances a user's ability to perform under real-world conditions, preparing job seekers technically while coaching them to articulate their thoughts clearly and effectively. -->

## Conceptual Design

	The frontend will use React.JS to create the layout for the UI as well as the whiteboard element which will make use of the Canvas API or SVG. Node.js will be used for the backend to handle API requests and real-time communication by using WebSocket. Flask or Django will be used for the incorporation of AI/ML components, such as handwriting recognition and natural language processing.
  
## Background
	
	There are existing products such as [MockAI](https://mock-ai.com/home#home-function-href) and [Final Round AI](https://www.finalroundai.com/) that are designed to enhance interview preparation through AI-driven simulations. MockAI focuses on creating coding interviews that provide real-time feedback, allowing for performance analysis to help users improve their skills. Final Round AI offers a set of tools including real-time transcription and personalized support based on industry-specific scenarios. WhiteBoardFlow is different from these solutions because it introduces features like handwriting recognition, allowing the user to practice physically writting out their solutions which better simulates an interviewing environment. WhiteBoardFlow additionally utilizes speech-to-text technology to allow the user to practice the verbal aspects of an interview and explain their thought process.

