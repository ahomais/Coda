import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import BasicComponent from "../BasicComponent";

export default class PlayNoteComponent extends BasicComponent {
	constructor() {
		super("PlayNote");
	}

	async builder(node: Node) {
		const input = new Rete.Input("event", "Number", Sockets.NumValue);
		const out = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addInput(input).addOutput(out);
		//Push to timeline stream
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		node;
		inputs;

		console.log("yeehaw");

		//TODO in the future output will output note data ig, or tempo or smth
		outputs.num = 4000;
	}
}
