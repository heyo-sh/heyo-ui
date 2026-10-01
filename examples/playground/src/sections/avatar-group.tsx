import { Avatar } from "@heyo-sh/heyo-ui";
import { Example, Section } from "./section";

const team = [
  "Ada Lovelace",
  "Alan Turing",
  "Grace Hopper",
  "Ken Thompson",
  "Barbara Liskov",
];

export function AvatarGroupSection() {
  return (
    <Section
      title="Avatar Group"
      description="An overlapping stack. Anything past max collapses into a +N chip."
    >
      <Example label="max={3}">
        <Avatar.Group max={3}>
          {team.map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </Avatar.Group>
      </Example>

      <Example label="no max">
        <Avatar.Group>
          {team.slice(0, 3).map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </Avatar.Group>
      </Example>

      <Example label="size">
        <Avatar.Group max={4}>
          {team.map((name) => (
            <Avatar key={name} size="sm" name={name} />
          ))}
        </Avatar.Group>
        <Avatar.Group max={4}>
          {team.map((name) => (
            <Avatar key={name} size="lg" name={name} />
          ))}
        </Avatar.Group>
      </Example>

      <Example label="max={5} (nothing collapses)">
        <Avatar.Group max={5}>
          {team.map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </Avatar.Group>
      </Example>
    </Section>
  );
}
