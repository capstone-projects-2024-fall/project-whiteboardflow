---
sidebar_position: 1
---

# Component and Technology Overview

This document provides an overview of the key components in the app and the technologies used, including Firebase for backend services, Vercel for deployment, Material-UI for styling, iink-ts for whiteboard functionality, and WebSocket for real-time communication.

## Main Application Framework

**Technology**: React with React Router

The app is built using **React** for the front end, allowing for a component-based architecture and interactive user interfaces. **React Router** manages routing, enabling a seamless single-page application (SPA) experience.

### Key Features:
- **Component-Based Design**: Modular, reusable code that is easy to maintain and extend.
- **State Management**: Uses React Hooks like `useState`, `useEffect`, and context providers for efficient state management.

---

## Routing and Navigation

**Technology**: React Router

Routing is defined in `Main.js` and managed by **React Router**, enabling navigation between sections such as `HomePage`, `OralTest`, `Whiteboard`, and `Settings`.

### Key Features:
- **Dynamic Routing**: Allows for flexible navigation between pages.
- **Conditional Routes**: Routes are controlled based on user authentication status to protect certain pages.

---

## Database

**Technology**: Firebase Authentication and Firestore

**Firebase** provides authentication and a NoSQL database (Firestore) for real-time data management.

- **Authentication**: Firebase Authentication handles user sessions and login/logout functionality, especially with Google Sign-In.
- **Database**: Firestore enables storing and syncing user data in real time, allowing components like `BackEndTest` to fetch and display data dynamically.

---


## Hosting and Deployment

**Technology**: Vercel and Render

- The **frontend** is hosted on **Vercel**, providing optimized static and dynamic content delivery, automatic SSL, and continuous deployment via GitHub.
- The **backend** is hosted on **Render**, ensuring reliable and scalable server-side operations with continuous deployment from Git repositories.


### Key Features:
- **CI/CD**: Automatically deploys changes from GitHub upon each push, ensuring the latest version is live.
- **Performance Optimization**: Provides global CDN and analytics for monitoring traffic and optimizing load times.

---

### Key Features:
- **Bidirectional Communication**: Allows instant updates between clients and server.
- **Enhanced Collaboration**: Supports live data updates on the whiteboard, enabling real-time collaboration among users.

---

## Whiteboard Functionality

**Technology**: iink-ts (MyScript)

The **iink-ts** library is used for digital whiteboard functionality, providing a powerful tool for freehand writing, drawing, and interaction.

### Key Features:
- **Handwriting Recognition**: Converts handwritten input into digital text, enhancing user experience on whiteboard components.
- **Drawing and Annotation**: Allows users to sketch, annotate, and interact with content on the whiteboard seamlessly.

---

## UI and Styling

**Technology**: Material-UI (MUI)

**Material-UI (MUI)** provides a consistent and accessible design system with a range of pre-styled React components.

### Key Features:
- **Theme Customization**: Supports light and dark modes, configurable through `AvatarContext` and `Layout`.
- **Component Library**: Includes components like buttons, icons, and dialogs, accelerating UI development.
- **Custom Styling**: Uses additional CSS (e.g., `Footer.css`, `AvatarContext.css`) for app-specific visual adjustments.

---

## Interactive Avatars and Animations

**Technology**: Framer Motion, Custom Avatar Context

**Framer Motion** and a custom `AvatarContext` manage animations and interactive avatars, creating an engaging user experience.

### Key Features:
- **Animations**: Components like `RetroAvatar` and `Character` use animations to enhance visual appeal.
- **Avatar Context**: Manages avatar visibility and behavior across different parts of the app, allowing for consistent interactivity.

---

## Developer Tooling and Workflow

- **GitHub**: Version control is managed through GitHub, facilitating collaboration and version tracking.
- **JIRA**: Used for project management and task tracking, enabling efficient workflow and project organization.
- **Linting and Formatting**: ESLint and Prettier enforce consistent code formatting and quality.
- **Babel and Webpack**: Ensure compatibility with modern JavaScript features and optimize assets for Vercel deployment.

---

### How Technologies Support App Requirements

This tech stack ensures a feature-rich, scalable, and interactive application that integrates collaboration, authentication, and deployment seamlessly.

- **React + Firebase + Vercel**: A powerful setup for real-time interactivity, user management, and rapid deployment.
- **Material-UI + Framer Motion**: Delivers a polished UI with animations and customizable themes.
- **GitHub + JIRA + Vercel**: Effective project management and deployment flow, supporting version control, issue tracking, and CI/CD for automated production updates.

This documentation provides an overview of how each component and technology fits into the application to deliver an engaging, efficient, and scalable user experience.
