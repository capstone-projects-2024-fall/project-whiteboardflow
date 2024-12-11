---
sidebar_position: 1
slug: /
---

# Integration Tests

## **How Tests Are Being Conducted**

   All integration tests are being conducted using **Testim**, a robust automated testing platform. Detailed test results and cases have been documented in an attached **Excel sheet** for reference and tracking.


### Use Case 1: Mock Interview

1. **Login and Begin the Interview**
   - Mock Inputs: User login credentials.
   - Result: Confirmation of successful login and redirection to the mock interview dashboard.

2. **Performance Analytics**
   - Mock Inputs: User's responses, completion time, and accuracy.
   - Result: Dashboard showing comprehensive performance metrics such as response time, correctness, and overall rating.

3. **Feedback Retrieval**
   - Mock Inputs: User’s written and oral answers.
   - Result: AI-generated feedback.

### **Use Case 2: Digital Whiteboard**

1. **Drawing on Whiteboard**
   - Mock Inputs: Stylus or touchscreen input.
   - Result: Precise pen strokes reflecting real-time input with no lag.

2. **Undo/Redo Functionality**
   - Mock Inputs: Sequence of drawing, undo and redo commands.
   - Result: The whiteboard restores previous strokes correctly.

3. **Save and Export Whiteboard**
   - Mock Inputs: User clicks the **Submit** button after completing their work on the whiteboard.
   - Result:
     - The whiteboard content is saved in Firebase.
     - A confirmation message is logged in the browser console upon successful saving.
     - If there’s an error during the process, an error message is logged in the console with details for troubleshooting.


### **Use Case 3: AI Assistant**

1. **Hint Request Processing**
   - Mock Inputs: User's current answer progress.
   - Result: Relevant hint or leading question generated based on progress.


### **Use Case 4: Account Creation**

1. **OAuth Account Linking**
   - Mock Inputs: User credentials 
   - Result: Seamless OAuth verification and creation of a new account.


### **Use Case 5: User Practice History**

1. **History Retrieval and Display**
   - Mock Inputs: User’s practice history.
   - Result: Display of past questions, AI feedback, and speech emotion scores.

2. **Sort History**
   - Mock Inputs: Sort criteria (e.g., date, question type, or score).
   - Result: Display of Sorted results according to user input.


### **Use Case 6: Logout**

1. **Logout Functionality**
   - Mock Inputs: User clicks the **Logout** button or link.
   - Result:
     - User session is terminated securely.
     - User is redirected to the login page.


### **Use Case 7: Login Requirement for Access**

1. **Redirect to Login**
   - Mock Inputs: User who is not logged in clicks the **Get Started** button or attempts to access the app.
   - Result:
     - The user is redirected to the login page if they are not authenticated.


### **Use Case 8: Dark Mode**

1. **Enable Dark Mode**
   - Mock Inputs: User toggles the **Dark Mode** switch in the settings.
   - Result:
     - The app interface transitions to a dark theme.
     - All UI components, including text, buttons, and backgrounds, adjust to maintain readability.


### Use Case 9: Toggle to Hide Teddy 

1. **Toggle Visibility**
   - Mock Inputs: User clicks the **Toggle Teddy** button.
   - Result:
     - Teddy assistant is hidden from the interface.
     - Clicking the button again makes Teddy reappear.

<p>Here is the link to the file: <a href="https://drive.google.com/file/d/1lAIAgCy66ZCI_M9GVb6Iq1dGMLhlUrzr/view?usp=sharing" target="_blank" rel="noopener noreferrer">View CSV File</a></p>
