import { Slider } from "@heyo-sh/heyo-ui";
import { Section, Stack } from "./section";

export function SliderSection() {
  return (
    <Section
      title="Slider"
      description="A value picker. Pass an array for a range — the extra thumbs are rendered for you."
    >
      <Stack label="label + showValue" className="max-w-sm">
        <Slider
          label="Memory"
          defaultValue={128}
          min={64}
          max={512}
          step={64}
          showValue
        />
      </Stack>

      <Stack label="description" className="max-w-sm">
        <Slider
          label="CPU limit"
          description="Milliseconds of CPU time per request."
          defaultValue={50}
          min={10}
          max={200}
          step={10}
          showValue
        />
      </Stack>

      <Stack label="range" className="max-w-sm">
        <Slider label="Price range" defaultValue={[20, 80]} showValue />
      </Stack>

      <Stack label="bare / disabled" className="max-w-sm">
        <Slider defaultValue={40} aria-label="Volume" />
        <Slider label="Disabled" defaultValue={30} showValue disabled />
      </Stack>
    </Section>
  );
}
