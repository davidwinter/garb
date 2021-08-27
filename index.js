import filesystem from 'node:fs';
import YAML from 'yaml';

class ProjectConfig {
	constructor({fs = filesystem} = {}) {
		this.fs = fs;

		this.config = YAML.parse(this._getFileContents('./.projectconsistent.yml'));
	}

	get rules() {
		return this.config.rules;
	}

	check() {
		const rules = [];

		const context = {
			helpers: {
				getFileContents: path => this._getFileContents(path),
				fileExists: path => this._fileExists(path),
				yamlParse: data => this._yamlParse(data),
			},
		};

		for (const ruleName of this.rules) {
			const rule = import(`./rules/${ruleName}-rule.js`).then(ruleObject => {
				try {
					if ('applicable' in ruleObject.default && !ruleObject.default.applicable(context)) {
						return;
					}

					ruleObject.default.check(context);

					return {rule: ruleName, result: true};
				} catch (error) {
					return {rule: ruleName, result: false, error: error.message, type: error.constructor.name};
				}
			});

			rules.push(rule);
		}

		return Promise.allSettled(rules);
	}

	_getFileContents(path) {
		return this.fs.readFileSync(path, {encoding: 'utf-8'});
	}

	_fileExists(path) {
		return this.fs.existsSync(path);
	}

	_yamlParse(data) {
		return YAML.parse(data);
	}
}

export default ProjectConfig;
