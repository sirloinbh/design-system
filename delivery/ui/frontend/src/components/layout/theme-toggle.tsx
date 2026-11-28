import { useState } from 'react';

import { DarkModeIcon, LightModeIcon, SystemModeIcon } from '../../lib/icons';
import { applyTheme, readTheme, type ThemeChoice } from '../../lib/theme';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const LABELS: Record<ThemeChoice, string> = { system: 'System', light: 'Light', dark: 'Dark' };
const ICONS = { system: SystemModeIcon, light: LightModeIcon, dark: DarkModeIcon };

function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>(readTheme);
  const Icon = ICONS[choice];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Theme: ${LABELS[choice]}`}>
          <Icon aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={choice}
          onValueChange={(value) => {
            const next = value as ThemeChoice;
            applyTheme(next);
            setChoice(next);
          }}
        >
          {(Object.keys(LABELS) as ThemeChoice[]).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {LABELS[key]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ThemeToggle };
