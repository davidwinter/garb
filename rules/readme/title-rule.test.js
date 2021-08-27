import test from 'ava';

import readmeTitleRule from './title-rule.js';

test('it passes with the correct readme title', t => {
	const context = {
		helpers: {
			getFileContents: _path => `# readme-title-rule

> Validates a README has a H1 title
`,
		},
	};

	t.truthy(readmeTitleRule.check(context));
});

test('it throws an error with an incorrect readme title', t => {
	const context = {
		helpers: {
			getFileContents: _path => `readme-title-rule

Validates a README has the correct title structure
`,
		},
	};

	const error = t.throws(() => {
		readmeTitleRule.check(context);
	});

	t.is(error.message, 'Invalid README title');
});
