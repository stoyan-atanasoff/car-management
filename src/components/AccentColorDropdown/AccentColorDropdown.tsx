'use client';

import React from "react";
import { DotFilledIcon, Half2Icon } from '@radix-ui/react-icons'

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AccentColor, accentColor } from '@/types/AccentColor'
import useSettingsStore from '@/features/settings/settings.store'
import "./styles.css";

const AccentColorDropdown = () => {
  const [person, setPerson] = React.useState("pedro");
  const settingsStore = useSettingsStore();

  const colorClasses = accentColor.reduce((acc, color) => {
    acc[color] = `var(--${color}-10)`;
    return acc;
  }, {} as Record<string, string>);

  const handleChange = (color: AccentColor) => {
    settingsStore.setAccent(color as AccentColor);
    localStorage.setItem('accentColor', color);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-[var(--accent-8)] dark:hover:bg-[var(--accent-5)] focus:outline-none cursor-pointer" aria-label="Customise options" >
          <Half2Icon className='dark:text-[var(--accent-10)]' />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent bg-white dark:bg-black" sideOffset={5}>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            {accentColor.map((color) => (
              <DropdownMenu.RadioItem key={color} value={color} className='DropdownMenuRadioItem' onClick={() => handleChange(color as AccentColor)}>
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                <span style={{ color: colorClasses[color] }}>{color}</span>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
};

export default AccentColorDropdown;
