'use client';

import React from 'react';
import Link from 'next/link'
import * as Toggle from '@radix-ui/react-toggle';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex } from '@radix-ui/themes'

import useSettingsStore from '@/features/settings/settings.store'
import AccentColorDropdown from '@components/AccentColorDropdown/AccentColorDropdown'

const Header = () => {
  const settingsStore= useSettingsStore()

  return (
    <header className='flex flex-1 justify-center p-4 border-b border-[var(--gray-2)] dark:bg-black bg-[var(--accent-10)]'>
      <Container className="mx-auto">
        <div className='flex flex-row items-center justify-between'>
          {/* Title */}
          <Link href='/'><h1 className="text-xl font-semibold">Car Management Dashboard</h1></Link>

          <div className='flex flex-row gap-4 items-center'>
            <AccentColorDropdown />

            {/* Theme Switcher */}
            <Toggle.Root
              className="flex items-center justify-center p-2 rounded-full hover:bg-[var(--accent-8)] dark:hover:bg-[var(--accent-5)] focus:outline-none cursor-pointer"
              pressed={settingsStore.theme === 'dark'}
              onPressedChange={() => settingsStore.toggleTheme()}
              aria-label="Toggle theme"
            >
              {settingsStore.theme === 'dark' ? (
                <SunIcon className="text-[var(--accent-10)] w-5 h-5" />
              ) : (
                <MoonIcon className="text-black w-5 h-5" />
              )}
            </Toggle.Root>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;