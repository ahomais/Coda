import { Component, Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export default abstract class BasicComponent extends Component {
	constructor(name: string) {
		super(name);
	}
	// abstract async builder(_node: Node){}
	abstract builder(node: Node): Promise<void>;
	abstract worker(node: NodeData, inputs: WorkerInputs, Outputs: WorkerOutputs): void;
}
