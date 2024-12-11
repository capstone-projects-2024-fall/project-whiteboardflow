---
sidebar_position: 2
---

# System Block Diagram

![image](https://github.com/user-attachments/assets/30911914-885c-448b-b5ed-771c3eaf601f)


#### Figure 1. High-level design of the Whiteboard Assistant application.
    Figure 1 provides an overview of the Whiteboard Assistant application architecture. 
    Users interact with the system via mobile devices or Windows tablets, using a stylus or touch input to simulate a whiteboard experience. 
    The front end, built with React (HTML5 and JavaScript), handles the user interface, enabling whiteboard drawing with the IINK component.
    The backend, developed with FastAPI, manages API requests and real-time communication. 
    AI/ML components, powered by openAI, process handwriting recognition, solution analysis, and natural language processing. 
    Firebase securely stores user data, progress, and question banks.
    Firebase also facilitates user authentication and through Single Sign-On (SSO) with Google. 
    AI hints and assistance is provided to the user.
    Feedback and guidance are displayed on the user's device after completing the written and voice practice, enhancing the learning experience.



