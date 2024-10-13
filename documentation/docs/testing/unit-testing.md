---
sidebar_position: 1
---
# Unit tests

Unit tests for our front end code will be developed by the author of the code and be created using the Jest testing framework.
	
## AIAssistant

1. **Test user receiving a hint during a written test.**

Input / User action: User clicks the hint button.

Expected Result: Question and whiteboard screenshot sent to OpenAI API. On success, a string containing the AI response is returned, then displayed.

## Menu

1. **Toggle between tabs**
   
User action: User selects different tabs (e.g. MicPrompt, Profile, Whiteboard)

Result: UI updates to display the corresponding tab without reloading.

## MicPrompt

1. **Activate Microphone**

User action: User clicks the microphone button to start speech-to-text function

Result: Microphone starts to capture audio and converts speech to text displayed on the whiteboard

## Profile

1. **Load User Profile**

Input: User navigates to the Profile tab

Result: User's data is fetched and displayed correctly

## Whiteboard

1. **Draw on whiteboard**

Input: User draws on the whiteboard using a stylus.

Result: The drawings appear accurately on the whiteboard without lad

