import { Pagination } from "@heyo-sh/heyo-ui";
import { useState } from "react";
import { Section, Stack } from "./section";

export function PaginationSection() {
  const [page, setPage] = useState(3);
  const [compactPage, setCompactPage] = useState(1);
  const [widePage, setWidePage] = useState(8);

  return (
    <Section
      title="Pagination"
      description="Prev, next, and just enough numbers around the current page."
    >
      <Stack label="page / pageCount">
        <Pagination page={page} pageCount={12} onPageChange={setPage} />
      </Stack>

      <Stack label="siblings={2}">
        <Pagination
          page={widePage}
          pageCount={24}
          siblings={2}
          onPageChange={setWidePage}
        />
      </Stack>

      <Stack label="compact">
        <Pagination
          compact
          page={compactPage}
          pageCount={9}
          onPageChange={setCompactPage}
        />
      </Stack>

      <Stack label="single page">
        <Pagination page={1} pageCount={1} onPageChange={() => {}} />
      </Stack>
    </Section>
  );
}
