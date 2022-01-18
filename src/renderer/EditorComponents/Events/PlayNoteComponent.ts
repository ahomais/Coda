import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import BasicComponent from "../BasicComponent";
import * as Tone from "tone";
import { isNumberArray } from "Utils/typeUtils";
import { Observable, Subscription } from "rxjs";

export default class PlayNoteComponent extends BasicComponent {
	public synth;
	public subscriptions: { [name: string]: Subscription };
	constructor() {
		super("PlayNote");
		this.synth = new Tone.Synth().toDestination();
		this.subscriptions = {};
	}

	async builder(node: Node) {
		const input = new Rete.Input("num", "Number", Sockets.NumValue);
		const observableInput = new Rete.Input("observable", "Observable", Sockets.ObservableValue);

		const out = new Rete.Output("num", "Number", Sockets.NumValue);

		node.addInput(input).addInput(observableInput).addOutput(out);

		//Push to timeline stream
	}

	worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
		node;
		inputs;

		console.log(inputs.observable);

		//Check if inputs.observable is not empty
		if (inputs.observable.length != 0) {
			//Subscribe to the input node;
			const observable = inputs.observable[0] as { name: string; data: Observable<any> };

			if (!this.subscriptions[observable.name]) {
				this.subscriptions[observable.name] = observable.data.subscribe(() => {
					this.synth.triggerAttackRelease("C4", "8n");
				});
			}
		} else {
			// If there is no inputs for inputs.observable
			//Unsubscribe from subscriptions because there are no nodes to listen to
			Object.values(this.subscriptions).forEach((subscription) => {
				subscription.unsubscribe();
			});
			this.subscriptions = {};
		}

		if (isNumberArray(inputs.event)) {
			if (inputs.event.length == 0) {
				return;
			}

			this.synth.triggerAttackRelease("C4", "8n");
			console.log("yeehaw");

			//TODO in the future output will output note data ig, or tempo or smth
			outputs.num = 4000;
		}
	}
}
