import { FileUpload, Text, type UploadedFile } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { UploadIcon } from "../icons";
import { Section, Stack } from "./section";

export function FileUploadSection() {
  return (
    <Section
      title="File Upload"
      description="A drop zone that is also a button — the whole thing is a label for a hidden input, so it works with a keyboard and on a phone."
    >
      <Stack label="with a file list" className="max-w-lg">
        <Interactive />
      </Stack>

      <Stack label="states" className="max-w-lg">
        <FileUpload
          files={[
            { id: "1", name: "logo.svg", size: 14_208, status: "done" },
            {
              id: "2",
              name: "hero-background-2400x1600.png",
              size: 2_418_112,
              status: "uploading",
              progress: 62,
            },
            {
              id: "3",
              name: "database-dump.sql",
              size: 91_000_000,
              status: "error",
              error: "Larger than the 50 MB limit",
            },
          ]}
          onRemove={() => {}}
          label="Drop more files"
        />
      </Stack>

      <Stack label="single + accept + maxSize" className="max-w-lg">
        <FileUpload
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          icon={UploadIcon}
          label="Upload an avatar"
          description="PNG, JPG or SVG, up to 5 MB"
        />
      </Stack>

      <Stack label="disabled" className="max-w-lg">
        <FileUpload disabled label="Uploads are paused" />
        <Text size="sm" tone="subtle">
          Drop and click are both off.
        </Text>
      </Stack>
    </Section>
  );
}

function Interactive() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  function add(incoming: File[]) {
    const next = incoming.map((file) => ({
      id: `${file.name}-${file.size}-${Math.random()}`,
      name: file.name,
      size: file.size,
      status: "uploading" as const,
      progress: 0,
    }));
    setFiles((current) => [...current, ...next]);

    // A fake upload, so the bar does something.
    for (const item of next) {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 20;
        setFiles((current) =>
          current.map((file) =>
            file.id === item.id
              ? {
                  ...file,
                  progress,
                  status: progress >= 100 ? "done" : "uploading",
                }
              : file,
          ),
        );
        if (progress >= 100) clearInterval(timer);
      }, 300);
    }
  }

  return (
    <FileUpload
      multiple
      onFiles={add}
      files={files}
      onRemove={(id) =>
        setFiles((current) => current.filter((file) => file.id !== id))
      }
      description="Anything, as many as you like"
    />
  );
}
