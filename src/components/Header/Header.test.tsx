import { Header } from "./Header";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testUtils";

const makeSut = () => {
  return renderWithProviders(
    <div style={{ width: "500px" }}>
      <Header />
    </div>
  );
};

describe("<Header />", () => {
  test("Should render text logo correctly", () => {
    const { getByText } = makeSut();

    expect(getByText(/FFA/)).toBeInTheDocument();
  });

  test("Should open and close menu in mobile view", () => {
    const { getByTestId } = makeSut();

    // Open
    fireEvent.click(getByTestId("toggle-menu"));
    expect(getByTestId("navbar")).not.toHaveClass("hidden");

    // Close
    fireEvent.click(getByTestId("toggle-menu"));
    expect(getByTestId("navbar")).toHaveClass("hidden");
  });

  test("Should have Home link", () => {
    const { getByTestId } = makeSut();

    expect(
      getByTestId("navbar-links").getElementsByTagName("a")[0]
    ).toHaveAttribute("href", "/");

    expect(
      getByTestId("navbar-links").getElementsByTagName("a")[0]
    ).toHaveTextContent("Home");
  });

  test("Should have Logout button", () => {
    const { getByTestId } = makeSut();

    const button =
      getByTestId("navbar-links").getElementsByTagName("button")[0];

    expect(button).toHaveTextContent("LOGOUT");
    fireEvent.click(button);

    expect(document.location.pathname).toBe("/");
  });
});
