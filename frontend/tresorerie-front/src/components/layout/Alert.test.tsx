import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert component", () => {
  it("renders an error alert by default", () => {
    render(<Alert message="An error occurred" />);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert-type")).toHaveTextContent("error:");
    expect(screen.getByTestId("alert-message")).toHaveTextContent("An error occurred");
  });

  it("renders a success alert", () => {
    render(<Alert message="Operation successful" type="success" />);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert-type")).toHaveTextContent("success:");
    expect(screen.getByTestId("alert-message")).toHaveTextContent("Operation successful");
  });

  it("renders an info alert", () => {
    render(<Alert message="FYI: updates available" type="info" />);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert-type")).toHaveTextContent("info:");
    expect(screen.getByTestId("alert-message")).toHaveTextContent("FYI: updates available");
  });
});
