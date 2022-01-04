import { useEffect, useState } from "react";
import { Streams } from "renderer/App";

export default (props: Streams) => {
	const [consoleText, setConsole] = useState("");

	//Subscribe to the Console stream, listen for updates, and set the console text accordingly
	useEffect(() => {
		const handleLog = (log: string) => {
			// console.log(log);
			// console.log(consoleText);
			setConsole(consoleText + "\n" + log);
		};
		const subscription = props.ConsoleStream.subscribe((newLog) => {
			handleLog(newLog);
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
