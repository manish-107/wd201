// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser, // For browser-specific globals
        ...globals.jest, // For Jest-specific globals
      },
    },
  },
  pluginJs.configs.recommended,
];
