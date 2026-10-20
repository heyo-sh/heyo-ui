import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { StatusBar } from "../src/components/status-bar";

describe("StatusBar", () => {
  test("renders a solid, non-interactive tick without details", () => {
    const html = renderToStaticMarkup(
      <StatusBar ticks={[{ status: "operational" }]} />,
    );

    expect(html).toContain('data-status="operational"');
    expect(html).toContain("bg-heyo-success");
    expect(html).not.toContain("<button");
  });

  test("makes labelled ticks keyboard accessible without a native title", () => {
    const html = renderToStaticMarkup(
      <StatusBar
        ticks={[{ status: "down", label: "Oct 20: 15 min outage" }]}
      />,
    );

    expect(html).toContain(
      '<button type="button" aria-label="Oct 20: 15 min outage"',
    );
    expect(html).toContain("bg-heyo-danger");
    expect(html).not.toContain("title=");
  });

  test("renders a rich tooltip trigger with multiple stacked colours", () => {
    const html = renderToStaticMarkup(
      <StatusBar
        size="sm"
        ticks={[
          {
            status: "down",
            label: "Oct 20",
            tooltip: <div>15 minutes of downtime</div>,
            segments: [
              { status: "operational", percent: 88.96 },
              { status: "maintenance", percent: 10 },
              { status: "down", percent: 1.04 },
              { status: "degraded", percent: 0 },
            ],
          },
        ]}
      />,
    );

    expect(html).toContain("h-4");
    expect(html).toContain('aria-label="Oct 20"');
    expect(html).toContain('data-status="down"');
    expect(html).toContain('bg-heyo-success" style="flex-grow:88.96');
    expect(html).toContain('bg-heyo-info" style="flex-grow:10');
    expect(html).toContain('bg-heyo-danger" style="flex-grow:1.04');
    expect(html).toContain("min-height:2px");
    expect(html).not.toContain("bg-heyo-warning");
  });
});
