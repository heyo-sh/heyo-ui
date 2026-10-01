import { Avatar } from "@heyo-sh/heyo-ui";
import { UserIcon } from "../icons";
import { Example, Section } from "./section";

/** Inlined so the playground never depends on the network. */
const portrait =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="rgba(255,255,255,.85)"/><path d="M8 64c4-14 12-20 24-20s20 6 24 20z" fill="rgba(255,255,255,.85)"/></svg>`,
  );

export function AvatarSection() {
  return (
    <Section
      title="Avatar"
      description="Initials by default, an image when there is one, and a fallback that never shifts the layout. One radius, always — a circle reads as a social profile, and this is a console."
    >
      <Example label="name (initials)">
        <Avatar name="Grzegorz Piechnik" />
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" />
      </Example>

      <Example label="size">
        <Avatar size="xs" name="Ada Lovelace" />
        <Avatar size="sm" name="Ada Lovelace" />
        <Avatar size="base" name="Ada Lovelace" />
        <Avatar size="lg" name="Ada Lovelace" />
        <Avatar size="xl" name="Ada Lovelace" />
      </Example>

      <Example label="src">
        <Avatar src={portrait} alt="Ada Lovelace" name="Ada Lovelace" />
        <Avatar
          src={portrait}
          alt="Ada Lovelace"
          name="Ada Lovelace"
          size="lg"
        />
      </Example>

      <Example label="fallback">
        <Avatar fallback={<UserIcon className="size-4" />} />
        <Avatar src="/does-not-exist.png" name="Broken Image" />
      </Example>
    </Section>
  );
}
