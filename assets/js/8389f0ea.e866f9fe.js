"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[4933],{4354:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>d});var t=s(74848),i=s(28453);const a={sidebar_position:2},r="Class Diagrams",o={id:"system-architecture/Class Diagrams",title:"Class Diagrams",description:"",source:"@site/docs/system-architecture/Class Diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/Class Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Class Diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/system-architecture/Class Diagrams.md",tags:[],version:"current",lastUpdatedBy:"VinceLukban",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Component Descriptions",permalink:"/project-whiteboardflow/docs/system-architecture/Component Descriptions"},next:{title:"Sequence Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Sequence Diagrams"}},c={},d=[];function u(e){const n={h1:"h1",mermaid:"mermaid",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"class-diagrams",children:"Class Diagrams"}),"\n",(0,t.jsx)(n.mermaid,{value:"classDiagram\n\n  App --\x3e Main"}),"\n",(0,t.jsx)(n.mermaid,{value:'classDiagram\n\n%% Class definitions\n\nclass User {\n  +String userID\n  +String name\n  +String email\n  +String password\n  +List<QuestionHistory> questionHistory\n  +login()\n  +register()\n}\n\nclass Question {\n  +String questionID\n  +String questionText\n  +String questionType\n  +List<TestCase> testCases\n  +submitAnswer()\n  +getFeedback()\n}\n\nclass QuestionHistory {\n  +String questionID\n  +String answer\n  +Date timestamp\n  +boolean isCorrect\n  +String feedback\n}\n\nclass Whiteboard {\n  +String whiteboardID\n  +String sessionID\n  +void draw()\n  +void erase()\n}\n\nclass Microphone {\n  +String micID\n  +String sessionID\n  +void startRecording()\n  +void stopRecording()\n  +String analyzeSpeech()\n}\n\nclass AI {\n  +String aiID\n  +String sessionID\n  +void analyzeHandwriting()\n  +void provideFeedback()\n  +void assistUser()\n}\n\nclass Backend {\n  +void handleAPIRequest()\n  +void handleRealTimeComms()\n}\n\nclass Frontend {\n  +void renderUI()\n  +void useCanvasAPI()\n  +void useSVG()\n}\n\n%% Associations and relationships\n\nUser "1" --* "many" QuestionHistory : logs\nUser "1" --o "many" Whiteboard : uses\nWhiteboard "1" --o "1" Microphone : has\nQuestion "1" --o "many" TestCase : contains\nWhiteboard "1" --|> Frontend : inherits\nMicrophone "1" --|> Backend : inherits\nAI "1" --|> Backend : interfaces with\nUser "1" --o "many" AI : receives feedback from\nBackend "1" --|> Flask\nBackend "1" --|> Django\nFrontend "1" --|> ReactJS\n\nExplanation of the Diagram\n\nClasses and Attributes:\n\nUser:\n\nAttributes: userID, name, email, password, questionHistory\nMethods: login(), register()\nQuestion:\n\nAttributes: questionID, questionText, questionType, testCases\nMethods: submitAnswer(), getFeedback()\nQuestionHistory:\n\nAttributes: questionID, answer, timestamp, isCorrect, feedback\nWhiteboard:\n\nAttributes: whiteboardID, sessionID\nMethods: draw(), erase()\nMicrophone:\n\nAttributes: micID, sessionID\nMethods: startRecording(), stopRecording(), analyzeSpeech()\nAI:\n\nAttributes: aiID, sessionID\nMethods: analyzeHandwriting(), provideFeedback(), assistUser()\nBackend:\n\nMethods: handleAPIRequest(), handleRealTimeComms()\nFrontend:\n\nMethods: renderUI(), useCanvasAPI(), useSVG()\nRelationships:\nUser and QuestionHistory: A user logs many question histories.\nUser and Whiteboard: A user uses many whiteboards.\nWhiteboard and Microphone: A whiteboard has one microphone.\nQuestion and TestCase: A question contains many test cases.\nWhiteboard inherits Frontend: Indicates that the whiteboard UI is part of the frontend.\nMicrophone inherits Backend: Indicates microphone functionality is handled by the backend.\nAI interfaces with Backend: AI functionalities are served via backend services.\nUser and AI: A user receives feedback from AI.\nBackend interfaces with Flask and Django: Indicates that backend functionalities could be handled using Flask or Django.\nFrontend interfaces with ReactJS: Indicates the frontend is built using ReactJS.\n``` mermaid'})]})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>o});var t=s(96540);const i={},a=t.createContext(i);function r(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);