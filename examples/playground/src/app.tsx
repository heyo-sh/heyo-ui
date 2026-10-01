import {
  Badge,
  Button,
  Command,
  Heading,
  Input,
  Sidebar,
  Text,
  Toaster,
  Tooltip,
  type CommandItem,
} from "@heyo-sh/heyo-ui";
import { useMemo, useState } from "react";
import { MoonIcon, SearchIcon, SunIcon } from "./icons";
import { sectionGroups, sections } from "./sections";

export function App() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(sections[0]!.id);
  const [closedGroups, setClosedGroups] = useState<string[]>([]);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return sectionGroups;
    return sectionGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  function toggleMode() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-mode", next ? "dark" : "light");
  }

  /** The palette searches the same registry the sidebar renders. */
  const commands = useMemo<CommandItem[]>(
    () => [
      ...sectionGroups.flatMap((group) =>
        group.items.map((item) => ({
          value: item.id,
          label: item.name,
          group: group.label,
          icon: item.icon,
          onSelect: () => {
            setActive(item.id);
            document
              .getElementById(item.id)
              ?.scrollIntoView({ behavior: "smooth" });
          },
        })),
      ),
      {
        value: "toggle-mode",
        label: dark ? "Switch to light mode" : "Switch to dark mode",
        group: "Theme",
        icon: dark ? SunIcon : MoonIcon,
        onSelect: toggleMode,
      },
    ],
    [dark],
  );

  return (
    <Tooltip.Provider>
      <Sidebar.Provider defaultOpen>
        <Sidebar>
          <Sidebar.Header>
            <div className="flex items-center gap-2 px-1 py-0.5">
              <div className="grid size-6 shrink-0 place-items-center rounded-md bg-heyo-contrast text-heyo-inverse">
                <span className="font-mono text-[11px] font-semibold">h</span>
              </div>
              <Sidebar.Label className="text-sm font-medium text-heyo-strong">
                heyo-ui
              </Sidebar.Label>
              <Sidebar.Trigger className="ml-auto" />
            </div>
            <Input
              size="sm"
              icon={SearchIcon}
              placeholder="Filter components…"
              aria-label="Filter components"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="group-data-[state=collapsed]/sidebar:hidden"
            />
          </Sidebar.Header>

          <Sidebar.Content>
            {matches.map((group) => (
              <Sidebar.Group key={group.label}>
                <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.Collapsible
                      open={
                        query.trim().length > 0 ||
                        !closedGroups.includes(group.label)
                      }
                      onOpenChange={(open) =>
                        setClosedGroups((current) =>
                          open
                            ? current.filter((label) => label !== group.label)
                            : [...current, group.label],
                        )
                      }
                    >
                      <Sidebar.CollapsibleTrigger
                        render={
                          <Sidebar.MenuButton unwrapped icon={group.icon}>
                            {group.label}
                            <Sidebar.MenuBadge>
                              {group.items.length}
                            </Sidebar.MenuBadge>
                            <Sidebar.MenuChevron />
                          </Sidebar.MenuButton>
                        }
                      />
                      <Sidebar.CollapsibleContent>
                        <Sidebar.MenuSub>
                          {group.items.map((item) => (
                            <Sidebar.MenuSubButton
                              key={item.id}
                              icon={item.icon}
                              active={active === item.id}
                              onClick={() => setActive(item.id)}
                              render={<a href={`#${item.id}`} />}
                            >
                              {item.name}
                            </Sidebar.MenuSubButton>
                          ))}
                        </Sidebar.MenuSub>
                      </Sidebar.CollapsibleContent>
                    </Sidebar.Collapsible>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Group>
            ))}

            {matches.length === 0 ? (
              <div className="px-2 py-3">
                <Text size="sm" tone="subtle">
                  Nothing matches “{query}”.
                </Text>
              </div>
            ) : null}
          </Sidebar.Content>

          <Sidebar.Footer>
            <Sidebar.Menu>
              <Sidebar.MenuButton
                icon={dark ? SunIcon : MoonIcon}
                onClick={toggleMode}
              >
                {dark ? "Light mode" : "Dark mode"}
              </Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.Footer>
          <Sidebar.Rail />
        </Sidebar>

        <Sidebar.Inset>
          <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center gap-3 border-b border-heyo-hairline bg-heyo-canvas/85 px-5 backdrop-blur">
            <Heading level={4}>Components</Heading>
            <Badge variant="outline" size="sm">
              {sections.length} components
            </Badge>
            <div className="ml-auto flex items-center gap-2">
              <Command
                items={commands}
                placeholder="Jump to a component…"
                trigger={
                  <Button size="sm" variant="outline" icon={SearchIcon}>
                    Search
                    <Command.Shortcut keys="mod+k" className="ml-1" />
                  </Button>
                }
              />
              <Button
                size="sm"
                variant="ghost"
                icon={dark ? SunIcon : MoonIcon}
                onClick={toggleMode}
              >
                {dark ? "Light" : "Dark"}
              </Button>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-5 py-8">
            {sections.map(({ id, Component }) => (
              <Component key={id} />
            ))}
          </div>
        </Sidebar.Inset>
      </Sidebar.Provider>
      <Toaster />
    </Tooltip.Provider>
  );
}
