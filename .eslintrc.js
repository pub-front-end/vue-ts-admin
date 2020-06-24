module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint', //使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范，需要放在最后一项。
        //一下三个为AlloyTeam生成的配置，待根据
        './index.js',
        './vue.js',
        './typescript.js'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser' //ESLint的解析器，用于解析TypeScript，从而检查和规范TypeScript代码。
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
};
