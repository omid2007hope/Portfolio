"use client";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";
import AboutPage from "@/components/features/about/AboutPage";
import ContactPage from "@/components/features/contact/ContactPage";
import ProjectsPage from "@/components/features/projects/ProjectsPage";
import { createContactSubmission } from "@/lib/api";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("@/lib/api", () => ({
  createContactSubmission: jest.fn(),
}));

describe("frontend UI flows", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("header keeps the resume link in navigation", () => {
    render(<Header profile={{ navigationLinks: [{ label: "Home", to: "/" }] }} />);

    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
  });

  test("about page renders fallback content", () => {
    render(<AboutPage profile={{}} />);

    expect(
      screen.getByRole("heading", {
        name: /About/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Crafting user-focused digital experiences/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Clear process, thoughtful implementation/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/frontend-first mindset/i),
    ).toBeInTheDocument();
  });

  test("projects page exposes descriptive headings", () => {
    render(<ProjectsPage projects={[]} profile={{}} />);

    expect(
      screen.getByRole("heading", {
        name: /Selected Projects/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Practical work, not just screenshots/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Fast, responsive, and built to scale/i,
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  test("contact form validates then submits", async () => {
    const user = userEvent.setup();
    createContactSubmission.mockResolvedValue({
      message: "Contact submission created successfully.",
    });

    const { container } = render(<ContactPage profile={{}} />);
    const form = container.querySelector("form");

    expect(
      screen.getByRole("heading", {
        name: /Project inquiry/i,
        level: 2,
      }),
    ).toBeInTheDocument();

    fireEvent.submit(form);
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText("Name"), "Omid");
    await user.type(screen.getByLabelText("Email"), "omid@example.com");
    await user.type(screen.getByLabelText("Subject"), "Portfolio");
    await user.type(screen.getByLabelText("Message"), "Hello there");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(createContactSubmission).toHaveBeenCalledWith({
        name: "Omid",
        email: "omid@example.com",
        subject: "Portfolio",
        message: "Hello there",
      });
    });

    expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
  });
});
