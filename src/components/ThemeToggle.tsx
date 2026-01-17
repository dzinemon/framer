import { useTheme } from "../hooks/useTheme";
import "./ThemeToggle.css";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const themes = [
		{ value: "light" as const, icon: "☀️", label: "Light" },
		{ value: "dark" as const, icon: "🌙", label: "Dark" },
		{ value: "system" as const, icon: "💻", label: "System" },
	];

	const currentTheme = themes.find((t) => t.value === theme);

	return (
		<div className="theme-toggle">
			<div className="theme-select-wrapper">
				<div className="theme-select-display">
					<span className="theme-icon">{currentTheme?.icon}</span>
					<span className="theme-label">{currentTheme?.label}</span>
					<span className="theme-arrow">▼</span>
				</div>
				<select
					value={theme}
					onChange={(e) => setTheme(e.target.value as typeof theme)}
					className="theme-select"
					aria-label="Select theme"
				>
					{themes.map(({ value, icon, label }) => (
						<option key={value} value={value}>
							{icon} {label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
