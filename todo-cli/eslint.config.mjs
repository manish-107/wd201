import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules", "migrations", "models"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser, // For browser-specific globals
        ...globals.jest, // For Jest-specific globals
        ...globals.node, // To support Node.js-specific globals (like process, __dirname, etc.)
      },
    },
  },
  pluginJs.configs.recommended,
];
