import React, { useState } from "react";
import "./reviewApp.css"

function ReviewApp() {
    const [pendingReview, setPendingReview] = useState([
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
    ]);

    return (
        <>
            <h2>Pending Review</h2>
            <div className="review-controls">
                <div className="filter-buttons">
                    <button className="btn filter-btn">Approved</button>
                    <button className="btn filter-btn active">Pending Approval</button>
                    <button className="btn filter-btn">Rejected</button>
                </div>
                <div className="review-actions">
                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-box" />
                        <button className="search-btn"><i className="fas fa-search"></i></button>
                    </div>
                    <div className="sort-container">
                        <select className="sort-dropdown">
                            <option>Sort by</option>
                            <option>Date</option>
                            <option>Name</option>
                        </select>
                    </div>
                    <button className="btn btn-secondary">Schedule Upload</button>
                </div>
            </div>

            <div className="review-table-container">
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Review Request</th>
                            <th>Contractor Submission Date</th>
                            <th>Owner</th>
                            <th>Review Completion Date</th>
                            <th>Status</th>
                            <th>Verification</th>
                            <th>Review Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingReview.map((e, i)=>(
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