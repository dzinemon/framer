import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => {
		const stored = localStorage.getItem("theme");
		return (stored as Theme) || "system";
	});

	useEffect(() => {
		const root = document.documentElement;

		const applyTheme = (selectedTheme: Theme) => {
			if (selectedTheme === "system") {
				const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
					.matches
					? "dark"
					: "light";
				root.setAttribute("data-theme", systemTheme);
			} else {
				root.setAttribute("data-theme", selectedTheme);
			}
		};

		applyTheme(theme);
		localStorage.setItem("theme", theme);

		// Listen for system theme changes when in system mode
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => applyTheme("system");

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	return { theme, setTheme };
}
