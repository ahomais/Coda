import { Component, Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export default abstract class BasicComponent extends Component {
	private activated;
	constructor(name: string) {
		super(name);
		this.activated = false;
	}
	// abstract async builder(_node: Node){}
	abstract builder(node: Node): Promise<void>;
	abstract worker(node: NodeData, inputs: WorkerInputs, Outputs: WorkerOutputs): void;
}
