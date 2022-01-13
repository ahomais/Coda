import Rete, { Node } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import Sockets from "../Sockets";
import BasicComponent from "../BasicComponent";
import * as Tone from "tone";
import { isNumberArray } from "Utils/typeUtils";

export default class PlayNoteComponent extends BasicComponent {
	public synth;
	constructor() {
		super("PlayNote");
		this.synth = new Tone.Synth().toDestination();
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
