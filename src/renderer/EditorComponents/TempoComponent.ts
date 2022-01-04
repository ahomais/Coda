import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "./Sockets";
import { interval } from "rxjs";

export default class TempoComponent extends Rete.Component {
	public interval;
	public process;

	constructor(engineProcessor: () => {}) {
		super("Tempo");
		this.process = engineProcessor;
		this.interval = interval(4000);
	}

	async builder(node: Node) {
		const out = new Rete.Output("num", "Number", Sockets.NumValue);
		node.addOutput(out);
		console.log("setup");

		this.interval.subscribe(() => {
			if (this.editor) {
				this.process();
				// this.engine.process(this.editor.toJSON());
			}
		});
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		node;
		inputs;
		outputs.num = 4000;
	}
}
