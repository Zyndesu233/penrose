import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "./common/headerApp";

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