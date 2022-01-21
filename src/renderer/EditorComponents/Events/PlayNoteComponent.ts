import Rete, { Node } from "rete";
import { NodeData, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import BasicComponent from "../BasicComponent";
import * as Tone from "tone";
import { handleInputSubscriptions, isNumberArray } from "Utils/typeUtils";
import { Subject, Subscription } from "rxjs";
import { TypedInputs } from "typings/Types";

export default class PlayNoteComponent extends BasicComponent {
	public synth;
	public subscriptions: { [name: string]: Subscription };
	public subject;

	constructor() {
		super("PlayNote");
		this.synth = new Tone.Synth().toDestination();
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

		console.log(inputs.observable);

		this.subscriptions = handleInputSubscriptions(inputs, "observable", this.subscriptions, () => {
			const input = inputs.observable[0];

			if (!this.subscriptions[input.name]) {
				this.subscriptions[input.name] = input.observable.subscribe(() => {
					this.synth.triggerAttackRelease("C4", "8n");
					this.subject.next("C4");
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

		if (isNumberArray(inputs.event)) {
			if (inputs.event.length == 0) {
				return;
			}

			this.synth.triggerAttackRelease("C4", "8n");
			console.log("yeehaw");

			//TODO in the future output will output note data ig, or tempo or smth
			// outputs.num = 4000;
			outputs.num = {
				name: node.id,
				data: 4000,
				observable: this.subject,
			};
		}
	}
}
