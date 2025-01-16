import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectTable from "./ProjectTable";

describe("ProjectTable Component", () => {
  const mockOnRowClick = jest.fn();

  // Updated mock data with both valid and missing 'amt.pledged'
  const mockProjects = [
    {
      "s.no": 1,
      "percentage.funded": 75,
      "amt.pledged": 10000, // Valid number
    },
    {
      "s.no": 2,
      "percentage.funded": 50,
      "amt.pledged": 5000,  // Valid number
    },
    {
      "s.no": 3,
      "percentage.funded": 30,
      "amt.pledged": null,   // Invalid value (null)
    },
    {
      "s.no": 4,
      "percentage.funded": 20,
      "amt.pledged": undefined, // Invalid value (undefined)
    },
  ];

  const renderTable = (projects) => {
    render(
      <ProjectTable
        projects={projects}
        currentPage={1}
        itemsPerPage={10}
        onRowClick={mockOnRowClick}
      />
    );
  };

  it("renders the correct number of rows based on the projects array", () => {
    renderTable(mockProjects);

    // We should have four rows (not including the header)
    const rows = screen.getAllByRole("row");

    // Exclude the header row (the first row) by slicing the array
    const dataRows = rows.slice(1);

    // Check that the number of rows (excluding the header) matches the number of mockProjects
    expect(dataRows).toHaveLength(mockProjects.length);
  });

  it("displays the correct data for each row, including handling missing 'amt.pledged' values", () => {
    renderTable(mockProjects);

    // Get all the data rows 
    const rows = screen.getAllByRole("row").slice(1);

    // Check the data in the first row 
    const firstRowCells = rows[0].cells;
    expect(firstRowCells[0].textContent).toBe("1"); // S.No.
    expect(firstRowCells[1].textContent).toBe("75%"); // Percentage Funded
    expect(firstRowCells[2].textContent).toBe("$10,000"); // Amount Pledged

    // Check the data in the second row (index 1)
    const secondRowCells = rows[1].cells;
    expect(secondRowCells[0].textContent).toBe("2");
    expect(secondRowCells[1].textContent).toBe("50%");
    expect(secondRowCells[2].textContent).toBe("$5,000");

    // Check the data in the third row (index 2)
    const thirdRowCells = rows[2].cells;
    expect(thirdRowCells[0].textContent).toBe("3");
    expect(thirdRowCells[1].textContent).toBe("30%");
    expect(thirdRowCells[2].textContent).toBe("-"); // Null value for amt.pledged

    // Check the data in the fourth row (index 3)
    const fourthRowCells = rows[3].cells;
    expect(fourthRowCells[0].textContent).toBe("4");
    expect(fourthRowCells[1].textContent).toBe("20%");
    expect(fourthRowCells[2].textContent).toBe("-"); // Undefined value for amt.pledged
  });

  it("calls onRowClick with the correct project when a row is clicked", () => {
    renderTable(mockProjects);

    // Click on the first row 
    fireEvent.click(screen.getAllByRole("row")[1]);

    // Ensure that onRowClick is called with the first project
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[0]);

    // Click on the second row
    fireEvent.click(screen.getAllByRole("row")[2]);

    // Ensure that onRowClick is called with the second project
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[1]);

    // Click on the third row
    fireEvent.click(screen.getAllByRole("row")[3]);

    // Ensure that onRowClick is called with the third project
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[2]);

    // Click on the fourth row
    fireEvent.click(screen.getAllByRole("row")[4]);

    // Ensure that onRowClick is called with the fourth project
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[3]);
  });

  it("displays correct 'S.No.' value based on project index", () => {
    renderTable(mockProjects);

    const rows = screen.getAllByRole("row").slice(1); // Exclude header row

    expect(rows[0].cells[0].textContent).toBe("1");  // First row should have "1"
    expect(rows[1].cells[0].textContent).toBe("2");  // Second row should have "2"
    expect(rows[2].cells[0].textContent).toBe("3");  // Third row should have "3"
    expect(rows[3].cells[0].textContent).toBe("4");  // Fourth row should have "4"
  });
});
