module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:prettier/recommended" // Kết hợp Prettier
  ],
  rules: {
    semi: ["error", "never"], // Không dùng dấu chấm phẩy
    "prettier/prettier": ["error", { semi: false }]
  }
};
