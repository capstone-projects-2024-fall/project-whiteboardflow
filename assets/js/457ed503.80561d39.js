"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[8800],{52691:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=t(74848),a=t(28453);const s={sidebar_position:4},r="Database Diagrams",o={id:"system-architecture/Database Diagrams",title:"Database Diagrams",description:"Entity-Relation Diagram",source:"@site/docs/system-architecture/Database Diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/Database Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Database Diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/system-architecture/Database Diagrams.md",tags:[],version:"current",lastUpdatedBy:"DeanRoos",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Sequence Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Sequence Diagrams"},next:{title:"API Specification",permalink:"/project-whiteboardflow/docs/category/api-specification"}},c={},d=[{value:"Entity-Relation Diagram",id:"entity-relation-diagram",level:2}];function S(e){const n={h1:"h1",h2:"h2",mermaid:"mermaid",p:"p",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"database-diagrams",children:"Database Diagrams"}),"\n",(0,i.jsx)(n.h2,{id:"entity-relation-diagram",children:"Entity-Relation Diagram"}),"\n",(0,i.jsx)(n.mermaid,{value:'erDiagram\n    %% Entities and their attributes\n\n    USER ||--o{ SESSION: "owns"\n    USER ||--o{ AUTHENTICATION: "uses"\n    SESSION ||--o{ QUESTION: "contains"\n    SESSION ||--o{ ANALYSIS: "generates"\n    QUESTION ||--o{ CATEGORY: "classified in"\n\n    %% USER entity\n    USER {\n        String user_id PK\n        String name\n        String email\n        String password\n        Boolean audio_feedback_enabled\n        Boolean handwriting_feedback_enabled\n        String preferred_difficulty\n    }\n\n    %% SESSION entity\n    SESSION {\n        String session_id PK\n        String user_id FK\n        Date start_time\n        Date end_time\n        Text feedback_text\n        Date feedback_timestamp\n    }\n\n    %% QUESTION entity\n    QUESTION {\n        String question_id PK\n        String question_text\n        String difficulty_level\n        String category_id FK\n    }\n\n    %% CATEGORY entity\n    CATEGORY {\n        String category_id PK\n        String category_name\n    }\n\n    %% ANALYSIS entity\n    ANALYSIS {\n        String analysis_id PK\n        String session_id FK\n        Text handwriting_result\n        Text nlp_result\n        Text speech_transcription\n        Float speech_confidence\n    }\n\n    %% AUTHENTICATION entity\n    AUTHENTICATION {\n        String auth_id PK\n        String user_id FK\n        Date auth_date\n        String provider\n    }\n\n    %% Relationships\n    USER ||--o{ SESSION: "owns"\n    USER ||--o{ AUTHENTICATION: "uses"\n    SESSION ||--o{ QUESTION: "contains"\n    SESSION ||--o{ ANALYSIS: "generates"\n    QUESTION ||--o{ CATEGORY: "classified in"'}),"\n",(0,i.jsxs)(n.p,{children:["USER manages user authentication and profile information.",(0,i.jsx)("br",{}),"\nSESSION manages user sessions, detailing each instance where a user engages with coding and estimation problems on the digital whiteboard (one-to-many with USER). ",(0,i.jsx)("br",{}),"\nQUESTION contains the coding and estimation problems available for user interaction within sessions, classified into categories (many-to-one with CATEGORY). ",(0,i.jsx)("br",{}),"\nCATEGORY organizes questions into distinct categories based on their content or difficulty level (one-to-many with QUESTION). ",(0,i.jsx)("br",{}),"\nANALYSIS stores results from handwriting, speech, and natural language processing analysis related to user inputs during sessions (many-to-one with SESSION). ",(0,i.jsx)("br",{}),"\nAUTHENTICATION tracks details of user authentication methods and sessions (one-to-one with USER)."]})]})}function l(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(S,{...e})}):S(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var i=t(96540);const a={},s=i.createContext(a);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);