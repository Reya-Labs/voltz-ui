.PHONY: build

install:
	yarn
	npx husky add .husky/pre-commit "yarn lint-staged"
	npx husky add .husky/commit-msg "yarn commitlint --edit $1"

install-ci:
	yarn --frozen-lockfile

test:
	yarn test

build:
	yarn build

build-release:
	rm -rf dist/
	yarn build-release
	chmod +x dist/cli.js

release:
	yarn release
