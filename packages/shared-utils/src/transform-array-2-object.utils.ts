export const transformToObject = (data: any[]) => {
	const accumulator: Record<string, any> = {};
	for (const item of data) {
		accumulator[item.id_tipo] = item.tag;
	}

	return accumulator;
};
