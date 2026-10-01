import { Button, Text, toast } from "@heyo-sh/heyo-ui";
import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoCircleIcon,
  NotificationIcon,
  RocketIcon,
} from "../icons";
import { Example, Section } from "./section";

function deploy() {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("acme-api"), 1600),
  );
}

export function ToastSection() {
  return (
    <Section
      title="Toast"
      description="Fired from anywhere with toast(), rendered by a single <Toaster /> near the root."
    >
      <Example label="tone">
        <Button icon={NotificationIcon} onClick={() => toast("Saved")}>
          Neutral
        </Button>
        <Button
          icon={CircleCheckIcon}
          onClick={() =>
            toast.success("Deployed", {
              description: "acme-api is live in 300+ locations.",
            })
          }
        >
          Success
        </Button>
        <Button
          icon={InfoCircleIcon}
          onClick={() =>
            toast.info("New version available", { description: "v2.15.0" })
          }
        >
          Info
        </Button>
        <Button
          icon={AlertTriangleIcon}
          onClick={() =>
            toast.warning("Quota almost reached", {
              description: "92% of monthly requests used.",
            })
          }
        >
          Warning
        </Button>
        <Button
          icon={CircleXIcon}
          onClick={() =>
            toast.error("Deploy failed", {
              description: "Build exited with 1.",
            })
          }
        >
          Danger
        </Button>
      </Example>

      <Example label="timeout={0} (sticky)">
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Origin unreachable", {
              description: "Stays until you dismiss it.",
              timeout: 0,
            })
          }
        >
          Until dismissed
        </Button>
      </Example>

      <Example label="toast.promise">
        <Button
          variant="primary"
          icon={RocketIcon}
          onClick={() =>
            toast.promise(deploy(), {
              loading: "Deploying…",
              success: (name) => `Deployed ${name}`,
              error: "Deploy failed",
            })
          }
        >
          Deploy
        </Button>
      </Example>

      <Example label="stacking">
        <Button
          variant="outline"
          onClick={() => {
            toast("First");
            toast.success("Second");
            toast.warning("Third", { description: "All three stay readable." });
          }}
        >
          Fire three
        </Button>
        <Button variant="ghost" onClick={() => toast.close()}>
          Dismiss all
        </Button>
        <Text size="sm" tone="subtle">
          Bottom-right, newest nearest the corner, three deep — a list, not a
          pyramid.
        </Text>
      </Example>
    </Section>
  );
}
