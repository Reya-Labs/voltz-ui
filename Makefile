.PHONY: build

install-ci:
	yarn --frozen-lockfile --prefer-offline

test:
	yarn test:ci

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
