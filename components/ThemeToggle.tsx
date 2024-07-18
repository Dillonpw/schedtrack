'use client';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
const [mounted, setMounted] = useState(false);
const { setTheme, resolvedTheme } = useTheme();

useEffect(() => setMounted(true), []);

if (!mounted) return (
<MoonIcon />
  )

  if (resolvedTheme === 'dark') {
    return <SunIcon onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <MoonIcon onClick={() => setTheme('dark')} />
  }

}
export default ThemeToggle