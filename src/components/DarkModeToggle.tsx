import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={() => setDarkMode(prev => !prev)}
      aria-label="Toggle theme mode"
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
