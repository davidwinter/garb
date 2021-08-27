import filesystem from 'node:fs';
import YAML from 'yaml';

class ProjectConfig {
	constructor({fs = filesystem} = {}) {
		this.fs = fs;

		this.config = YAML.parse(this._getFileContents('./.projectconfig.yml'));
	}

	get rules() {
		return this.config.rules;
	}

	check() {
		const rules = [];

		const context = {
			helpers: {
				getFileContents: path => this._getFileContents(path),
			},
		};

		for (const ruleName of this.rules) {
			const rule = import(`./rules/${ruleName}-rule.js`).then(ruleObject => {
				try {
					ruleObject.default.check(context);
					return {rule: ruleName, result: true};
				} catch (error) {
					return {rule: ruleName, result: false, message: error.message};
				}
			});

			rules.push(rule);
		}

		return Promise.allSettled(rules);
	}

	_getFileContents(path) {
		return this.fs.readFileSync(path, {encoding: 'utf-8'});
	}
}

export default ProjectConfig;
