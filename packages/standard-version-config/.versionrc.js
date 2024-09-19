export default {
	types: [
		{ type: 'feat', section: 'Features' },
		{ type: 'fix', section: 'Bug Fixes' },
		{ type: 'docs', section: 'Documentation' },
		{ type: 'style', section: 'Styles' },
		{ type: 'refactor', section: 'Code Refactoring' },
		{ type: 'test', section: 'Tests' },
		{ type: 'chore', section: 'Chores' },
	],
	bumpFiles: [
		{
			filename: 'package.json',
			type: 'json',
		},
	],
};
