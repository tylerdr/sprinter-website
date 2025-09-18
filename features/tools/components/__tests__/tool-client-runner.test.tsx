import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolClientRunner from "../tool-client-runner";
import { vi, beforeEach, describe, expect, it } from "vitest";

vi.mock("@/features/tools/ui-registry", () => ({
  TOOL_UI_IMPORTS: {
    "test-tool": () =>
      Promise.resolve({
        default: {
          InputForm: ({
            onSubmit
          }: {
            onSubmit: (values: unknown) => void;
          }) => (
            <button type="button" onClick={() => onSubmit({ amount: 1234 })}>
              Submit Input
            </button>
          )
        }
      })
  }
}));

vi.mock("@/components/ui/dropdown-menu", () => {
  const React = require("react");

  return {
    DropdownMenu: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    DropdownMenuItem: ({
      children,
      onClick
    }: {
      children: React.ReactNode;
      onClick?: () => void;
    }) =>
      React.createElement(
        "button",
        {
          type: "button",
          onClick,
          role: "menuitem"
        },
        children
      )
  };
});

vi.mock("react-resizable-panels", () => {
  const React = require("react");

  const ResizablePanel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >((props, ref) =>
    React.createElement("div", { ...props, ref }, props.children)
  );
  ResizablePanel.displayName = "ResizablePanel";

  return {
    PanelGroup: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", null, children),
    Panel: ResizablePanel,
    PanelResizeHandle: ({ children }: { children?: React.ReactNode }) =>
      React.createElement("div", null, children)
  };
});

const copyToClipboardMock = vi.hoisted(() => vi.fn().mockResolvedValue(true));

vi.mock("@/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
  copyToClipboard: copyToClipboardMock
}));

const toastMock = vi.hoisted(() =>
  Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn()
  })
);

vi.mock("sonner", () => ({
  toast: toastMock
}));

describe("ToolClientRunner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    copyToClipboardMock.mockResolvedValue(true);
    delete (navigator as any).share;
  });

  it("renders share and export controls after successful execution", async () => {
    const runMock = vi.fn(async () => ({
      ok: true as const,
      data: { foo: "bar" }
    }));

    render(
      <ToolClientRunner
        slug="test-tool"
        toolName="Test Tool"
        executionMode="server"
        run={runMock}
        inputSchemaJSON={null}
        showEdit
      />
    );

    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const submitButton = await screen.findByRole("button", {
      name: /submit input/i
    });
    await user.click(submitButton);

    await screen.findByRole("button", { name: /share/i });
    expect(screen.getByRole("button", { name: /export/i })).toBeInTheDocument();
  });

  it("copies share JSON when selected from the share menu", async () => {
    const runMock = vi.fn(async () => ({
      ok: true as const,
      data: { foo: "bar" }
    }));

    render(
      <ToolClientRunner
        slug="test-tool"
        toolName="Test Tool"
        executionMode="server"
        run={runMock}
        inputSchemaJSON={null}
        showEdit
      />
    );

    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const submitButton = await screen.findByRole("button", {
      name: /submit input/i
    });
    await user.click(submitButton);

    const shareButton = await screen.findByRole("button", { name: /share/i });
    await user.click(shareButton);

    const copyJsonItem = await screen.findByRole("menuitem", {
      name: /copy share json/i
    });
    await user.click(copyJsonItem);

    await waitFor(() => {
      expect(copyToClipboardMock).toHaveBeenCalledWith(
        expect.stringContaining('"slug": "test-tool"')
      );
    });
  });
});
