// import React from "react";
import { useEffect, useState } from "react";
import { Streams } from "renderer/App";

// class EditorConsole extends React.Component<{ props: Streams }> {
// 	render() {
// 		return (
// 			<div className="absolute right-3 bottom-5 w-1/4 h-1/2 bg-gray-800 opacity-50 rounded-lg">
// 				<div className="break-words text-white px-3 my-2 font-mono">{}</div>
// 			</div>
// 		);
// 	}
// }

export default (props: Streams) => {
	const [consoleText, setConsole] = useState("");

	//Subscribe to the Console stream, listen for updates, and set the console text accordingly
	useEffect(() => {
		// const handleLog = (log: string) => {
		// 	// console.log(log);
		// 	// console.log(consoleText);
		// 	setConsole(consoleText + "\n" + log);
		// };
		const subscription = props.ConsoleStream.subscribe((newLog) => {
			setConsole(consoleText + "\n" + newLog);
			// handleLog(newLog);
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<div className="absolute right-3 bottom-5 w-1/4 h-1/2 bg-gray-800 opacity-50 rounded-lg">
			<div className="break-words text-white px-3 my-2 font-mono">{consoleText}</div>
		</div>
	);
};
