# Changelog

All notable changes to the `@hygorchristian/ioc` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.4] - 2024-03-20

### Added

- Added license comments to all files.
- Added test coverage for type coercion.

### Changed

- Changed the license to MIT.
- Now the library is imported from the root instead of the `dist` folder, which is a breaking change.
- Improved code formatting.

### Removed

- Removed `.idea` folder from git tracking.

### Fixed

- Fixed issues with type coercion.

## [0.0.3] - 2024-03-19

### Changed

- **Breaking change**: now we import the lib from the root instead of the `dist` folder.

## [0.0.2] - 2024-03-19

### Fixed

- Fixed some small code formatting issues.

## [0.0.1] - 2024-03-18

### Added

- Initial release of the `@hygorchristian/ioc` package.
- Support for dependency injection with `register`, `registerSingleton`, and `mock` methods.
- Ability to use real instances or mock instances interchangeably with the `enableMock` and `disableMock` method.
- Comprehensive TypeScript definitions for strong typing and IntelliSense support in IDEs.
- Examples and documentation for getting started and implementing in various project types.

### Changed

- N/A

### Deprecated

- N/A

### Removed

- N/A

### Fixed

- N/A

### Security

- N/A
