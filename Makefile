.PHONY: build

install-ci:
	yarn --frozen-lockfile --prefer-offline

test:
	yarn test

test-coverage:
	yarn test:coverage

generate-coverage-badges:
	yarn generate:coverage-badges

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
