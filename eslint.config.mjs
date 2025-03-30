import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable no-unused-vars for specific use cases
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change to "warn" instead of "error" for less strict enforcement
        {
          vars: "all",
          args: "none", // Ignore unused function arguments
          ignoreRestSiblings: true, // Ignore rest siblings in destructuring
        },
      ],

      // Other commonly helpful rules
      "no-console": "warn", // Allow console but show a warning
      "no-debugger": "error", // Disallow debugger statements
      "react/jsx-key": "error", // Enforce keys in React lists
      "react/prop-types": "off", // Disable prop-types for TypeScript projects
      "react/react-in-jsx-scope": "off", // No need for React import in Next.js

      // TypeScript-specific rules
      "@typescript-eslint/explicit-function-return-type": "off", // Disable enforcing return types
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable enforcing types for modules
      "@typescript-eslint/no-explicit-any": "warn", // Warn against using `any` type
    },
  },
];

export default eslintConfig;
