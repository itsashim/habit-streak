import { Moon, Sun } from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";

export default function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    
    // We check resolvedAppearance here safely
    const isDark = resolvedAppearance === 'dark';

    function toggleTheme() {
        updateAppearance(isDark ? 'light' : 'dark');
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg 
                       bg-black text-white 
                       dark:bg-white dark:text-black 
                       transition hover:scale-110 flex items-center justify-center 
                       h-12 w-12"
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}
