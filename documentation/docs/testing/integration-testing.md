---
sidebar_position: 1
slug: /
---

# Integration Tests

### Use Case 1: Mock Interview

1. **Login and Begin the Interview**
   - Mock Inputs: User login credentials.
   - Result: Confirmation of successful login and redirection to the mock interview dashboard.

2. **Performance Analytics**
   - **Mock Inputs**: User's responses, completion time, and accuracy.
   - **Result**: Dashboard showing comprehensive performance metrics such as response time, correctness, and overall rating.

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


### **Use Case 5: Account Deletion**

1. **OAuth Confirmation and Deletion**

   - Mock Inputs: Confirmation of account deletion.

   - Result: Account and associated data are permanently deleted.


### **Use Case 6: User Practice History**

1. **History Retrieval and Display**

   - Mock Inputs: User’s practice history.

   - Result: Display of past questions, AI feedback, and speech emotion scores.


### **Use Case 7: Hints**

1. **Hint Generation Based on Progress**

   - Mock Inputs: Current answer.

   - Result: AI assistant provides relevant hint or leading question.


### **Use Case 8: Unexpected Exit**

1. **Session Restoration**

   - Mock Inputs: User data saved before exit.

   - Result: Restore whiteboard content and timer.
