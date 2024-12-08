"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6842],{30805:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>d,toc:()=>l});var t=s(74848),i=s(28453);const a={sidebar_position:2,description:"What should be in this section."},r="Backend API",d={id:"api-specification/Backend API",title:"Backend API",description:"What should be in this section.",source:"@site/docs/api-specification/Backend API.md",sourceDirName:"api-specification",slug:"/api-specification/Backend API",permalink:"/project-whiteboardflow/docs/api-specification/Backend API",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-whiteboardflow/edit/main/documentation/docs/api-specification/Backend API.md",tags:[],version:"current",lastUpdatedBy:"Edwardd02",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"What should be in this section."},sidebar:"docsSidebar",previous:{title:"Frontend API",permalink:"/project-whiteboardflow/docs/api-specification/Frontend API"},next:{title:"Swagger API Specifications",permalink:"/project-whiteboardflow/docs/api-specification/Swagger API Specifications"}},c={},l=[{value:"Classes",id:"classes",level:2},{value:"HintData",id:"hintdata",level:3},{value:"Data fields:",id:"data-fields",level:4},{value:"AIData",id:"aidata",level:3},{value:"Data fields:",id:"data-fields-1",level:4},{value:"Functions",id:"functions",level:2},{value:"get_hint(data: HintData)",id:"get_hintdata-hintdata",level:3},{value:"get_result(data: AIData)",id:"get_resultdata-aidata",level:3},{value:"get_ai_response(data: AIData, context_file: str)",id:"get_ai_responsedata-aidata-context_file-str",level:3}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"backend-api",children:"Backend API"}),"\n",(0,t.jsx)(n.h2,{id:"classes",children:"Classes"}),"\n",(0,t.jsx)(n.h3,{id:"hintdata",children:"HintData"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Description:"})," A data model class to represent the data passed when the user\nrequests a hint."]}),"\n",(0,t.jsx)(n.h4,{id:"data-fields",children:"Data fields:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"token"}),": ",(0,t.jsx)(n.code,{children:"str"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Token used to identify user through their Firebase user ID."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"question"}),": ",(0,t.jsx)(n.code,{children:"str"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The interview question."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"image"}),": ",(0,t.jsx)(n.code,{children:"str"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The image received from Firebase, base64 encoded as a string."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"aidata",children:"AIData"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Description:"})," ",(0,t.jsx)(n.code,{children:"AIData"})," extends ",(0,t.jsx)(n.code,{children:"HintData"})," to include a transcript of the user's\nverbal explanation."]}),"\n",(0,t.jsx)(n.h4,{id:"data-fields-1",children:"Data fields:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"transcript"}),": ",(0,t.jsx)(n.code,{children:"str"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The transcript text from the user's verbal explanation, used as\nadditional context for the AI."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,t.jsx)(n.h3,{id:"get_hintdata-hintdata",children:"get_hint(data: HintData)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": Provides a hint based on the user's current progress on the\nquestion."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"data"}),": ",(0,t.jsx)(n.code,{children:"HintData"})," The hint request data containing the question and an\nimage of the user's current progress."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Returns"}),": ",(0,t.jsx)(n.code,{children:"dict[str, str]"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The AI-generated hint response based on the provided question and current\nanswer."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"get_resultdata-aidata",children:"get_result(data: AIData)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": Returns AI-generated feedback based on the user's answer."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"data"}),": ",(0,t.jsx)(n.code,{children:"AIData"})," Data containing the question, image of the user's\nanswer, and their verbal explanation."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Returns"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"dict[str, str]"}),": AI's response message."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"get_ai_responsedata-aidata-context_file-str",children:"get_ai_response(data: AIData, context_file: str)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": Generates a response from ChatGPT based on the inputted data\nand chat context."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Arguments"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"data"}),": ",(0,t.jsx)(n.code,{children:"AIData"})," Data containing the question, image of the user's\nanswer, and their verbal explanation."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"context_file"}),": ",(0,t.jsx)(n.code,{children:"str"})," The file containing a chat context for how the AI\nshould respond."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Returns"}),":","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"dict[str, str]"}),": AI's response message."]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>d});var t=s(96540);const i={},a=t.createContext(i);function r(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);