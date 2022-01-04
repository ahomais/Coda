/* eslint-disable class-methods-use-this */
import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "./Sockets";

export default class NumComponent extends Rete.Component {
	constructor() {
		super("Number");
	}

	async builder(node: Node) {
		const out = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addOutput(out);
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		inputs;
		outputs["num"] = node.data.num;
	}
}
