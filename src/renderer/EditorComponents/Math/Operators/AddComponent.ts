import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../../Sockets";
import { isNumberArray } from "../../../../Utils/typeUtils";

export default class AddOperatorComponent extends Rete.Component {
	constructor() {
		super("Add");
	}

	// eslint-disable-next-line class-methods-use-this
	async builder(node: Node) {
		const input1 = new Rete.Input("num", "Number", Sockets.NumValue);
		const input2 = new Rete.Input("num2", "Number2", Sockets.NumValue);
		const output = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addInput(input1).addInput(input2).addOutput(output);
	}

	// eslint-disable-next-line class-methods-use-this
	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		if (isNumberArray(inputs.num) && isNumberArray(inputs.num2)) {
			const number1: number = inputs.num.length ? inputs.num[0] : (node.data.num1 as number);
			const number2: number = inputs.num2.length ? inputs.num2[0] : (node.data.num2 as number);

			const sum = number1 + number2;
			outputs.num = sum;
		}
	}
}
