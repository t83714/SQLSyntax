# 2.0.0

- Upgrade dependencies
- The package is now pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). It cannot be require()'d from CommonJS.

# 1.1.3
- Fixed: the callstack overflow issue of the debug mode

# 1.1.2

- add readonly to statc `empty`, `asc` & `desc` property
- add `isDebugMode` flag. When it's on, toQuery will print SQL & parameters to console