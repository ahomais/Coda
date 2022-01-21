import Rete, { Node } from "rete";
import { NodeData, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import BasicComponent from "../BasicComponent";
import * as Tone from "tone";
import { handleInputSubscriptions } from "Utils/typeUtils";
import { Subject, Subscription } from "rxjs";
import { TypedInputs } from "typings/Types";

export default class PlayNoteComponent extends BasicComponent {
	public osc;
	public subscriptions: { [name: string]: Subscription };
	public subject;

	constructor() {
		super("PlaySignal");
		this.osc = new Tone.Oscillator().toDestination();
		this.subscriptions = {};
		this.subject = new Subject();
	}

	async builder(node: Node) {
		const input = new Rete.Input("num", "Number", Sockets.NumValue);
		const observableInput = new Rete.Input("observable", "Observable", Sockets.ObservableValue);
		const out = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addInput(input).addInput(observableInput).addOutput(out);

		//Push to timeline stream
	}

	worker(node: NodeData, inputs: TypedInputs, outputs: WorkerOutputs) {
		node;
		inputs;

		outputs.num = {
			name: node.id,
			data: 4000,
			observable: this.subject,
		};

		this.subscriptions = handleInputSubscriptions(inputs, "observable", this.subscriptions, () => {
			const input = inputs.observable[0];

			if (!this.subscriptions[input.name]) {
				this.subscriptions[input.name] = input.observable.subscribe(() => {
					const signal = new Tone.Signal({
						value: "C4",
						units: "frequency",
					}).connect(this.osc.frequency);
					this.osc.start();
					signal.rampTo("C2", 2, "+0");
					this.subject.next("C2");
				});
			}
		});

		// //Check if inputs.observable is not empty
		// if (inputs.observable.length != 0) {
		// 	//Subscribe to the input node;
		// 	const observable = inputs.observable[0] as { name: string; data: Observable<any> };

		// 	if (!this.subscriptions[observable.name]) {
		// 		this.subscriptions[observable.name] = observable.data.subscribe(() => {
		// 			this.synth.triggerAttackRelease("C4", "8n");
		// 			this.subject.next("C4");
		// 		});
		// 	}
		// } else {
		// 	// If there is no inputs for inputs.observable
		// 	//Unsubscribe from subscriptions because there are no nodes to listen to
		// 	Object.values(this.subscriptions).forEach((subscription) => {
		// 		subscription.unsubscribe();
		// 	});
		// 	this.subscriptions = {};
		// }
	}
}
