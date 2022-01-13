/* eslint-disable no-undef-init */
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
// import ReactRenderPlugin from './RenderPlugin';
import ReactRenderPlugin from "rete-react-render-plugin";
import DockPlugin from "rete-dock-plugin";
import AddOperatorComponent from "./EditorComponents/Math/Operators/AddComponent";
import NumComponent from "./EditorComponents/NumComponent";
import TapFunction from "./EditorComponents/TapFunction";
import { Streams } from "./App";
import TempoComponent from "./EditorComponents/TempoComponent";
import MouseClickSignal from "./EditorComponents/Events/MouseClickSignal";
import PlayNoteComponent from "./EditorComponents/Events/PlayNoteComponent";

const options: () => undefined = () => {
	return {
		container: document.querySelector(".dock"),
		itemClass: "item",
		plugins: [ReactRenderPlugin],
	} as unknown as undefined;
};

export default async (streams: Streams) => {
	// eslint-disable-next-line prefer-const
	const container: HTMLElement | null = document.querySelector("#rete");
	// eslint-disable-next-line no-console
	console.log(container);

	if (!container) return;

	const editor = new Rete.NodeEditor("demo@0.1.0", container);
	editor.use(ConnectionPlugin);
	editor.use(ReactRenderPlugin);
	editor.use(DockPlugin, options());

	const engine = new Rete.Engine("demo@0.1.0");

	const engineProcessing = async () => {
		console.log("Engine Processing");
		await engine.abort();
		await engine.process(editor.toJSON());
	};

	const components = [
		new NumComponent(),
		new AddOperatorComponent(),
		new TapFunction(streams.ConsoleStream),
		new TempoComponent(engineProcessing),
		new MouseClickSignal(engineProcessing),
		new PlayNoteComponent(),
	];

	components.forEach((c) => {
		editor.register(c);
		engine.register(c);
	});

	const node1 = await components[0].createNode({ num: 2 });
	node1.position = [80, 200];

	const node2 = await components[0].createNode({ num: 2 });
	node2.position = [80, 400];

	const node3 = await components[1].createNode();
	node3.position = [300, 400];

	const node4 = await components[2].createNode();
	node4.position = [400, 400];

	editor.addNode(node1);
	editor.addNode(node2);
	editor.addNode(node3);
	editor.addNode(node4);

	editor.on("process", engineProcessing);
	editor.on("nodecreated", engineProcessing);
	editor.on("noderemoved", engineProcessing);
	editor.on("connectioncreated", engineProcessing);
	editor.on("connectionremoved", engineProcessing);
	editor.on("updateconnection", () => {
		console.log(editor.toJSON());
	});


	// editor.view.resize();
	// editor.trigger('process');
};
