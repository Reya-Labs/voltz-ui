.PHONY: build

install-ci:
	yarn --immutable

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
	CI_BUILD=true yarn build

release:
	yarn release
