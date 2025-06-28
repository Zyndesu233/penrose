import React, { useState } from "react";

function SortReview() {
    // Handling sort function
    const byContractorSubmissionDate = (o1, o2) => {
        if(o1.contractorSubmissionDate === o2.contractorSubmissionDate || !o1.contractorSubmissionDate || !o2.contractorSubmissionDate) return 0;
        return o1.contractorSubmissionDate < o2.contractorSubmissionDate? 1: -1;
    }

    const byProjectNameName = (o1, o2) => {
        if(o1.projectName === o2.projectName || !o1.projectName || !o2.projectName) return 0;
        return o1.projectName < o2.projectName? 1: -1;
    }

    function sortReviewBy(byWhat) {
        let tempPendingReview = [...pendingReview];
        if(byWhat==="ContractorSubmissionDate")
            tempPendingReview.sort(byContractorSubmissionDate);
        if(byWhat==="ProjectName")
            tempPendingReview.sort(byProjectNameName);
        setPendingReview(tempPendingReview);
    }

  const [selectedItem, setSelectedItem] = useState("SortBy");
  const handleChange = (e) => {
    setSelectedItem(e.target.value);
    sortReviewBy(selectedItem);
  }
  return (
    <select className="sort-dropdown" onChange={handleChange} defaultValue="Sort By Date">
        <option value="ContractorSubmissionDate">Sort By Date</option>
        <option value="ProjectName">Sort By Name</option>
    </select>
  );
}

export default SortReview;