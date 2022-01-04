import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
// import { isNumberArray } from "../../Utils/typeUtils";
import Sockets from "./Sockets";
import { BehaviorSubject } from "rxjs";
import { isNumberArray } from "Utils/typeUtils";

export default class TapFunction extends Rete.Component {
	public consoleStream;
	constructor(ConsoleStream: BehaviorSubject<string>) {
		super("Tap");
		this.consoleStream = ConsoleStream;
	}

	// eslint-disable-next-line class-methods-use-this
	async builder(node: Node) {
		const input1 = new Rete.Input("num", "Number", Sockets.NumValue);
		const output = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addInput(input1).addOutput(output);
	}

	// eslint-disable-next-line class-methods-use-this
	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		if (isNumberArray(inputs.num)) {
			const number1: number = inputs.num.length ? inputs.num[0] : (node.data.num1 as number);

			// eslint-disable-next-line no-console
			console.log(number1);
			this.consoleStream.next(number1 + "");

			outputs.num = number1;
		}
	}
}
