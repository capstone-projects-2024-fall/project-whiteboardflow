---
sidebar_position: 1
description: What should be in this section.
---

Frontend API
=============================

## AIAssistant

**Description:** Provides hints and grades based on the user's input.

#### Data fields:

- `data`: `string`
    - The input used by the AI assistant for processing.

#### Methods:

- `hint()`
    - Description: Provides a hint from the user's current progress on the question.
    - Returns: `string`
        - The hint generated by the AI assistant.

- `grade()`
    - Description: Grades the user based on their answer.
    - Returns: `number`
        - The grade assigned to the input data.

## Menu

**Description:** Menu component that manages the visibility of a menu.

#### Methods:

- `display()`
    - Description: Displays the menu.

- `hide()`
    - Description: Hides the menu.

## MicPrompt

**Description:** Microphone prompt which allows the user to record their
response during the oral test.

#### Methods:

- `record()`
    - Description: Records the user's response.

## Profile

**Description:** Profile component that displays user information.

#### Methods:

- `deleteProfile()`
    - Description: Deletes a user profile.

## Result

**Description:** Result component that displays the user's received feedback.

#### Data fields:

- `feedback`: `string`
    - The feedback based on the user's answers.

## Settings

**Description:** Settings component that manages the application settings.

#### Data fields:

- `displayMode`: `string`
    - The current display mode of the application.

- `inputMode`: `number`
    - The current input mode.

## Whiteboard

**Description:** Whiteboard available for the user during a written test.

#### Methods:

- `draw()`
    - Description: Draws on the whiteboard.

- `erase()`
    - Description: Erases part of the whiteboard.

- `undo()`
    - Description: Undoes the last action on the whiteboard.

- `redo()`
    - Description: Redoes the last undone action on the whiteboard.
