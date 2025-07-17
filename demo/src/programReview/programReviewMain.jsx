import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "../common/headerApp.jsx";
import ProgramApp from "./programApp.jsx";

const programReviewNavList = [{
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
    <HeaderApp list={programReviewNavList}/>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("main-container")).render(
  <React.StrictMode>
    <ProgramApp />
  </React.StrictMode>
);