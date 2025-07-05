import React, { useEffect, useState } from "react";
import "./projectApp.css"
import projects from "./projectList.json"

function ProjectApp() {
    const [projectList, setProjectList] = useState(projects);
    const [filterStatus, setFilterStatus] = useState("all");

    /* for later api use
    useEffect(()=>{
        fetch(API)
        .then((Response) => (Response.json()))
        .then((Data) => (setProjectList(Data)));
    }, []); 
    */

    function filterProject(statusTarget) {
        let tempProjectList = [...projects].filter((e)=>(e.status===statusTarget));
        setProjectList(tempProjectList);
        setFilterStatus(statusTarget);
    }

    function initializeProject() {
        setProjectList(projects);
        setFilterStatus("all");
    }

    return (
        <>
            <header className="main-header">
                <h1>All Projects</h1>
            </header>

            <section className="controls-section">
                <div className="search-and-add">
                    <div className="search-container">
                        <input type="text" placeholder="Search Projects..." className="search-box" />
                        <button className="search-btn"><i className="fas fa-search"></i></button>
                    </div>
                    <div className="add-project-button">
                        <button className="btn btn-primary">Add Project</button>
                    </div>
                </div>
                <div className="filter-buttons">
                    <button className={filterStatus==="all"? "btn filter-btn active": "btn filter-btn"} onClick={initializeProject}>All</button>
                    <button className={filterStatus==="late"? "btn filter-btn active": "btn filter-btn"} onClick={()=>(filterProject("late"))}>Late</button>
                    <button className={filterStatus==="on-time"? "btn filter-btn active": "btn filter-btn"} onClick={()=>(filterProject("on-time"))}>On time</button>
                    <button className={filterStatus==="onboarding"? "btn filter-btn active": "btn filter-btn"} onClick={()=>(filterProject("onboarding"))}>Onboarding</button>
                </div>
            </section>

            <section className="project-grid" id="project-grid">
                {projectList.map((e, i) => (
                    <div className="project-block" key={i}>
                        <img src={`${e.img}&auto=format&fit=crop&w=400`} alt={e.title} class="project-block-cover" />
                        <div class="project-block-content">
                            <h3 class="project-block-title">{e.title}</h3>
                            <p class="project-block-description">{e.description}</p>
                        </div>
                    </div>
                ))}
            </section>

            <div className="view-more-container">
                <button className="btn btn-accent hidden" id="view-more-btn">View More</button>
            </div>
        </>
    );
}

export default ProjectApp;