import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "../common/headerApp.jsx";
import ProjectApp from "./programApp.jsx";

const projectReviewNavList = [{
  name: "Dashboard",
  link: "../page/dashboard.html"
},
{
  name: "Projects",
  link: "../page/projectReview.html"
},
{
  name: "Program",
  link: "#"
},
{
  name: "Schedule",
  link: "#"
},
{
  name: "Meeting",
  link: "#"
}];


ReactDOM.createRoot(document.getElementById("main-header")).render(
  <React.StrictMode>
    <HeaderApp list={projectReviewNavList}/>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("main-container")).render(
  <React.StrictMode>
    <ProjectApp />
  </React.StrictMode>
);