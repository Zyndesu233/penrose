import React, { useState } from "react";
import "./reviewApp.css"

function ReviewApp() {
    const tableHeaderList = [
        {
            name: "Project Name",
            property: "projectName"
        },
        {
            name: "Review Request",
            property: "reviewRequest"
        },
        {
            name: "Contractor Submission Date",
            property: "contractorSubmissionDate"
        },
        {
            name: "Owner",
            property: "owner"
        },
        {
            name: "Review Completion Date",
            property: "reviewCompletionDate"
        }
    ];
    let reviewList = [
        {
            projectName: "Project Sky-High",
            reviewRequest: "Structral Integrity Analysis",
            contractorSubmissionDate: "2025-05-20",
            owner: "John Doe",
            reviewCompletionDate: "2025-06-10",
            status: "Pending",
            verification: "AI Verified",
            reviewReport: ""
        },
        {
            projectName: "Oceanfront Residences",
            reviewRequest: "MEP Drawings",
            contractorSubmissionDate: "2025-05-18",
            owner: "Jane Smith",
            reviewCompletionDate: "2025-06-05",
            status: "Approved",
            verification: "Manually Verified",
            reviewReport: ""
        },
        {
            projectName: "Downtown Metro Line",
            reviewRequest: "Geotechnical Survey",
            contractorSubmissionDate: "2025-05-15",
            owner: "Robert Brown",
            status: "Rejected",
            verification: "Verification Failed",
            reviewReport: ""
        },
        {
            projectName: "Greenfield Data Center",
            reviewRequest: "Environmental Impact Report",
            contractorSubmissionDate: "2025-05-22",
            owner: "Emily White",
            status: "Pending",
            verification: "AI Verified",
            reviewReport: ""
        },
        {
            projectName: "City General Hospital Wing",
            reviewRequest: "Architectural Blueprints",
            contractorSubmissionDate: "2025-05-19",
            owner: "Michael Green",
            reviewCompletionDate: "2025-06-08",
            status: "Approved",
            verification: "Manually Verified",
            reviewReport: ""
        }
    ];

    const [pendingReview, setPendingReview] = useState(reviewList);
    const [searchReviewKeywords, setSearchReviewKeywords] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // filter
    function filterReview(statusTarget) {
        let tempReviewList = [...reviewList].filter((e)=>(e.status===statusTarget));
        setPendingReview(tempReviewList);
        setFilterStatus(statusTarget);
    }

    function initializeProject() {
        setPendingReview(reviewList);
        setFilterStatus("All");
    }

    function searchReview(keywords) {
        let tempReviewList = [...reviewList].filter((e)=>(e.projectName.includes(keywords)));
        setPendingReview(tempReviewList);
    }

    // sort
    const [sortOrder, setSortOrder] = useState("Ascending");
    function mySort(property) {
        const compareFunctionAscending = (o1, o2) => {
            if(o1[property] === o2[property]) return 0;
                return o1[property] > o2[property]? 1: -1;
        }
        const compareFunctionDescending = (o1, o2) => {
            if(o1[property] === o2[property]) return 0;
                return o1[property] < o2[property]? 1: -1;
        }
        if(sortOrder === "Ascending") {
            let tempReviewList = [...pendingReview].sort(compareFunctionAscending);
            setPendingReview(tempReviewList);
            setSortOrder("Descending");
        } else if(sortOrder === "Descending") {
            let tempReviewList = [...pendingReview].sort(compareFunctionDescending);
            setPendingReview(tempReviewList);
            setSortOrder("Ascending");
        }
    }


    return (
        <>
            <h2>Pending Review</h2>
            <div className="review-controls">
                <div className="filter-buttons">
                    <button className={filterStatus==="All"? "btn filter-btn active no-status": "btn filter-btn"} onClick={initializeProject}>All</button>
                    <button className={filterStatus==="Approved"? "btn filter-btn active status-approved": "btn filter-btn"} onClick={()=>(filterReview("Approved"))}>Approved</button>
                    <button className={filterStatus==="Pending"? "btn filter-btn active status-pending": "btn filter-btn"} onClick={()=>(filterReview("Pending"))}>Pending</button>
                    <button className={filterStatus==="Rejected"? "btn filter-btn active status-rejected": "btn filter-btn"} onClick={()=>(filterReview("Rejected"))}>Rejected</button>
                </div>
                <div className="review-actions">
                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-box" value={searchReviewKeywords} onChange={(e)=>(setSearchReviewKeywords(e.target.value))} />
                        <button className="search-btn" onClick={()=>(searchReview(searchReviewKeywords))}><i className="fas fa-search"></i></button>
                    </div>
                    <button className="btn btn-2">Schedule Upload</button>
                </div>
            </div>

            <div className="review-table-container">
                <table className="review-table">
                    <thead>
                        <tr>
                            {tableHeaderList.map((e, i) => (<th key={`${i}th-table-header`}>{e.name} <i className="fas fa-sort" onClick={()=>(mySort(e.property))}></i></th>))}
                            <th>Status</th>
                            <th>Verification</th>
                            <th>Review Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingReview.map((e, i) => (
                            <tr key={i}>
                                <td>{e.projectName}</td>
                                <td>{e.reviewRequest}</td>
                                <td>{e.contractorSubmissionDate}</td>
                                <td>{e.owner}</td>
                                <td>{e.reviewCompletionDate? e.reviewCompletionDate: ""}</td>
                                <td><span className={`status-tag status-${e.status}`}>{e.status}</span></td>
                                {(e.verification === "AI Verified" && <td><i className="fas fa-check-circle ai-highlight" title="AI Verified"></i></td>)}
                                {(e.verification === "Manually Verified" && <td><i className="fas fa-check-circle" title="Manually Verified"></i></td>)}
                                {(e.verification === "Verification Failed" && <td><i className="fas fa-times-circle" title="Verification Failed"></i></td>)}
                                <td><a href="#" className="btn-link">View Report</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className="pagination-btn" title="Previous Page"><i className="fas fa-arrow-left"></i></button>
                <button className="pagination-btn" title="Next Page"><i className="fas fa-arrow-right"></i></button>
            </div>
    </>
    );
}

export default ReviewApp;