export const listToReadable = (list: Array<string>): string => {
	return list
		.map((item, index) => {
			if (index === 0) {
				return item;
			}

			if (index === list.length - 1) {
				return ` og ${item}`;
			}

			return `, ${item}`;
		})
		.join('');
};
