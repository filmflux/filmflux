import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended"
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: { js },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },

  //recommended rules for linting TypeScript, React, and Prettier
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended, 
  prettierPluginRecommended,

  //Fix React 17+ JSX transform issue
  {
    rules: {
      "react/react-in-jsx-scope": "off", // no need to import React in JSX files
    },
    settings: {
      react: { version: "detect" }, // auto-detect installed React version
    },
  },
])
