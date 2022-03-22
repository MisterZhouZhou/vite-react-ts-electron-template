module.exports = {
	env: {
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint/eslint-plugin'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		'arrow-body-style': 0,
		'jsx-a11y/label-has-for': 0,
		'max-lines-per-function': [2, { max: 320, skipComments: true, skipBlankLines: true }],
		'no-confusing-arrow': 0,
		'no-nested-ternary': 0,
		'no-param-reassign': [2, { props: true, ignorePropertyModificationsFor: ['draft'] }],
		'react/no-this-in-sfc': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'space-before-function-paren': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	}
}
