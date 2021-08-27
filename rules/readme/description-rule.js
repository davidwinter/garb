const readmeDescriptionRule = {
	check: context => {
		const file = context.helpers.getFileContents('./README.md');

		const matches = file.match(/^# .*\n\n> (.*)/);

		if (matches === null) {
			throw new Error('Invalid README description');
		}

		return true;
	},
};

export default readmeDescriptionRule;
