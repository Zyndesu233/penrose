import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "../common/headerApp";

const frontPageNavList = [{
  name: "Home",
  link: "#hero"
},
{
  name: "Product",
  link: "#product-intro"
},
{
  name: "About Us",
  link: "#company-intro"
},
{
  name: "Testimonials",
  link: "#testimonials"
},
{
  name: "Workspace",
  link: "#"
},
{
  name: "Dashboard",
  link: "./page/dashboard.html"
}];

ReactDOM.createRoot(document.getElementById("main-header")).render(
  <React.StrictMode>
    <HeaderApp list={frontPageNavList}/>
  </React.StrictMode>
);