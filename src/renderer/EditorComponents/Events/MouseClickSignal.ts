import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import { fromEvent, map } from "rxjs";

export default class MouseClickSignal extends Rete.Component {
	public mouseClickStream;
	public xCordinate;
	public process;

	constructor(engineProcessor: () => {}) {
		super("MouseClick");
		this.mouseClickStream = fromEvent<MouseEvent>(document, "mousedown").pipe(
			map((event) => {
				event.clientX, event.clientY;
			}),
		
		);
		this.xCordinate = 0;
		this.process = engineProcessor;
	}

	async builder(node: Node) {
		node.addOutput(new Rete.Output("observable", "Observable", Sockets.ObservableValue));
		// this.mouseClickStream.subscribe((xCordinate) => {
		// 	this.xCordinate = xCordinate;
		// 	if (this.editor) {
		// 		this.process();
		// 	}
		// });
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		node;
		inputs;

		outputs.observable = {
			name: node.id,
			data: this.mouseClickStream,
		};
	}
}
