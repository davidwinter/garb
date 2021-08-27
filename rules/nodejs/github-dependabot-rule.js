const githubDependabotRule = {
	applicable: context => context.helpers.fileExists('./package.json'),
	check: context => {
		const dependabotConfig = context.helpers.yamlParse(context.helpers.getFileContents('./.github/dependabot.yml'));

		for (const config of dependabotConfig.updates.filter(item => item['package-ecosystem'] === 'npm')) {
			if (config.schedule.interval !== 'daily') {
				throw new Error('The dependabot interval should be set to daily');
			}
		}

		return true;
	},
};

export default githubDependabotRule;
