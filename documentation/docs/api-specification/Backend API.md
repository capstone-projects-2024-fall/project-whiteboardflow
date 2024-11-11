---
sidebar_position: 2
description: What should be in this section.
---

Backend API
=============================

## Classes

### HintData

**Description:** A data model class to represent the data passed when the user
requests a hint.

#### Data fields:

- `token`: `str`
    - Token used to identify user through their Firebase user ID. 
- `question`: `str`
    - The interview question.
- `image`: `str`
    - The image received from Firebase, base64 encoded as a string.

### AIData

**Description:** `AIData` extends `HintData` to include a transcript of the user's
verbal explanation.

#### Data fields:

- `transcript`: `str`
    - The transcript text from the user's verbal explanation, used as
      additional context for the AI.

## Functions

### get_hint(data: HintData)
- **Description**: Provides a hint based on the user's current progress on the
  question.
- **Arguments**:
    - `data`: `HintData` The hint request data containing the question and an
      image of the user's current progress.
- **Returns**: `dict[str, str]`
    - The AI-generated hint response based on the provided question and current
      answer.

### get_result(data: AIData)
- **Description**: Returns AI-generated feedback based on the user's answer.
- **Arguments**:
    - `data`: `AIData` Data containing the question, image of the user's
      answer, and their verbal explanation.
- **Returns**: 
    - `dict[str, str]`: AI's response message.

### get_ai_response(data: AIData, context_file: str)
- **Description**: Generates a response from ChatGPT based on the inputted data
  and chat context. 
- **Arguments**:
    - `data`: `AIData` Data containing the question, image of the user's
      answer, and their verbal explanation.
    - `context_file`: `str` The file containing a chat context for how the AI
      should respond.
- **Returns**: 
    - `dict[str, str]`: AI's response message.