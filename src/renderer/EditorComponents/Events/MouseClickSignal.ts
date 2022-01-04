import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import { fromEvent, map } from "rxjs";

export default class MouseClickSignal extends Rete.Component {
	public mouseClickStream;
	public xCord;
	public process;

	constructor(engineProcessor: () => {}) {
		super("MouseClick");
		this.mouseClickStream = fromEvent<MouseEvent>(document, "mousedown").pipe(map((event) => event.clientX));
		this.xCord = 0;
		this.process = engineProcessor;
	}

	async builder(node: Node) {
		const out = new Rete.Output("num", "Number", Sockets.NumValue);
		node.addOutput(out);
		console.log("setup");

		this.mouseClickStream.subscribe((xCord) => {
			this.xCord = xCord;
			if (this.editor) {
				this.process();
			}
		});
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		node;
		inputs;
		outputs.num = this.xCord;
	}
}
