module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // Add node environment for config files
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  globals: {
    Alpine: "readonly", // Add Alpine as a global variable
  },
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types": "off",
  },
};
