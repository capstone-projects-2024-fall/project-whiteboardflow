"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6842],{30805:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>d,metadata:()=>a,toc:()=>c});var i=s(74848),t=s(28453);const d={sidebar_position:2,description:"What should be in this section."},r="Backend API",a={id:"api-specification/Backend API",title:"Backend API",description:"What should be in this section.",source:"@site/docs/api-specification/Backend API.md",sourceDirName:"api-specification",slug:"/api-specification/Backend API",permalink:"/project-whiteboardflow/docs/api-specification/Backend API",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/api-specification/Backend API.md",tags:[],version:"current",lastUpdatedBy:"Dhruvil patel",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"What should be in this section."},sidebar:"docsSidebar",previous:{title:"Frontend API",permalink:"/project-whiteboardflow/docs/api-specification/Frontend API"},next:{title:"Swagger API Specifications",permalink:"/project-whiteboardflow/docs/api-specification/Swagger API Specifications"}},l={},c=[{value:"AI Assistant",id:"ai-assistant",level:2},{value:"Data Models",id:"data-models",level:3},{value:"<code>HintData</code>",id:"hintdata",level:4},{value:"Data fields:",id:"data-fields",level:4},{value:"<code>AIData</code>",id:"aidata",level:4},{value:"Data fields:",id:"data-fields-1",level:4},{value:"Functions",id:"functions",level:3},{value:"<code>get_hint(data: HintData)</code>",id:"get_hintdata-hintdata",level:4},{value:"<code>get_result(data: AIData)</code>",id:"get_resultdata-aidata",level:4},{value:"<code>get_ai_response(data: AIData, context_file: str)</code>",id:"get_ai_responsedata-aidata-context_file-str",level:4},{value:"History",id:"history",level:2},{value:"Data Models",id:"data-models-1",level:3},{value:"<code>HistoryEntry</code>",id:"historyentry",level:4},{value:"Data fields:",id:"data-fields-2",level:4},{value:"Utils",id:"utils",level:2},{value:"<code>get_firebase_image(user_id: str, session_id: str=None)</code>",id:"get_firebase_imageuser_id-str-session_id-strnone",level:4}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"backend-api",children:"Backend API"}),"\n",(0,i.jsx)(n.h2,{id:"ai-assistant",children:"AI Assistant"}),"\n",(0,i.jsx)(n.h3,{id:"data-models",children:"Data Models"}),"\n",(0,i.jsx)(n.h4,{id:"hintdata",children:(0,i.jsx)(n.code,{children:"HintData"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Description:"})," A data model class to represent the data passed when the user\nrequests a hint."]}),"\n",(0,i.jsx)(n.h4,{id:"data-fields",children:"Data fields:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"token"}),": ",(0,i.jsx)(n.code,{children:"str"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Token used to identify user through their Firebase user ID."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"question"}),": ",(0,i.jsx)(n.code,{children:"str"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The interview question."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"image"}),": ",(0,i.jsx)(n.code,{children:"str"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The image received from Firebase, base64 encoded as a string."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"aidata",children:(0,i.jsx)(n.code,{children:"AIData"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Description:"})," ",(0,i.jsx)(n.code,{children:"AIData"})," extends ",(0,i.jsx)(n.code,{children:"HintData"})," to include a transcript of the user's\nverbal explanation."]}),"\n",(0,i.jsx)(n.h4,{id:"data-fields-1",children:"Data fields:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"transcript"}),": ",(0,i.jsx)(n.code,{children:"str"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The transcript text from the user's verbal explanation, used as\nadditional context for the AI."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"functions",children:"Functions"}),"\n",(0,i.jsx)(n.h4,{id:"get_hintdata-hintdata",children:(0,i.jsx)(n.code,{children:"get_hint(data: HintData)"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": Provides a hint based on the user's current progress on the\nquestion."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data"}),": ",(0,i.jsx)(n.code,{children:"HintData"})," The hint request data containing the question and an\nimage of the user's current progress."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Returns"}),": ",(0,i.jsx)(n.code,{children:"dict[str, str]"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The AI-generated hint response based on the provided question and current\nanswer."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"get_resultdata-aidata",children:(0,i.jsx)(n.code,{children:"get_result(data: AIData)"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": Returns AI-generated feedback based on the user's answer."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data"}),": ",(0,i.jsx)(n.code,{children:"AIData"})," Data containing the question, image of the user's\nanswer, and their verbal explanation."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Returns"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"dict[str, str]"}),": AI's response message."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"get_ai_responsedata-aidata-context_file-str",children:(0,i.jsx)(n.code,{children:"get_ai_response(data: AIData, context_file: str)"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": Generates a response from ChatGPT based on the input data\nand chat context."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data"}),": ",(0,i.jsx)(n.code,{children:"AIData"})," Data containing the question, image of the user's\nanswer, and their verbal explanation."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"context_file"}),": ",(0,i.jsx)(n.code,{children:"str"})," The file containing a chat context for how the AI\nshould respond."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Returns"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"dict[str, str]"}),": AI's response message."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"history",children:"History"}),"\n",(0,i.jsx)(n.h3,{id:"data-models-1",children:"Data Models"}),"\n",(0,i.jsx)(n.h4,{id:"historyentry",children:(0,i.jsx)(n.code,{children:"HistoryEntry"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": Represents an entry in the user's question history, including details about the question, transcript, response, and session."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"data-fields-2",children:"Data fields:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"question"})," (",(0,i.jsx)(n.code,{children:"str"}),"): The interview question."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"questionId"})," (",(0,i.jsx)(n.code,{children:"str"}),"): A unique identifier for the question."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"transcript"})," (",(0,i.jsx)(n.code,{children:"str"}),"): The transcript of the user's verbal explanation during the interview."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"response"})," (",(0,i.jsx)(n.code,{children:"str"}),"): The AI generated response to the user's input."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"completionTime"})," (",(0,i.jsx)(n.code,{children:"str"}),"): The time when the question was completed."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"sessionId"})," (",(0,i.jsx)(n.code,{children:"str"}),"): The unique identifier for the session in which the question was attempted."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"utils",children:"Utils"}),"\n",(0,i.jsx)(n.h4,{id:"get_firebase_imageuser_id-str-session_id-strnone",children:(0,i.jsx)(n.code,{children:"get_firebase_image(user_id: str, session_id: str=None)"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": Retrieves an image associated with a user from Firebase Storage."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"user_id"})," (",(0,i.jsx)(n.code,{children:"str"}),"): The unique identifier for the user whose image is being retrieved."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"session_id"})," (",(0,i.jsx)(n.code,{children:"str"}),", optional): The session ID to specify a specific image. If not provided, it defaults to retrieving the general user image."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Returns"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"bytes"}),": The image data as a byte array, downloaded from Firebase Storage."]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var i=s(96540);const t={},d=i.createContext(t);function r(e){const n=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(d.Provider,{value:n},e.children)}}}]);