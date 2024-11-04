import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SimracingTitles, CountryDropdown } from "../../misc/dropDown";

describe("Dropdown Components", () => {
  const mockChange = jest.fn();

  describe("SimracingTitles", () => {
    it("renders with the correct options", () => {
      render(<SimracingTitles value="" change={mockChange} />);

      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(
        screen.getByText("Assetto Corsa Competizione"),
      ).toBeInTheDocument();
      expect(screen.getByText("iRacing")).toBeInTheDocument();
      expect(screen.getByText("Gran Turismo 7")).toBeInTheDocument();
    });

    it("calls the change function when an option is selected", () => {
      render(<SimracingTitles value="" change={mockChange} />);

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "iRacing" },
      });
      expect(mockChange).toHaveBeenCalledTimes(1);
    });

    it("renders all simracing titles", () => {
      render(<SimracingTitles value="iRacing" change={mockChange} />);
      expect(screen.getAllByRole("option")).toHaveLength(17); // Update this number if you add or remove options
    });

    it("has the correct styling", () => {
      render(<SimracingTitles value="iRacing" change={mockChange} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveStyle("border-color: #323536");
    });
    it("renders with the correct initial value", () => {
      render(<SimracingTitles value="iRacing" change={mockChange} />);
      expect(screen.getByRole("combobox")).toHaveValue("iRacing");
    });

    it("calls the change function when a new option is selected", () => {
      render(<SimracingTitles value="iRacing" change={mockChange} />);
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "Gran Turismo 7" },
      });
      expect(mockChange).toHaveBeenCalled();
    });
  });

  describe("CountryDropdown", () => {
    it("renders with the correct options", () => {
      const mockChange = jest.fn();
      render(<CountryDropdown value="" change={mockChange} />);

      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("Choose Nationality")).toBeInTheDocument();
      expect(screen.getByText("Nigeria")).toBeInTheDocument();
      expect(screen.getByText("United States")).toBeInTheDocument();
    });

    it("calls the change function when a country is selected", () => {
      const mockChange = jest.fn();
      render(<CountryDropdown value="" change={mockChange} />);

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "Canada" },
      });
      expect(mockChange).toHaveBeenCalledTimes(1);
    });
    it("renders with the correct initial value", () => {
      render(<CountryDropdown value="United States" change={mockChange} />);
      expect(screen.getByRole("combobox")).toHaveValue("United States");
    });

    it("calls the change function when a new option is selected", () => {
      render(<CountryDropdown value="United States" change={mockChange} />);
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "Canada" },
      });
      expect(mockChange).toHaveBeenCalled();
    });

    it("renders all countries", () => {
      render(<CountryDropdown value="" change={mockChange} />);
      expect(screen.getAllByRole("option")).toHaveLength(245); // 244 countries + 1 default option
    });

    it("has the correct styling", () => {
      render(<CountryDropdown value="" change={mockChange} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveStyle("border-color: #323536");
    });

    it('has a default "Choose Nationality" option', () => {
      render(<CountryDropdown value="" change={mockChange} />);
      expect(screen.getByText("Choose Nationality")).toBeInTheDocument();
    });
  });
});
