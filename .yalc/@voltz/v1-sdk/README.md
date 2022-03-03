# Installation

1. Run `yarn`

# To publish via `yalc`

1. Anywhere -> Ensure `yalc` is installed `yarn global add yalc`
2. SDK -> Run `yarn build-release` (this prepares the JS build files)
3. SDK -> Run `yalc publish`
4. Another repo -> In the dependent repository, run `yalc add @voltz/v1-sdk`
5. To update another repo -> run `yalc update @voltz/v1-sdk`
