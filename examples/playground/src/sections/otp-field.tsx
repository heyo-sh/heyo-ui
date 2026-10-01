import { OtpField, Text, toast } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { Example, Section, Stack } from "./section";

export function OtpFieldSection() {
  const [value, setValue] = useState("");

  return (
    <Section
      title="OTP Field"
      description="One box per character, paste-aware, with the caret moving itself. Fires onValueComplete the moment the last slot fills."
    >
      <Stack label="length + groupAfter" className="max-w-sm">
        <OtpField
          length={6}
          groupAfter={3}
          label="Verification code"
          description="We sent it to ada@acme.dev."
          onValueComplete={(code) => toast.success(`Verifying ${code}`)}
        />
      </Stack>

      <Example label="controlled">
        <OtpField length={4} value={value} onValueChange={setValue} />
        <Text size="sm" tone="subtle">
          value: “{value}”
        </Text>
      </Example>

      <Example label="size">
        <OtpField length={4} size="sm" aria-label="Small code" />
        <OtpField length={4} size="base" aria-label="Base code" />
      </Example>

      <Example label="mask / disabled">
        <OtpField length={4} mask defaultValue="1234" />
        <OtpField length={4} disabled defaultValue="12" />
      </Example>

      <Stack label="error" className="max-w-sm">
        <OtpField
          length={6}
          groupAfter={3}
          label="Verification code"
          error="That code has expired."
        />
      </Stack>
    </Section>
  );
}
