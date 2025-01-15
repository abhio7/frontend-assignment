import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectTable from "../ProjectTable/ProjectTable";

describe("ProjectTable Component", () => {
  const mockOnRowClick = jest.fn();

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

    const rows = screen.getAllByRole("row");

    const dataRows = rows.slice(1);

    expect(dataRows).toHaveLength(mockProjects.length);
  });

  it("displays the correct data for each row, including handling missing 'amt.pledged' values", () => {
    renderTable(mockProjects);

    const rows = screen.getAllByRole("row").slice(1);

    const firstRowCells = rows[0].cells;
    expect(firstRowCells[0].textContent).toBe("1");
    expect(firstRowCells[1].textContent).toBe("75%");
    expect(firstRowCells[2].textContent).toBe("$10,000");

    const secondRowCells = rows[1].cells;
    expect(secondRowCells[0].textContent).toBe("2");
    expect(secondRowCells[1].textContent).toBe("50%");
    expect(secondRowCells[2].textContent).toBe("$5,000");

    const thirdRowCells = rows[2].cells;
    expect(thirdRowCells[0].textContent).toBe("3");
    expect(thirdRowCells[1].textContent).toBe("30%");
    expect(thirdRowCells[2].textContent).toBe("-");

    const fourthRowCells = rows[3].cells;
    expect(fourthRowCells[0].textContent).toBe("4");
    expect(fourthRowCells[1].textContent).toBe("20%");
    expect(fourthRowCells[2].textContent).toBe("-");
  });

  it("calls onRowClick with the correct project when a row is clicked", () => {
    renderTable(mockProjects);

    fireEvent.click(screen.getAllByRole("row")[1]);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[0]);

    fireEvent.click(screen.getAllByRole("row")[2]);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[1]);

    fireEvent.click(screen.getAllByRole("row")[3]);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[2]);

    fireEvent.click(screen.getAllByRole("row")[4]);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockProjects[3]);
  });

  it("displays correct 'S.No.' value based on project index", () => {
    renderTable(mockProjects);

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows[0].cells[0].textContent).toBe("1");
    expect(rows[1].cells[0].textContent).toBe("2");
    expect(rows[2].cells[0].textContent).toBe("3");
    expect(rows[3].cells[0].textContent).toBe("4");
  });

  it("handles missing 'amount' values correctly (null or undefined)", () => {
    renderTable(mockProjects);

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows[2].cells[2].textContent).toBe("-"); // Null value for amt.pledged
    expect(rows[3].cells[2].textContent).toBe("-"); // Undefined value for amt.pledged
  });

  it("displays correct 'Amount' when it's a number", () => {
    renderTable(mockProjects);

    const rows = screen.getAllByRole("row").slice(1);

    expect(rows[0].cells[2].textContent).toBe("$10,000");
    expect(rows[1].cells[2].textContent).toBe("$5,000");
  });
});
