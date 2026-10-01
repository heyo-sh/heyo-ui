import { Toggle, ToggleGroup } from "@heyo-sh/heyo-ui";
import {
  BoldIcon,
  ColumnsIcon,
  GridIcon,
  ItalicIcon,
  ListIcon,
  UnderlineIcon,
} from "../icons";
import { Example, Section, Stack } from "./section";

export function ToggleGroupSection() {
  return (
    <Section
      title="Toggle Group"
      description="A set of toggles sharing one value. Single-choice by default; pass multiple for checkbox semantics."
    >
      <Example label="single choice">
        <ToggleGroup defaultValue={["grid"]}>
          <Toggle value="grid" variant="outline">
            Grid
          </Toggle>
          <Toggle value="list" variant="outline">
            List
          </Toggle>
          <Toggle value="board" variant="outline">
            Board
          </Toggle>
        </ToggleGroup>
      </Example>

      <Example label="attached">
        <ToggleGroup defaultValue={["grid"]} attached>
          <Toggle value="grid" variant="outline">
            Grid
          </Toggle>
          <Toggle value="list" variant="outline">
            List
          </Toggle>
          <Toggle value="board" variant="outline">
            Board
          </Toggle>
        </ToggleGroup>
      </Example>

      <Example label="attached + icons">
        <ToggleGroup defaultValue={["grid"]} attached>
          <Toggle
            value="grid"
            variant="outline"
            icon={GridIcon}
            aria-label="Grid"
          />
          <Toggle
            value="list"
            variant="outline"
            icon={ListIcon}
            aria-label="List"
          />
          <Toggle
            value="columns"
            variant="outline"
            icon={ColumnsIcon}
            aria-label="Columns"
          />
        </ToggleGroup>
        <ToggleGroup multiple defaultValue={["bold"]} attached>
          <Toggle
            value="bold"
            variant="outline"
            icon={BoldIcon}
            aria-label="Bold"
          />
          <Toggle
            value="italic"
            variant="outline"
            icon={ItalicIcon}
            aria-label="Italic"
          />
          <Toggle
            value="underline"
            variant="outline"
            icon={UnderlineIcon}
            aria-label="Underline"
          />
        </ToggleGroup>
      </Example>

      <Example label="equal (matching widths)">
        <ToggleGroup defaultValue={["24h"]} attached equal className="w-64">
          <Toggle value="1h" variant="outline">
            1h
          </Toggle>
          <Toggle value="24h" variant="outline">
            24h
          </Toggle>
          <Toggle value="7d" variant="outline">
            7 days
          </Toggle>
        </ToggleGroup>
      </Example>

      <Stack label='orientation="vertical"' className="max-w-40">
        <ToggleGroup defaultValue={["list"]} orientation="vertical" attached>
          <Toggle value="grid" variant="outline">
            Grid
          </Toggle>
          <Toggle value="list" variant="outline">
            List
          </Toggle>
          <Toggle value="board" variant="outline">
            Board
          </Toggle>
        </ToggleGroup>
      </Stack>

      <Example label="disabled">
        <ToggleGroup defaultValue={["grid"]} disabled attached>
          <Toggle value="grid" variant="outline">
            Grid
          </Toggle>
          <Toggle value="list" variant="outline">
            List
          </Toggle>
        </ToggleGroup>
      </Example>
    </Section>
  );
}
