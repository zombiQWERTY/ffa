import { Button, ButtonProps } from "./Button";
import { render } from "@testing-library/react";

const makeSut = (props: Partial<ButtonProps>) => {
  return render(<Button text="default" {...props} />);
};

describe("<Button />", () => {
  test("Should render text correctly", () => {
    const { getByText } = makeSut({ text: "My Button" });

    expect(getByText(/My Button/)).toBeInTheDocument();
  });

  test("Should render processing text and spinner while loading", () => {
    const { getByText, getByTestId } = makeSut({
      text: "My Button",
      loadingText: "Processing",
      isLoading: true,
    });

    expect(getByText(/Processing/)).toBeInTheDocument();
    expect(getByTestId("spinner")).toBeInTheDocument();
  });
});
