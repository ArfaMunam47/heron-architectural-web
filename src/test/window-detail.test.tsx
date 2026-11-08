import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WindowDetail } from "@/components/site/WindowDetail";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const media = (reduce = false) =>
  vi.stubGlobal("matchMedia", () => ({
    matches: reduce,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

describe("Click-only architectural window study", () => {
  it("does not open on hover, opens on click, returns and repeats", () => {
    media();
    render(<WindowDetail />);
    const trigger = screen.getByRole("button", { name: "Explore north-wall window" });
    fireEvent.pointerEnter(trigger);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByRole("region", { name: "Architectural window detail" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Return to floor plan" }));
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Explore window detail" }));
    expect(screen.getByRole("region")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("region"), { key: "Escape" });
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });
  it("shows the complete detail immediately with reduced motion", () => {
    media(true);
    render(<WindowDetail />);
    fireEvent.click(screen.getByRole("button", { name: "Explore north-wall window" }));
    expect(screen.getByRole("status")).toHaveTextContent("Window detail revealed");
  });
});
