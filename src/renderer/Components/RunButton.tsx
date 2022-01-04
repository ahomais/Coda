// import { useEffect, useState } from "react";
import { Streams } from "renderer/App";

export default (_props: Streams) => {
	const run = () => {
		console.log("Yeheaw");
	};

	return (
		<button onClick={run}>
			<h1 className="text-right text-green-500">▶</h1>
		</button>
	);
};
