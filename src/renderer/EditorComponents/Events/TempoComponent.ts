import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import { interval, share } from "rxjs";
import BasicComponent from "../BasicComponent";

export default class TempoComponent extends BasicComponent {
	public interval;
	public process;

	constructor(engineProcessor: () => {}) {
		super("Tempo");
		this.process = engineProcessor;
		this.interval = interval(4000).pipe(share());
	}

	async builder(node: Node) {
		const out = new Rete.Output("observable", "Observable", Sockets.ObservableValue);
		node.addOutput(out);

		// this.interval.subscribe(() => {
		// 	if (this.editor) {
		// 		this.process();
		// 		// this.engine.process(this.editor.toJSON());
		// 	}
		// });
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		node;
		inputs;

		outputs.observable = {
			name: node.id,
			data: this.interval,
		};
	}
}
