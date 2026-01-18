import "./App.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { FramerBasic } from "./components/FramerBasic";
import { FirstItem } from "./components/FirstItem";

function App() {
	return (
		<>
			<ThemeToggle />
			<FirstItem />
			<FramerBasic />
		</>
	);
}

export default App;
