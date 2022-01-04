export const isNumberArray = (value: unknown): value is number[] => {
	return Array.isArray(value) && value.every((element) => typeof element === "number");
};
