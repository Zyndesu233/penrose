import React, { useEffect, useState } from "react";
import "./projectApp.css"
import projects from "./projectList.json"

function ProjectApp() {
    const [projectList, setProjectList] = useState(projects);
    console.log(projectList);
    /* for later api use
    useEffect(()=>{
        fetch(API)
        .then((Response) => (Response.json()))
        .then((Data) => (setProjectList(Data)));
    }, []); 
    */
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
                    <button className="btn filter-btn" data-filter="late">Late</button>
                    <button className="btn filter-btn" data-filter="on-time">On time</button>
                    <button className="btn filter-btn" data-filter="onboarding">Onboarding</button>
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