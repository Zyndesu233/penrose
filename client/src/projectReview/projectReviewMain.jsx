import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "../common/headerApp.jsx";
import ProjectApp from "./projectApp.jsx";

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
  link: "../page/programReview.html"
},
{
  name: "Schedule",
  link: "#"
},
{
  name: "Meeting",
  link: "#"
}];

const currentPage = "Projects";

ReactDOM.createRoot(document.getElementById("main-header")).render(
  <React.StrictMode>
    <HeaderApp list={projectReviewNavList} currentPage={currentPage} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("main-container")).render(
  <React.StrictMode>
    <ProjectApp />
  </React.StrictMode>
);