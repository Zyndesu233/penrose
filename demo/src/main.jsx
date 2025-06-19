import React from "react";
import ReactDOM from "react-dom/client";
import HeaderApp from "./headerApp";

const frontPageNavList = [{
  name: "Home",
  link: "#hero-adjusted"
},
{
  name: "Product",
  link: "#product-intro-adjusted"
},
{
  name: "About Us",
  link: "#company-intro-adjusted"
},
{
  name: "Testimonials",
  link: "#testimonials-adjusted"
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