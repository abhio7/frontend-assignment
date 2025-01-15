// import React from "react";

// const ProjectTable = ({ projects, currentPage, itemsPerPage, onRowClick }) => {
//   return (
//     <table className="project-table">
//       <thead>
//         <tr>
//           <th>S.No.</th>
//           <th>Percentage Funded</th>
//           <th>Amount Pledged</th>
//         </tr>
//       </thead>
//       <tbody>
//         {projects.map((project, index) => (
//           <tr key={index} onClick={() => onRowClick(project)}>
//             <td>{ project["s.no"]}</td>
//             <td className="percentage-funded">
//               {project["percentage.funded"]}% 
//             </td>
//             <td className="amount-pledged">
//               ${project["amt.pledged"].toLocaleString()}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ProjectTable;
import React from "react";

const ProjectTable = ({ projects, currentPage, itemsPerPage, onRowClick }) => {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Percentage Funded</th>
          <th>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index} onClick={() => onRowClick(project)}>
            <td>{project["s.no"]}</td>
            <td className="percentage-funded">
              {project["percentage.funded"]}% 
            </td>
            <td className="amount-pledged">
              {
                project["amt.pledged"] 
                  ? `$${project["amt.pledged"].toLocaleString()}` // Safely call toLocaleString if valid
                  : "-"  // Display "-" if amt.pledged is undefined or null
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
