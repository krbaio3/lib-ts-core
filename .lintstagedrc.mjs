const config = {
	'**/*.{js,jsx,ts,tsx}': ['eslint . --config ./eslint.config.mjs --fix'],
	'**/*.{json,md}': ['prettier --write --list-different .'],
	'*.s?css': ['stylelint --fix', 'prettier --write .'],
	'!(*.s?css|*.js|*.jsx)': ['prettier --write --list-different .'],
};

export default config;
