# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.3.0](https://github.com/keithwalsh/mui-menubar/compare/v1.2.1...v1.3.0) (2025-08-15)


### Features

* **Menu:** enhance menu interaction with hover navigation and root close handling ([0084425](https://github.com/keithwalsh/mui-menubar/commit/0084425f467aae882817c92e9e92b330450ffbff))

## [1.2.1](https://github.com/keithwalsh/mui-menubar/compare/v1.2.0...v1.2.1) (2025-08-15)

## [1.2.0](https://github.com/keithwalsh/mui-menubar/compare/v1.1.4...v1.2.0) (2025-08-15)


### Features

* **MainMenuRenderer:** add optional id to menuConfig and update popupId generation for improved uniqueness ([d82ba88](https://github.com/keithwalsh/mui-menubar/commit/d82ba88fec337417d832e2cddb9f207beb689139))


### Documentation

* update installation instructions, add compatibility section, and enhance MenuBar interface documentation; introduce disableGutters prop in SubmenuRenderer ([37d5c5f](https://github.com/keithwalsh/mui-menubar/commit/37d5c5fb9125ddb95b321005fbd1aa7545d18442))

## [1.1.4](https://github.com/keithwalsh/mui-menubar/compare/v1.1.3...v1.1.4) (2025-08-15)

### Refactor

- remove dead `SubmenuRenderer` component and its tests
- remove `SubmenuRendererProps` type from public exports

## [1.1.3](https://github.com/keithwalsh/mui-menubar/compare/v1.1.2...v1.1.3) (2024-12-17)

## [1.1.0](https://github.com/keithwalsh/mui-menubar/compare/v0.1.15...v1.1.0) (2024-12-05)


### Features

* **MenuBar:** remove transitionDuration prop ([c2bc312](https://github.com/keithwalsh/mui-menubar/commit/c2bc312d39bdaf1822192152da53f5f7b6d2d711))
* remove colorTheme prop ([124ff18](https://github.com/keithwalsh/mui-menubar/commit/124ff18ff83e8652b9b53937b8cdb9abe70bad17))
* remove default config ([6ad6c8c](https://github.com/keithwalsh/mui-menubar/commit/6ad6c8c3fcfcbe8027dd545a4142c867da8eb381))


### Documentation

* update README ([fa9c33a](https://github.com/keithwalsh/mui-menubar/commit/fa9c33a57de581fc584c5b000df3bf215b7bf641))

## [0.1.15](https://github.com/keithwalsh/mui-menubar/compare/v0.1.14...v0.1.15) (2024-11-29)


### Features

* add backgroundColor styling that changes based on popupState.isOpen ([a1855dc](https://github.com/keithwalsh/mui-menubar/commit/a1855dcb979e8e2ee740a3198ea1df013f7517b9))
* implement click activation for root-level menus and maintain hover activation for submenus ([e025abd](https://github.com/keithwalsh/mui-menubar/commit/e025abd9642345c8bb85e6c57700053fea67896d))


### Bug Fixes

* ensure consistent ripple effect behavior across all menu item types ([21aaafe](https://github.com/keithwalsh/mui-menubar/commit/21aaafe6601c73a80ff34dd94acd438d035a6dbe))
* primary menu padding ([9f317d5](https://github.com/keithwalsh/mui-menubar/commit/9f317d51de61985cabd483f807b2960352811fef))


### Documentation

* update README ([ffe2a9f](https://github.com/keithwalsh/mui-menubar/commit/ffe2a9f35e45b8f05294c781a7e0ad52059ef8e2))
* update README ([79c5a75](https://github.com/keithwalsh/mui-menubar/commit/79c5a7509f118f576046e276a9b8585ef219e2fb))

## [0.1.14](https://github.com/keithwalsh/mui-menubar/compare/v0.1.8...v0.1.14) (2024-11-29)


### Features

* add component kind and support for components on the menu ([391f0a8](https://github.com/keithwalsh/mui-menubar/commit/391f0a8541784bf0f87b5992024a42dd48408148))


### Documentation

* update README ([7636ee0](https://github.com/keithwalsh/mui-menubar/commit/7636ee0d035c0e9e96ce0a8a6c70aeef4e6686d5))

## [0.1.8](https://github.com/keithwalsh/mui-menubar/compare/v0.1.7...v0.1.8) (2024-10-24)


### Features

* add initial implementation of material-ui-popup-state ([ccfb481](https://github.com/keithwalsh/mui-menubar/commit/ccfb481c102f1e39cf4f9c20ab137ee1bc0d7b73))
* add useMenuHotkeys ([31cf13c](https://github.com/keithwalsh/mui-menubar/commit/31cf13c7be229686e8d3637941010c11fc8208ba))


### Bug Fixes

* correct export type names ([1cc3ca5](https://github.com/keithwalsh/mui-menubar/commit/1cc3ca5f6e642cd6e554fc929dee08cc5ea89495))
* multiple menus opening when using click ([e20282f](https://github.com/keithwalsh/mui-menubar/commit/e20282fdc25ce5f34ad789d7a12306a1ff4e6ca3))

## [0.1.7](https://github.com/keithwalsh/mui-menubar/compare/v0.1.4...v0.1.7) (2024-10-18)


### Features

* add 'component' type to MenuBarItemKind and support for custom components ([b85b1d3](https://github.com/keithwalsh/mui-menubar/commit/b85b1d3d95ebf7360bbdcb4dc2c44e5f36ac69bc))
* create defaults.ts for all default configurations, add disableRipple and transitionDuration props to MenuBar ([dca83e3](https://github.com/keithwalsh/mui-menubar/commit/dca83e36a81e6c2b6827f4350fca2f73cd8a8e37))

## [0.1.4](https://github.com/keithwalsh/mui-menubar/compare/v0.1.3...v0.1.4) (2024-10-18)


### Features

* add disableRipple option with default true, disable focus ripple on top-level buttons ([0078924](https://github.com/keithwalsh/mui-menubar/commit/00789247a13fcb9dc960a59103fdbe0e663f1d98))

## 0.1.3 (2024-10-18)


### Features

* add ability to disable menu item with disabled: true in configuration ([1b373c5](https://github.com/keithwalsh/mui-menubar/commit/1b373c5439bd072f8b140569fbd822ae1883d1b2))
* add ability to set menu items as selected via config ([ae532e2](https://github.com/keithwalsh/mui-menubar/commit/ae532e2f3a8aae7e9293d8f81485440edc0b3325))
* add active state highlighting ([2e8d2eb](https://github.com/keithwalsh/mui-menubar/commit/2e8d2eba80427d77f69167aa4460525d7501b1c2))
* add color prop to control MenuBar top level color ([391dce4](https://github.com/keithwalsh/mui-menubar/commit/391dce4fa62c66ca73238cd6b8e5ef947ae8d00d))
* add MenuBar component and configure TypeScript build ([f5c92d6](https://github.com/keithwalsh/mui-menubar/commit/f5c92d6de821e17c6039838dba53a50be741a3eb))
* add support for hotkeys ([d9342d0](https://github.com/keithwalsh/mui-menubar/commit/d9342d0d417d3d9a51ba7b4b85471353b7dd568c))
* add support for nested submenus ([dee8fae](https://github.com/keithwalsh/mui-menubar/commit/dee8fae5d2c057f85c10a3c0a42edf9e7b990ac8))
* add transitionDuration to MenuConfig ([69df721](https://github.com/keithwalsh/mui-menubar/commit/69df72168eb5a32b5c1b70889f0520894d367e8c))
* dark theme support ([03f2c18](https://github.com/keithwalsh/mui-menubar/commit/03f2c1838a2fc6f0f1ee09977ad5c64356f7be37))


### Bug Fixes

* correctly export MenuConfig types using 'export type' ([b1ea539](https://github.com/keithwalsh/mui-menubar/commit/b1ea53950208480252ec2faa6a05378588657af0))
* export MenuConfig type from index.ts ([e8ba8d6](https://github.com/keithwalsh/mui-menubar/commit/e8ba8d6252906550115438842be075fb5a17d695))
* update peerDependencies to support @mui/icons-material v6 ([9c1365e](https://github.com/keithwalsh/mui-menubar/commit/9c1365e31fdb161c0a158172590a56f6f59f502a))

## 0.1.2 (2024-10-17)


### Features

* add MenuBar component and configure TypeScript build ([f5c92d6](https://github.com/keithwalsh/mui-menubar/commit/f5c92d6de821e17c6039838dba53a50be741a3eb))
* add Storybook and initial story ([d5d6932](https://github.com/keithwalsh/mui-menubar/commit/d5d69326f517d7c794683dd183b24920abc221ed))
* add support for hotkeys ([2653fad](https://github.com/keithwalsh/mui-menubar/commit/2653fad5c69f406a4fbb4ac9b38b51b3d187191c))
* add support for nested submenus to arbitrary depth ([9bccee9](https://github.com/keithwalsh/mui-menubar/commit/9bccee95417fadcc0ee9c2badf61a59904e6beb9))


### Bug Fixes

* correctly export MenuConfig types using 'export type' ([b1ea539](https://github.com/keithwalsh/mui-menubar/commit/b1ea53950208480252ec2faa6a05378588657af0))
* export MenuConfig type from index.ts ([e8ba8d6](https://github.com/keithwalsh/mui-menubar/commit/e8ba8d6252906550115438842be075fb5a17d695))
* update peerDependencies to support @mui/icons-material v6 ([9c1365e](https://github.com/keithwalsh/mui-menubar/commit/9c1365e31fdb161c0a158172590a56f6f59f502a))
