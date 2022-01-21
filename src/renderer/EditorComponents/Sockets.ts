import Rete from "rete";

export default {
	NumValue: new Rete.Socket("Number value"),
	ObservableValue: new Rete.Socket("Observable value"),
	AnyValue: new Rete.Socket("Any value"),
};
