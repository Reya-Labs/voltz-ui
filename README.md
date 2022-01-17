# Installation

1. Run `yarn`
2. Run `npx husky add .husky/pre-commit "yarn lint-staged"`
3. Run `npx husky add .husky/commit-msg "yarn commitlint --edit $1"`
