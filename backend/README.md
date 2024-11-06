# Running Whiteboard Assistant with Frontend and Backend

## Backend Setup

#### Open backend directory in terminal:
- `cd whiteboardflow-backend/`

#### Create virtual environment:
- `python3 -m venv <venv_name>`

#### Activate virtual environment by running the relevant command for your platform and shell:
<img
  src="https://github.com/bstephe9/animal-defense/assets/123014920/6c582957-80d6-4fa8-882f-b5f2315f6371"
  width="400" height="200"
/>

#### Install any dependencies listed in `requirements.txt`:

- `pip3 install -r requirements.txt`

- **Note:** For Mac users, if there are issues installing PyAudio, you may have to install `portaudio` first:
	- `brew install portaudio`

## My Example Setup

To set up the project's backend, these are the steps I did in order. Mac users
will not run the exact same commands.

My environment:
- **Operating System:** Windows 10
- **Shell:** Git Bash


#### Open two terminals; one frontend (left), one backend (right):

![image](https://github.com/user-attachments/assets/1df0bcf8-0dd2-49ce-ad3c-9f982c8f648b)

#### Create virtual environment (backend):

![image](https://github.com/user-attachments/assets/508823c2-bfb5-49c5-a9cc-c741152ebd52)

#### Activate virtual environment (backend):

![image](https://github.com/user-attachments/assets/db244faf-5ce1-4fd6-9a81-1a2fc6839704)

#### Install dependencies (backend):

![image](https://github.com/user-attachments/assets/52ccfc20-51fe-4e1f-bb29-948b9679d7dd)

![image](https://github.com/user-attachments/assets/83e44488-ee89-4ddc-a155-01630d0e85cb)

## How to Run

#### Have both terminals open:

![image](https://github.com/user-attachments/assets/1df0bcf8-0dd2-49ce-ad3c-9f982c8f648b)

#### Activate virtual environment on the backend, if it's not running already:

![image](https://github.com/user-attachments/assets/db244faf-5ce1-4fd6-9a81-1a2fc6839704)

#### Run `npm start` from the frontend and `server.py` from the backend:

![image](https://github.com/user-attachments/assets/6f115a90-a35d-4dc1-8d10-54bd65437956)

#### The app will be running both on the frontend (port 3000) and the backend (port 5000):

![image](https://github.com/user-attachments/assets/12335d24-3872-474c-9e52-c7fb2cc4cd39)
