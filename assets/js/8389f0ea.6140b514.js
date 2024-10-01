"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[4933],{4354:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>r,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var t=s(74848),i=s(28453);const a={sidebar_position:2},r="Class Diagrams",o={id:"system-architecture/Class Diagrams",title:"Class Diagrams",description:"Front End Diagram",source:"@site/docs/system-architecture/Class Diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/Class Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Class Diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/system-architecture/Class Diagrams.md",tags:[],version:"current",lastUpdatedBy:"bstephe9",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Component Descriptions",permalink:"/project-whiteboardflow/docs/system-architecture/Component Descriptions"},next:{title:"Sequence Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Sequence Diagrams"}},d={},c=[{value:"Front End Diagram",id:"front-end-diagram",level:2},{value:"Components diagrams",id:"components-diagrams",level:2}];function m(n){const e={h1:"h1",h2:"h2",mermaid:"mermaid",...(0,i.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"class-diagrams",children:"Class Diagrams"}),"\n",(0,t.jsx)(e.h2,{id:"front-end-diagram",children:"Front End Diagram"}),"\n",(0,t.jsx)(e.mermaid,{value:"\nclassDiagram\n\n  App --\x3e Main\n  Main --\x3e Menu\n  Menu --\x3e Settings\n  Menu --\x3e Profile\n  Menu --\x3e PreviousQuestions\n  Main --\x3e WhiteBoard\n  Main --\x3e MicPrompt\n  MicPrompt --\x3e AIAssistant\n  WhiteBoard --\x3e AIAssistant\n  Main --\x3e Result\n  PreviousQuestions --\x3e Result\n  Result --\x3e AIAssistant\n\n  Whiteboard -string question\n  WhiteBoard: -draw()\n  WhiteBoard: -erase()\n  WhiteBoard: -undo()\n  WhiteBoard: -redo()\n\n  Main: + string question\n  Main: +start()\n\n  Menu: +display()\n  Menu: +hide()\n\n  MicPrompt: -string question\n  MicPrompt: -record()\n\n  Result: +int score\n  Result: +string Feedback\n  \n  AIAssistant: -string data\n  AIAssistant: +hint()\n  AIAssistant: +grade()\n\n  Settings: +string displayMode\n  Settings: +inputMode\n\n  Profile: -delete()\n\n\n\n"}),"\n",(0,t.jsx)(e.h2,{id:"components-diagrams",children:"Components diagrams"}),"\n",(0,t.jsx)(e.mermaid,{value:'\nclassDiagram\n\n%% Class definitions\n\nclass User {\n  +String userID\n  +String name\n  +String email\n  +String password\n  +List<QuestionHistory> questionHistory\n  +login()\n  +register()\n}\n\nclass Question {\n  +String questionID\n  +String questionText\n  +String questionType\n  +List<TestCase> testCases\n  +submitAnswer()\n  +getFeedback()\n}\n\nclass QuestionHistory {\n  +String questionID\n  +String answer\n  +Date timestamp\n  +boolean isCorrect\n  +String feedback\n}\n\nclass Whiteboard {\n  +String whiteboardID\n  +String sessionID\n  +void draw()\n  +void erase()\n}\n\nclass Microphone {\n  +String micID\n  +String sessionID\n  +void startRecording()\n  +void stopRecording()\n  +String analyzeSpeech()\n}\n\nclass AI {\n  +String aiID\n  +String sessionID\n  +void analyzeHandwriting()\n  +void provideFeedback()\n  +void assistUser()\n}\n\nclass Backend {\n  +void handleAPIRequest()\n  +void handleRealTimeComms()\n}\n\nclass Frontend {\n  +void renderUI()\n  +void useCanvasAPI()\n  +void useSVG()\n}\n\n%% Associations and relationships\n\nUser "1" --* "many" QuestionHistory : logs\nUser "1" --o "many" Whiteboard : uses\nWhiteboard "1" --o "1" Microphone : has\nQuestion "1" --o "many" TestCase : contains\nWhiteboard "1" --|> Frontend : inherits\nMicrophone "1" --|> Backend : inherits\nAI "1" --|> Backend : interfaces with\nUser "1" --o "many" AI : receives feedback from\nBackend "1" --|> Flask\nBackend "1" --|> Django\nFrontend "1" --|> ReactJS\n'})]})}function l(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(m,{...n})}):m(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>r,x:()=>o});var t=s(96540);const i={},a=t.createContext(i);function r(n){const e=t.useContext(a);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),t.createElement(a.Provider,{value:e},n.children)}}}]);