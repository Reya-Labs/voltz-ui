.PHONY: build

install:
	yarn
	npx husky add .husky/pre-commit "yarn lint-staged"
	npx husky add .husky/commit-msg "yarn commitlint --edit $1"

install-ci:
	yarn --frozen-lockfile --prefer-offline

test:
	yarn test

ts-check:
	yarn ts:check

eslint-check:
	yarn lint:check

prettier-check: 
	yarn prettier:check

code-quality-check:
	yarn code-quality:check

build:
	yarn build

release:
	yarn release
