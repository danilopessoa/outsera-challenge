module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json", "./tsconfig.app.json", "./tsconfig.node.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    // Common project preferences
    "prettier/prettier": "warn",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    // TypeScript specifics
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // React specifics
    "react/prop-types": "off", // we use TypeScript for props
    "react/react-in-jsx-scope": "off", // not needed with new JSX transform

    // Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  ignorePatterns: ["node_modules/", "dist/", "build/", "public/"],
};
