import { render } from "react-dom";
import App, { startEditor } from "./App";
// import Editor from "./editor";
// import { BehaviorSubject } from "rxjs";

// const ConsoleStream = new BehaviorSubject("");

render(<App />, document.getElementById("root"));

startEditor();

// Editor();
