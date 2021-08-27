import test from 'ava';

import ProjectConfig from './index.js';

test('it loads projectconfig to set rules', t => {
	const project = new ProjectConfig();

	t.truthy(project.rules.includes('readme-title'));
});

test('it checks against all rules', async t => {
	const project = new ProjectConfig();

	t.truthy(await project.check());
});
