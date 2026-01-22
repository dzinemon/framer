import "./App.css";
import { FirstItem } from "./components/FirstItem";
import { FramerBasic } from "./components/FramerBasic";
import { FramerCards } from "./components/FramerCards";
import FramerPositon from "./components/FramerPosition";
import { FramerWrap } from "./components/FramerWrap";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
	return (
		<>
			<ThemeToggle />
			<FirstItem />
			<FramerBasic />
			<FramerCards />
			<FramerWrap />
			<FramerPositon />
		</>
	);
}

export default App;
