import "./App.css";
import { FirstItem } from "./components/FirstItem";
import { FramerBasic } from "./components/FramerBasic";
import { FramerWrap } from "./components/FramerWrap";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
	return (
		<>
			<ThemeToggle />
			<FirstItem />
			<FramerBasic />
			<FramerWrap />
		</>
	);
}

export default App;
