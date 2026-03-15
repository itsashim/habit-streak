import { useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        const stored = localStorage.getItem("theme");

        const isDark =
            stored === "dark" ||
            (!stored &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        return isDark;
    });

    function toggleTheme() {
        const next = !dark;

        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        setDark(next);
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg
                       bg-black text-white
                       dark:bg-white dark:text-black
                       transition hover:scale-110"
        >
            {dark ? "☀️" : "🌙"}
        </button>
    );
}
