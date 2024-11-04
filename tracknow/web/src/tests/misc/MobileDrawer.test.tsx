import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileDrawer from "../../misc/MobileDrawer";

describe("MobileDrawer", () => {
  const mockOnClose = jest.fn();

  it("renders correctly when open", () => {
    render(
      <MobileDrawer isOpen={true} onClose={mockOnClose}>
        <div>Drawer content</div>
      </MobileDrawer>,
    );

    expect(screen.getByText("tracknow")).toBeInTheDocument();
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <MobileDrawer isOpen={false} onClose={mockOnClose}>
        <div>Drawer content</div>
      </MobileDrawer>,
    );

    expect(screen.queryByText("tracknow")).not.toBeInTheDocument();
    expect(screen.queryByText("Drawer content")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    render(
      <MobileDrawer isOpen={true} onClose={mockOnClose}>
        <div>Drawer content</div>
      </MobileDrawer>,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders children content", () => {
    render(
      <MobileDrawer isOpen={true} onClose={mockOnClose}>
        <div>Custom child content</div>
      </MobileDrawer>,
    );

    expect(screen.getByText("Custom child content")).toBeInTheDocument();
  });
});
