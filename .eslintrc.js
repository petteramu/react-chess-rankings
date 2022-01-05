module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        semi: ['warn', 'never'],
        'linebreak-style': ['warn', 'windows'],
        indent: ['warn', 4, { SwitchCase: 1 }],
        'no-tabs': 'off',
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-filename-extension': 'off',
        'react/jsx-no-bind': ['error', { allowFunctions: true, allowArrowFunctions: true }],
        'default-param-last': 'off',
    },
}
