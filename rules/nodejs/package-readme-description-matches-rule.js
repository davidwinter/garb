const packageReadmeDescriptionMatchesRule = {
	check: context => {
		const packageJson = JSON.parse(context.helpers.getFileContents('./package.json'));

		const file = context.helpers.getFileContents('./README.md');
		const matches = file.match(/^# .*\n\n> (.*)/);

		if (matches.length > 0 && 'description' in packageJson && matches[1].trim() === packageJson.description) {
			return true;
		}

		throw new Error('The description in the readme does not match the one in package.json');
	},
};

export default packageReadmeDescriptionMatchesRule;
