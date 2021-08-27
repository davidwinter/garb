#!/usr/bin/env node

import process from 'node:process';
import ora from 'ora';
import chalk from 'chalk';
import ProjectConsistent from './index.js';

(async () => {
	const projectconsistent = new ProjectConsistent();

	const spinner = ora('Checking project config').start();

	const results = await projectconsistent.check();
	const ruleResults = results.map(item => item.value);

	const fails = ruleResults.filter(item => !item.result);

	if (fails.length === 0) {
		spinner.succeed('All checks passed! 🎉');
		process.exit(0);
	}

	spinner.stop();

	for (const fail of fails) {
		console.log(`${chalk.red('✖')}  ${fail.message}  ${chalk.grey(fail.rule)}`);
	}

	console.log();

	spinner.fail(chalk.red(`${fails.length} errors`));

	process.exit(1);
})();
