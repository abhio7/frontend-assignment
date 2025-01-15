// src/components/Card/Card.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Card from "./Card";
import apiFetch from "../../hooks/apiFetch";
import "./Card.css";


// Mock the custom hook `apiFetch`
jest.mock("../../hooks/apiFetch");

// Sample project data to pass as props
const sampleProject = {
  title: "Sample Project",
  country: "USA",
  location: "New York",
  "percentage.funded": 75,
  "amt.pledged": 10000,
  "num.backers": 150,
  currency: "USD",
  type: "Technology",
  by: "John Doe",
  blurb: "A sample project for testing.",
};

describe("Card Component", () => {
  beforeEach(() => {
    // Mock the apiFetch hook to return no data initially
    apiFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
  });

  it("renders the project data from props correctly", () => {
    render(<Card project={sampleProject} closeCard={jest.fn()} />);

    // Assert that the title, country, and location are rendered correctly
    expect(screen.getByText("Sample Project")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("shows loading message when loading is true", () => {
    // Mock the apiFetch to return a loading state
    apiFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<Card project={sampleProject} closeCard={jest.fn()} />);

    // Assert that the loading message is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when error is true", () => {
    // Mock the apiFetch to return an error
    apiFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Something went wrong",
    });

    render(<Card project={sampleProject} closeCard={jest.fn()} />);

    // Assert that the error message is displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("calls handleFetchData when 'Fetch Data' button is clicked", async () => {
    render(<Card project={sampleProject} closeCard={jest.fn()} />);

    // Mock the apiFetch to simulate a response after the button is clicked
    apiFetch.mockReturnValueOnce({
      data: { title: "Fetched Project" },
      loading: false,
      error: null,
    });

    const fetchButton = screen.getByText("Fetch Data");
    fireEvent.click(fetchButton);

    // Ensure the API URL is updated (this part requires state to change)
    await waitFor(() => expect(apiFetch).toHaveBeenCalledWith("https://api.example.com/projects/thewhatamagump/the-whatamagump-a-hand-crafted-story-picture-book?ref=discovery"));
  });

  it("calls closeCard when close button is clicked", () => {
    const closeCardMock = jest.fn();
    render(<Card project={sampleProject} closeCard={closeCardMock} />);

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    // Assert that the closeCard function is called
    expect(closeCardMock).toHaveBeenCalledTimes(1);
  });
});
