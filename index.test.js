import test from 'ava';

import ProjectConsistent from './index.js';

test('it loads projectconsistent to set rules', t => {
	const project = new ProjectConsistent();

	t.truthy(project.rules.includes('readme-title'));
});

test('it checks against all rules', async t => {
	const project = new ProjectConsistent();

	t.truthy(await project.check());
});
