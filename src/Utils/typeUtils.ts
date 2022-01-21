import { WorkerInputs } from "rete/types/core/data";
import { Observable, Subject } from "rxjs";
import { SubscriptionsMap } from "typings/Types";

export const isNumberArray = (value: unknown): value is number[] => {
	return Array.isArray(value) && value.every((element) => typeof element === "number");
};

export const handleInputSubscriptions = <A>(
	inputs: WorkerInputs & {
		[index: string]: {
			name: string;
			observable: Observable<A> | Subject<A>;
		}[];
	},
	key: string,
	subscriptions: SubscriptionsMap,
	callback: () => unknown,
) => {
	if (inputs[key].length != 0) {
		callback();
	} else {
		Object.values(subscriptions).forEach((sub) => {
			sub.unsubscribe();
		});
		subscriptions = {};
	}
	return subscriptions;
};
