import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "../common/headerApp";
import ReviewApp from "./reviewApp.jsx";

const dashboardNavList = [{
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

ReactDOM.createRoot(document.getElementById("main-header")).render(
  <React.StrictMode>
    <HeaderApp list={dashboardNavList}/>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("review-section")).render(
  <React.StrictMode>
    <ReviewApp />
  </React.StrictMode>
);