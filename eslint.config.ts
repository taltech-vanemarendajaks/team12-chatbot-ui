import * as js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import * as importPlugin from "eslint-plugin-import";
import * as prettier from "eslint-plugin-prettier";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import * as unusedImports from "eslint-plugin-unused-imports";
import * as globals from "globals";
import tseslint from "typescript-eslint";

import enforceFeaturePublicImports from "./.eslint/rules/enforce-feature-public-imports";

export default [
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier,
            import: importPlugin,
            unicorn,
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort,
            // Why @stylistic: https://eslint.org/blog/2023/10/deprecating-formatting-rules/
            stylistic, // Rules: https://eslint.style/packages/ts#rules
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],

            // Enforce 4-space indentation (with an extra indent for SwitchCase)
            // indent: ['error', 4, { SwitchCase: 1 }], // now handled by Prettier

            // Enforce trailing commas on multiline statements
            "comma-dangle": ["error", "always-multiline"],

            // Run Prettier as an ESLint rule and report differences as errors
            "prettier/prettier": "error",
            // Forbid the dangling slashes in imports
            "import/no-useless-path-segments": "error",

            // Enforce import and export sorting
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",

            // Enforce "import type" for TypeScript types
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    disallowTypeAnnotations: false,
                },
            ],

            // Enforce new lines between statements
            "stylistic/padding-line-between-statements": [
                "error",
                // Always require a blank line before "return" unless it's the only statement in a block
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "never", prev: "block", next: "return" },

                // Always require a blank line between import/export statements
                { blankLine: "always", prev: "import", next: "export" },

                // Always require a blank line around block-like statements
                { blankLine: "always", prev: "*", next: "block-like" },
                { blankLine: "always", prev: "block-like", next: "*" },

                // Always require a blank line around class declarations
                { blankLine: "always", prev: "*", next: "class" },
                { blankLine: "always", prev: "class", next: "*" },

                // Always require a blank line around function declarations
                { blankLine: "always", prev: "*", next: "function" },
                { blankLine: "always", prev: "function", next: "*" },

                // Always require a blank line around TS interface, type, or enum declarations
                { blankLine: "always", prev: "*", next: ["interface", "type", "enum"] },
                { blankLine: "always", prev: ["interface", "type", "enum"], next: "*" },

                // Always require a blank line around export declarations
                { blankLine: "always", prev: "*", next: "export" },
            ],

            // Enforce files to have a maximum of 300 lines
            "max-lines": [
                "warn",
                { max: 300, skipBlankLines: true, skipComments: true },
            ],

            // 'react-hooks/set-state-in-effect': 'warn',
            // 'react-hooks/immutability': 'warn',
        },
    },
    {
        files: ["**/index.ts"], // Public Interface files are allowed to have no padding, to preserve sorting
        rules: {
            "stylistic/padding-line-between-statements": "off",
        },
    },
    {
        files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
        rules: {
            // Enforce named exports and disallow default exports in local files
            "import/no-default-export": "error",
            "import/prefer-default-export": "off",

            // Error on unused imports
            "unused-imports/no-unused-imports": "error",

            // Enforce selective imports (no default imports from local files)
            "import/no-named-as-default": "error",
        },
    },
    {
        plugins: {
            unicorn,
        },
        files: ["src/**/*.{ts,js}", "tests/**/*.{ts,js}"],
        rules: {
            // Enforce Camel Case for regular source code (https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md)
            "unicorn/filename-case": [
                "error",
                {
                    cases: {
                        pascalCase: true,
                        camelCase: true,
                    },
                    ignore: [/([\\/]|^)vite-env\.d\.ts$/i],
                },
            ],
        },
    },
    {
        plugins: {
            unicorn,
        },
        files: ["**/*.tsx"],
        rules: {
            // Enforce Pascal Case for components (https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md)
            "unicorn/filename-case": [
                "error",
                {
                    cases: {
                        pascalCase: true,
                    },
                    ignore: [/([\\/]|^)vite-env\.d\.ts$/i, /([\\/]|^)main\.tsx$/i],
                },
            ],
        },
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        plugins: {
            feature: {
                rules: {
                    "enforce-feature-public-imports": enforceFeaturePublicImports,
                },
            },
        },
        rules: {
            "feature/enforce-feature-public-imports": "error",
        },
    },
];
