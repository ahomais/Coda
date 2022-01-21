import { WorkerInputs } from "rete/types/core/data";
import { Observable, Subject, Subscription } from "rxjs";

export type SubscriptionsMap = { [name: string]: Subscription };

export type TypedInputs = WorkerInputs & {
	[index: string]: {
		name: string;
		observable: Observable<unknown> | Subject<unknown>;
	}[];
};
