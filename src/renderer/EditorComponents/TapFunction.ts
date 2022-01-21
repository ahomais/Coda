import Rete, { Node } from "rete";
import { NodeData, WorkerOutputs } from "rete/types/core/data";
// import { isNumberArray } from "../../Utils/typeUtils";
import Sockets from "./Sockets";
import { BehaviorSubject, Subject } from "rxjs";
import { handleInputSubscriptions } from "Utils/typeUtils";
import { SubscriptionsMap, TypedInputs } from "typings/Types";

export default class TapFunction extends Rete.Component {
	public consoleStream;
	public subscriptions: SubscriptionsMap;
	public subject;

	constructor(ConsoleStream: BehaviorSubject<string>) {
		super("Tap");
		this.consoleStream = ConsoleStream;
		this.subscriptions = {};
		this.subject = new Subject();
	}

	// eslint-disable-next-line class-methods-use-this
	async builder(node: Node) {
		const input1 = new Rete.Input("num", "Number", Sockets.NumValue);
		const output = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addInput(input1).addOutput(output);
	}

	// eslint-disable-next-line class-methods-use-this
	worker(node: NodeData, inputs: TypedInputs, outputs: WorkerOutputs) {
		outputs.num = {
			name: node.id,
			data: inputs.num[0],
			observable: this.subject,
		};

		handleInputSubscriptions(inputs, "num", this.subscriptions, () => {
			// const input = inputs.num[0] as {
			// 	name: string;
			// 	observable: Observable<unknown> | Subject<unknown>;
			// };
			// console.log(input.);
			// this.consoleStream.next(input.data + "");
			// this.subject.next(input.data);
			// outputs.num = {
			// 	name: node.id,
			// 	data: input.data,
			// 	observable: this.subject,
			// };
		});

		// if (isNumberArray(inputs.num)) {
		// 	const number1: number = inputs.num.length ? inputs.num[0] : (node.data.num1 as number);

		// 	// eslint-disable-next-line no-console
		// 	console.log(number1);
		// 	this.consoleStream.next(number1 + "");

		// 	outputs.num = number1;
		// }
	}
}
