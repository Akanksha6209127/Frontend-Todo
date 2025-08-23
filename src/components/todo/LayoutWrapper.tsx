
"use client";

import { useTheme } from "@/components/ui/themeContext";
import {NotebookPenIcon , Moon,  Sun } from "lucide-react";


import LogoutButton from "@/components/logout";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="w-full sticky top-0 z-10 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="mx-auto container px-4 py-4 flex items-center justify-between">
          <h1 className="  flex gap-4 text-xl md:text-2xl font-bold tracking-tight">
            <NotebookPenIcon className="h-6 w-6 text-primary" />
            What to do...?
          </h1>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-gray-200 hover:bg-gray-300 
                dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Logout */}
            
              <LogoutButton  />
            
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full mx-auto container px-4 md:px-8 py-6 grid gap-6 animate-fadeIn">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>Made with  by  • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
