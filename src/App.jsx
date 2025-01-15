import React, { useState } from "react";
import apiFetch from "./hooks/apiFetch"; // custom hook for API call
import ProjectTable from "./components/ProjectTable/ProjectTable";
import Pagination from "./components/Pagination/Pagination";
import ProjectCard from "./components/Card/Card";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const itemsPerPage = 5;

  // Call the custom apiFetch hook
  const { data: projects, loading, error } = apiFetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json");

  // Pagination Logic
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = projects ? projects.slice(indexOfFirstProject, indexOfLastProject) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (project) => {
    setSelectedProject(project);  // Set the selected project
  };

  const closeCard = () => {
    setSelectedProject(null);  // Close the card
  };

  return (
    <div className="app-container">
      <h1>Frontend Project</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error}</p> // Display error message if there is an issue
      ) : (
        <>
          {/* Render the ProjectTable and Pagination only if projects exist */}
          {projects && projects.length > 0 ? (
            <>
              <ProjectTable projects={currentProjects} currentPage={currentPage} itemsPerPage={itemsPerPage} onRowClick={handleRowClick} />
              <Pagination totalItems={projects.length} paginate={paginate} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            </>
          ) : (
            <p>No projects available.</p>
          )}
        </>
      )}
      
      {/* Show the detailed card  */}
      {selectedProject && <ProjectCard project={selectedProject} closeCard={closeCard} />}
    </div>
  );
};

export default App;
