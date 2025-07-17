import React, { useEffect, useState } from "react";
import "./programApp.css"
import programs from "./programList.json"

function ProgramApp() {
    const [programList, setProgramList] = useState(programs);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchProgramKeywords, setsearchProgramKeywords] = useState("");

    /* for later api use
    useEffect(()=>{
        fetch(API)
        .then((Response) => (Response.json()))
        .then((Data) => (setProgramList(Data)));
    }, []); 
    */

    function filterProgram(statusTarget) {
        let tempProgramList = [...programs].filter((e)=>(e.status===statusTarget));
        setProgramList(tempProgramList);
        setFilterStatus(statusTarget);
    }

    function initializeProgram() {
        setProgramList(programs);
        setFilterStatus("all");
    }

    function searchProgram(keywords) {
        let tempProgramList = [...programs].filter((e)=>(e.title.includes(keywords)));
        setProgramList(tempProgramList);
    }


    return (
        <>
            <header className="main-header">
                <h1>All Programs</h1>
            </header>

            <section className="controls-section">
                <div className="search-and-add">
                    <div className="search-container">
                        <input type="text" placeholder="Search Programs..." className="search-box" value={searchProgramKeywords} onChange={(e)=>(setsearchProgramKeywords(e.target.value))} />
                        <button className="search-btn" onClick={()=>(searchProgram(searchProgramKeywords))}><i className="fas fa-search"></i></button>
                    </div>
                    <button className="btn btn-1">Add Program</button>
                </div>
                <div className="filter-buttons">
                    <button className={filterStatus==="all"? "btn filter-btn active no-status": "btn filter-btn"} onClick={initializeProgram}>All</button>
                    <button className={filterStatus==="late"? "btn filter-btn active status-late": "btn filter-btn"} onClick={()=>(filterProgram("late"))}>Late</button>
                    <button className={filterStatus==="on-time"? "btn filter-btn active status-on-time": "btn filter-btn"} onClick={()=>(filterProgram("on-time"))}>On time</button>
                    <button className={filterStatus==="onboarding"? "btn filter-btn active status-onboarding": "btn filter-btn"} onClick={()=>(filterProgram("onboarding"))}>Onboarding</button>
                </div>
            </section>

            <section className="program-grid" id="program-grid">
                {programList.map((e, i) => (
                    <div className="program-block" key={i}>
                        <img src={`${e.img}&auto=format&fit=crop&w=400`} alt={e.title} class="program-block-cover" />
                        <div className="program-block-content">
                            <h3 className="program-block-title">{e.title}</h3>
                            <p className="program-block-description">{e.description}</p>
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

export default ProgramApp;