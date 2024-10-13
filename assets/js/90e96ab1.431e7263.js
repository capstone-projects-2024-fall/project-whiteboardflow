"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[2418],{8243:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>v,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var r=a(74848),n=a(28453);const i={sidebar_position:3},s="Sequence Diagrams",c={id:"system-architecture/Sequence Diagrams",title:"Sequence Diagrams",description:"1: Mock Interview",source:"@site/docs/system-architecture/Sequence Diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/Sequence Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Sequence Diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/system-architecture/Sequence Diagrams.md",tags:[],version:"current",lastUpdatedBy:"bstephe9",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Class Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Class Diagrams"},next:{title:"Database Diagrams",permalink:"/project-whiteboardflow/docs/system-architecture/Database Diagrams"}},v={},o=[{value:"1: Mock Interview",id:"1-mock-interview",level:2},{value:"2: Digital Whiteboard",id:"2-digital-whiteboard",level:2},{value:"3: AI Assistant",id:"3-ai-assistant",level:2},{value:"4: Account Creation",id:"4-account-creation",level:2},{value:"5: Account Deletion",id:"5-account-deletion",level:2},{value:"6: User Question History",id:"6-user-question-history",level:2},{value:"7: Hints",id:"7-hints",level:2},{value:"8: Unexpected Exit",id:"8-unexpected-exit",level:2}];function d(e){const t={h1:"h1",h2:"h2",mermaid:"mermaid",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"sequence-diagrams",children:"Sequence Diagrams"}),"\n",(0,r.jsx)(t.h2,{id:"1-mock-interview",children:"1: Mock Interview"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant Database\nparticipant AI\n\nactivate User\nUser ->> Server: Generate interview question\ndeactivate User\n\nactivate Server\nServer ->> Database: Get random question\ndeactivate Server\n\nactivate Database\nDatabase --\x3e> Server: Return question and time limit\ndeactivate Database\n\nactivate Server\nServer --\x3e> User: Display question, time <br/>limit, and whiteboard\nServer --\x3e> User: Begin written test\ndeactivate Server\n\nactivate User\nUser ->> Server: Written test complete\ndeactivate User\n\nactivate Server\nServer --\x3e> User: Begin oral test\ndeactivate Server\n\nactivate User\nUser ->> Server: Oral test complete\ndeactivate User\n\nactivate Server\nServer ->> AI: Send user's written and oral answers\ndeactivate Server\n\nactivate AI\nAI --\x3e> Server: Return AI response\ndeactivate AI\n\nactivate Server\nServer --\x3e> Database: Store question, user's answer, and AI response\nServer --\x3e> User: Display AI response\ndeactivate Server\n"}),"\n",(0,r.jsx)(t.h2,{id:"2-digital-whiteboard",children:"2: Digital Whiteboard"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant Whiteboard\n\nactivate Server\nServer --\x3e> User: Generate question\ndeactivate Server\n\nactivate User\nUser ->> Whiteboard: new()\nactivate Whiteboard\ndeactivate Whiteboard\nUser ->> Whiteboard: Send touchscreen input to draw\ndeactivate User\n\nactivate Whiteboard\nWhiteboard --\x3e> User: Display pencil strokes\ndeactivate Whiteboard\n\nactivate User\nUser ->> Whiteboard: Send touchscreen input to erase\ndeactivate User\n\nactivate Whiteboard\nWhiteboard --\x3e> User: Erase pencil strokes\ndeactivate Whiteboard\n"}),"\n",(0,r.jsx)(t.h2,{id:"3-ai-assistant",children:"3: AI Assistant"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram \n\nparticipant User\nparticipant Server\nparticipant AI\n\nactivate Server\nServer --\x3e> User: Generate question\ndeactivate Server\n\nactivate User\nUser ->> AI: Request hint (send question)\ndeactivate User\n\nactivate AI\nAI --\x3e> Server: Return hint\ndeactivate AI\n\nactivate Server\nServer --\x3e> User: Display hint\ndeactivate Server\n"}),"\n",(0,r.jsx)(t.h2,{id:"4-account-creation",children:"4: Account Creation"}),"\n",(0,r.jsx)(t.mermaid,{value:'\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant OAuth Provider\nparticipant Database\n\nactivate User\nUser ->> Server: User selects "Create Account"\ndeactivate User\n\nactivate Server\nServer --\x3e> User: Redirect to OAuth login\ndeactivate Server\n\nactivate User\nUser ->> OAuth Provider: Enter credentials\ndeactivate User\n\nactivate OAuth Provider\nOAuth Provider --\x3e> Server: Verify credentials\ndeactivate OAuth Provider\n\nactivate Server\nServer ->> Database: Store credentials\ndeactivate Server\n\nactivate Database\nDatabase --\x3e> Server: Return success\ndeactivate Database\n\nactivate Server\nServer --\x3e> User: Redirect to home page\ndeactivate Server\n'}),"\n",(0,r.jsx)(t.h2,{id:"5-account-deletion",children:"5: Account Deletion"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant Database\n\nactivate User\nUser ->> Server: Request account deletion\ndeactivate User\n\nactivate Server\nServer --\x3e> User: OAuth confirmation request\ndeactivate Server\n\nactivate User\nUser ->> Server: OAuth confirmation\ndeactivate User\n\nactivate Server\nServer ->> Database: Request account deletion\ndeactivate Server\n\nactivate Database\nDatabase --\x3e> Server: Return success\ndeactivate Database\n\nactivate Server\nServer --\x3e> User: Deletion success\ndeactivate Server\n"}),"\n",(0,r.jsx)(t.h2,{id:"6-user-question-history",children:"6: User Question History"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant OAuth Provider\nparticipant Database\n\nactivate User\nUser ->> Server: OAuth login request\ndeactivate User\n\nactivate Server\nServer ->> OAuth Provider: OAuth request\ndeactivate Server\n\nactivate OAuth Provider\nOAuth Provider --\x3e> Server: OAuth success\ndeactivate OAuth Provider\n\nactivate Server\nServer --\x3e> User: OAuth success\ndeactivate Server\n\nactivate User\nUser ->> Server: Request question history\ndeactivate User\n\nactivate Server\nServer ->> Database: Request question history\ndeactivate Server\n\nactivate Database\nDatabase --\x3e> Server: Question/score history data\ndeactivate Database\n\nactivate Server\nServer --\x3e> User: Displays question history\ndeactivate Server\n"}),"\n",(0,r.jsx)(t.h2,{id:"7-hints",children:"7: Hints"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant AI Assistant\n\nactivate Server\nServer --\x3e> User: User is given prompt to answer\ndeactivate Server\n\nactivate User\nUser ->> Server: User requests hint from AI assistant\ndeactivate User\n\nactivate Server\nServer ->> AI Assistant: Sends current user progress\ndeactivate Server\n\nactivate AI Assistant\nAI Assistant --\x3e> Server: Returns result of analysis\ndeactivate AI Assistant\n\nactivate Server\nServer --\x3e> User: Displays feedback from AI Assistant\ndeactivate Server\n"}),"\n",(0,r.jsx)(t.h2,{id:"8-unexpected-exit",children:"8: Unexpected Exit"}),"\n",(0,r.jsx)(t.mermaid,{value:"\nsequenceDiagram\n\nparticipant User\nparticipant Server\nparticipant Database\n\nactivate User\nUser ->> Server: Unexpected exit\ndeactivate User\n\nactivate Server\nServer ->> Database: Sends current data to store\ndeactivate Server\n\nactivate Database\nDatabase --\x3e> Server: Return success\ndeactivate Database\n\nactivate Server\nServer --\x3e> User: Return success\ndeactivate Server\n\nactivate User\nUser ->> Server: Requests to load previous progress\ndeactivate User\n\nactivate Server\nServer ->> Database: Requests previous progress\ndeactivate Server\n\nactivate Database\nDatabase --\x3e> Server: Return data\ndeactivate Database\n\nactivate Server\nServer --\x3e> User: Return data\ndeactivate Server\n"})]})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>c});var r=a(96540);const n={},i=r.createContext(n);function s(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);