import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import EditorConsole from "./Components/EditorConsole";
import ProjectBar from "./Components/ProjectBar";
import Editor from "./editor";
import { BehaviorSubject } from "rxjs";

// type Props = {
// 	ConsoleStream: BehaviorSubject<string>;
// };

export type Streams = {
	ConsoleStream: BehaviorSubject<string>;
};

const ConsoleStream = new BehaviorSubject("");

export const startEditor = () => {
	Editor({ ConsoleStream });
};

const Hello = () => {
	return (
		<div id="layout">
			<ProjectBar />
			<div id="rete" className="h-screen" />
			<EditorConsole ConsoleStream={ConsoleStream} />
			<div className="dock" />
		</div>
	);
};

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Hello} />
			</Switch>
		</Router>
	);
}
