import { describe, it, expect } from "vitest";
import { render } from "../../../test/render.tsx";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Launches } from "./Launches";
import "@testing-library/jest-dom";

describe("launches list", () => {
  it("page should be correctly loaded", () => {
    render(<Launches />);
    expect(screen.getByText(/SpaceX/)).toBeInTheDocument();
  });
  it("card should correctly render launch's info", async () => {
    render(<Launches />);
    const card = await screen.findByText(/Starlink 2/);
    expect(card).toBeInTheDocument();
  });
  it("click on the button should open the modal window", async () => {
    render(<Launches />);
    await screen.findByText(/Starlink 2/);
    expect(screen.queryByText(/Details:/)).not.toBeInTheDocument();
    await userEvent.click(screen.getAllByText(/See more/)[0]);
    expect(screen.getByText(/Details:/)).toBeInTheDocument();
  });
  it("click on the close button should close the modal", async () => {
    render(<Launches />);
    await screen.findByText(/Starlink 2/);
    await userEvent.click(screen.getAllByText(/See more/)[0]);
    expect(screen.getByText(/Details:/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close"));
    expect(screen.queryByText(/Details:/)).not.toBeInTheDocument();
  });
});
