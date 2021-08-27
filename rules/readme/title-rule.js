const readmeTitleRule = {
	check: context => {
		const file = context.helpers.getFileContents('./README.md');

		const matches = file.match(/^# (.*)\n/);

		if (matches === null) {
			throw new Error('Invalid README title');
		}

		return true;
	},
};

export default readmeTitleRule;
