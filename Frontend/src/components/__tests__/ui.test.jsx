"use client";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";
import AboutPage from "@/features/about/AboutPage";
import ContactPage from "@/features/contact/ContactPage";
import ProjectsPage from "@/features/projects/ProjectsPage";
import { createContactSubmission } from "@/api";

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
    render(
      <Header profile={{ navigationLinks: [{ label: "Home", to: "/" }] }} />,
    );

    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
  });

  test("header renders backend-driven banner and CTA copy", () => {
    render(
      <Header
        profile={{
          headerBannerText: "Open for product engineering roles",
          headerAvailabilityText: "Interviewing now",
          headerContactCtaLabel: "Start a project",
        }}
      />,
    );

    expect(
      screen.getByText("Open for product engineering roles"),
    ).toBeInTheDocument();
    expect(screen.getByText("Interviewing now")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Start a project" }),
    ).toBeInTheDocument();
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
        name: /I build fast, modern web applications that help businesses grow/i,
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
      screen.getByText(/complete web applications from idea to launch/i),
    ).toBeInTheDocument();
  });

  test("about page renders backend-driven content", () => {
    render(
      <AboutPage
        profile={{
          aboutIntroDescription: "About page intro from MongoDB.",
          aboutParagraphs: [{ content: "Custom about paragraph." }],
          aboutProcessTitle: "Structured delivery with room to scale",
          aboutProcessDescription: "Custom process description.",
        }}
      />,
    );

    expect(
      screen.getByText("About page intro from MongoDB."),
    ).toBeInTheDocument();
    expect(screen.getByText("Custom about paragraph.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Structured delivery with room to scale/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Custom process description.")).toBeInTheDocument();
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
        name: /Real products, not just screenshots/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Fast, responsive, and production-ready/i,
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

  test("contact page renders backend-driven intro and panel copy", () => {
    render(
      <ContactPage
        profile={{
          contactIntroTitle: "Share the product you want to launch",
          contactPanelTitle: "Direct contact",
          contactPanelDescription: "Email or call if you want a faster intro.",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /Share the product you want to launch/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Direct contact")).toBeInTheDocument();
    expect(
      screen.getByText("Email or call if you want a faster intro."),
    ).toBeInTheDocument();
  });
});
