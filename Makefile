.PHONY: build

install:
	yarn
	npx husky add .husky/pre-commit "yarn lint-staged"
	npx husky add .husky/commit-msg "yarn commitlint --edit $1"

install-ci:
	yarn --frozen-lockfile

test:
	yarn test

eslint-check:
	yarn lint:check

prettier-check: 
	yarn prettier:check

build:
	yarn build

release:
	yarn release
