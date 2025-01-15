// src/App.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import apiFetch from './hooks/apiFetch';

// Mock the child components
jest.mock('./components/ProjectTable/ProjectTable', () => ({ projects, onRowClick }) => (
  <table>
    <tbody>
      {projects.map((project, index) => (
        <tr key={index} onClick={() => onRowClick(project)}>
          <td>{project.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
));

jest.mock('./components/Pagination/Pagination', () => ({ paginate, currentPage }) => (
  <div>
    <button onClick={() => paginate(currentPage - 1)}>Prev</button>
    <button onClick={() => paginate(currentPage + 1)}>Next</button>
  </div>
));

jest.mock('./components/Card/Card', () => ({ project, closeCard }) => (
  <div>
    <h2>{project.name}</h2>
    <button onClick={closeCard}>Close</button>
  </div>
));

// Mock the apiFetch hook
jest.mock('./hooks/apiFetch');

describe('App Component', () => {
  it('should render error state correctly', () => {
    apiFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data'
    });

    render(<App />);

    // Use a more flexible matcher for text content
    expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
  });

  it('should handle row click and show project card', async () => {
    const mockProjects = [
      { name: 'Project 1' },
      { name: 'Project 2' },
      { name: 'Project 3' },
    ];
    apiFetch.mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null
    });

    render(<App />);

    // Click on a row to select a project
    fireEvent.click(screen.getByText('Project 1'));

    // Verify that the project card is displayed
    expect(screen.getByRole('heading', { name: 'Project 1' })).toBeInTheDocument();

    // Click the close button to close the card
    fireEvent.click(screen.getByText('Close'));

    // Verify that the project card is no longer displayed
    expect(screen.queryByRole('heading', { name: 'Project 1' })).not.toBeInTheDocument();
  });
});
