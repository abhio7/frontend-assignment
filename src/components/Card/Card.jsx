import React, { useState } from "react";
import apiFetch from "../../hooks/apiFetch"; // Import the custom hook
import "./Card.css";

const Card = ({ project, closeCard }) => {
  const [apiUrl, setApiUrl] = useState(null); // State for the API URL
  const { data: fetchedProject, loading, error } = apiFetch(apiUrl);

  // Use the fetched project if available; otherwise, use the passed-in props
  const displayProject = fetchedProject || project;

  const handleFetchData = () => {
    // Add your API Url
    setApiUrl(
      "https://api.example.com/projects/thewhatamagump/the-whatamagump-a-hand-crafted-story-picture-book?ref=discovery"
    );
  };

  return (
    <div className="card-overlay">
      <div className="card">
        <button className="close-btn" onClick={closeCard}>
          X
        </button>

        {/* Loading and Error States */}
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* Card Content */}
        <div className="card-header">
          <div className="property">
            <span className="label">Country</span>
            <span className="value">{displayProject.country || "N/A"}</span>
          </div>
          <div className="property">
            <span className="label">Location</span>
            <span className="value">{displayProject.location || "N/A"}</span>
          </div>
          <div className="property">
            <span className="label">% Funded</span>
            <span className="value">
              {displayProject["percentage.funded"] || "N/A"}
            </span>
          </div>
        </div>

        <div className="card-content">
          <h2 className="card-title">{displayProject.title}</h2>
          <p className="card-description">{displayProject.blurb}</p>

          <div className="features">
            <div className="feature-box">
              <div className="property">
                <span className="label">Amount Pledged</span>
                <span className="value">
                  ${displayProject["amt.pledged"] || "N/A"}
                </span>
              </div>
            </div>
            <div className="feature-box">
              <div className="property">
                <span className="label">Backers</span>
                <span className="value">
                  {displayProject["num.backers"] || "N/A"}
                </span>
              </div>
            </div>
            <div className="feature-box">
              <div className="property">
                <span className="label">Currency</span>
                <span className="value">{displayProject.currency || "N/A"}</span>
              </div>
            </div>
            <div className="feature-box">
              <div className="property">
                <span className="label">Type</span>
                <span className="value">{displayProject.type || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <span className="card-by">{displayProject.by || "N/A"}</span>
          <button className="click-btn" onClick={handleFetchData}>
            Fetch Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
