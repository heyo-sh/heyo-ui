"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type DragEvent,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { renderIcon, type IconLike } from "../lib/icon-slot";
import { FileIcon, UploadIcon, XIcon } from "../lib/icons";
import { Meter } from "./meter";
import { Spinner } from "./spinner";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  /** `undefined` means "not tracking progress" — no bar is drawn. */
  progress?: number;
  error?: ReactNode;
  status?: "pending" | "uploading" | "done" | "error";
}

export interface FileUploadProps extends Omit<
  ComponentProps<"div">,
  "onChange" | "onDrop"
> {
  /** Fires with everything accepted, for both drop and picker. */
  onFiles?: (files: File[]) => void;
  /** `accept` for the hidden input, e.g. `"image/*,.pdf"`. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Rejects anything larger, in bytes, before `onFiles` sees it. */
  maxSize?: number;
  icon?: IconLike;
  /** Headline inside the zone. */
  label?: ReactNode;
  /** Second line — formats, size limits. */
  description?: ReactNode;
  /** Render the list of files yourself, or hand them over and let it. */
  files?: UploadedFile[];
  onRemove?: (id: string) => void;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["kB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}

/**
 * A drop zone that is also a button.
 *
 * Both, always: drag and drop is undiscoverable on its own and impossible on a
 * phone, so the whole zone is a `<label>` for a hidden file input — one element,
 * keyboard-focusable, no JS needed for the click path.
 *
 * ```tsx
 * <FileUpload accept="image/*" multiple onFiles={upload} files={files} onRemove={cancel} />
 * ```
 */
export function FileUpload({
  className,
  onFiles,
  accept,
  multiple,
  disabled,
  maxSize,
  icon = UploadIcon,
  label = "Drop files here, or click to browse",
  description,
  files,
  onRemove,
  ...props
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  // Drag events fire for every child element; a counter is the only reliable
  // way to know when the pointer has actually left the zone.
  const depth = useRef(0);

  function accepted(list: FileList | null): File[] {
    if (!list) return [];
    const all = [...list];
    const sized = maxSize ? all.filter((file) => file.size <= maxSize) : all;
    return multiple ? sized : sized.slice(0, 1);
  }

  function onDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    depth.current = 0;
    setDragging(false);
    if (disabled) return;
    const next = accepted(event.dataTransfer.files);
    if (next.length) onFiles?.(next);
  }

  return (
    <div
      data-slot="file-upload"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    >
      <label
        htmlFor={inputId}
        data-slot="file-upload-zone"
        data-dragging={dragging ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        onDragEnter={(event) => {
          event.preventDefault();
          depth.current += 1;
          if (!disabled) setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          depth.current -= 1;
          if (depth.current <= 0) setDragging(false);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-1.5",
          "rounded-lg border border-dashed border-heyo-line bg-heyo-elevated px-4 py-8 text-center",
          "transition-colors duration-100 ease-heyo",
          "hover:bg-heyo-tint",
          "data-dragging:border-heyo-focus data-dragging:bg-heyo-brand-tint",
          "has-focus-visible:outline-1 has-focus-visible:outline-offset-2 has-focus-visible:outline-heyo-focus",
          "data-disabled:pointer-events-none data-disabled:opacity-60",
        )}
      >
        <span className="size-5 text-heyo-subtle">
          {renderIcon(icon, "size-full")}
        </span>
        <span className="text-sm font-medium text-heyo-default">{label}</span>
        {description ? (
          <span className="text-xs text-heyo-subtle">{description}</span>
        ) : null}
        {!description && maxSize ? (
          <span className="text-xs text-heyo-subtle">
            Up to {formatBytes(maxSize)}
          </span>
        ) : null}

        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => {
            const next = accepted(event.target.files);
            if (next.length) onFiles?.(next);
            // Reset, or picking the same file twice in a row fires nothing.
            event.target.value = "";
          }}
        />
      </label>

      {files && files.length > 0 ? (
        <ul className="flex list-none flex-col gap-1.5">
          {files.map((file) => (
            <FileUploadItem key={file.id} file={file} onRemove={onRemove} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FileUploadItem({
  file,
  onRemove,
}: {
  file: UploadedFile;
  onRemove?: (id: string) => void;
}) {
  const uploading = file.status === "uploading";
  const failed = file.status === "error" || Boolean(file.error);

  return (
    <li
      data-slot="file-upload-item"
      className={cn(
        "flex items-center gap-2.5 rounded-lg bg-heyo-base px-3 py-2 ring-1 ring-heyo-hairline",
        failed && "ring-heyo-danger",
      )}
    >
      <span className="size-4 shrink-0 text-heyo-subtle">
        {uploading ? (
          <Spinner size="base" />
        ) : (
          <FileIcon className="size-full" />
        )}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="min-w-0 flex-1 truncate text-sm text-heyo-default">
            {file.name}
          </span>
          <span className="shrink-0 text-xs tabular-nums text-heyo-subtle">
            {formatBytes(file.size)}
          </span>
        </div>

        {failed ? (
          <span className="text-xs text-heyo-danger">
            {file.error ?? "Upload failed"}
          </span>
        ) : file.progress !== undefined && file.status !== "done" ? (
          <Meter
            value={file.progress}
            size="sm"
            tone="brand"
            aria-label={`Uploading ${file.name}`}
          />
        ) : null}
      </div>

      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${file.name}`}
          onClick={() => onRemove(file.id)}
          className={cn(
            "shrink-0 cursor-pointer rounded-sm p-1 text-heyo-subtle",
            "transition-colors hover:bg-heyo-tint hover:text-heyo-default heyo-focus",
          )}
        >
          <XIcon className="size-3.5" />
        </button>
      ) : null}
    </li>
  );
}

FileUpload.Item = FileUploadItem;
