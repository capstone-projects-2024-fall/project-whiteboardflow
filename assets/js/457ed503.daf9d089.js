"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[8800],{52691:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=n(74848),s=n(28453);const r={sidebar_position:4},a="Database Diagrams",o={id:"system-architecture/Database Diagrams",title:"Database Diagrams",description:"",source:"@site/docs/system-architecture/Database Diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/Database Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Database Diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/system-architecture/Database Diagrams.md",tags:[],version:"current",lastUpdatedBy:"bstephe9",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Sequence Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Sequence Diagrams"},next:{title:"API Specification",permalink:"/project-whiteboardflow/docs/category/api-specification"}},c={},d=[];function S(e){const t={h1:"h1",mermaid:"mermaid",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"database-diagrams",children:"Database Diagrams"}),"\n",(0,i.jsx)(t.mermaid,{value:'\nerDiagram\n%% Entities and their attributes\n\nUSER {\n    String user_id PK\n    String name\n    String email\n    String password\n}\n\nQUESTION {\n    String question_id PK\n    String question_text\n    String question_type\n    String difficulty_level\n}\n\nQUESTION_HISTORY {\n    String history_id PK\n    String user_id FK\n    String question_id FK\n    String answer\n    Date timestamp\n    Boolean is_correct\n    String feedback\n}\n\nWHITEBOARD_SESSION {\n    String session_id PK\n    String user_id FK\n    Date start_time\n    Date end_time\n}\n\nHANDWRITING_ANALYSIS {\n    String analysis_id PK\n    String session_id FK\n    String user_id FK\n    Text analysis_result\n}\n\nNLP_ANALYSIS {\n    String analysis_id PK\n    String session_id FK\n    String user_id FK\n    Text analysis_result\n}\n\nFEEDBACK {\n    String feedback_id PK\n    String user_id FK\n    Text feedback_text\n    Date timestamp\n}\n\nAUTHENTICATION {\n    String auth_id PK\n    String user_id FK\n    Date auth_date\n    String provider\n}\n\n%% Relationships\nUSER ||--o{ QUESTION_HISTORY: "logs"\nUSER ||--o{ WHITEBOARD_SESSION: "initiates"\nUSER ||--o{ HANDWRITING_ANALYSIS: "receives"\nUSER ||--o{ NLP_ANALYSIS: "receives"\nUSER ||--o{ FEEDBACK: "receives"\nUSER ||--o{ AUTHENTICATION: "has"\nQUESTION ||--o{ QUESTION_HISTORY: "is part of"\nWHITEBOARD_SESSION ||--o{ HANDWRITING_ANALYSIS: "includes"\nWHITEBOARD_SESSION ||--o{ NLP_ANALYSIS: "includes"'})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(S,{...e})}):S(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var i=n(96540);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);