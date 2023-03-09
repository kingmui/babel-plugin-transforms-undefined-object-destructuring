# babel-plugin-transforms-undefined-object-destructuring

Automatically converts the destructuring object to an empty object (`{}`) when the destructuring object is `undefined`.

## Install

Using npm:

```bash
npm install --save-dev babel-plugin-transforms-undefined-object-destructuring
```

or using yarn:

```bash
yarn add babel-plugin-transforms-undefined-object-destructuring --dev
```

## Examples

In

```javascript
function test(params) {
  const { anyKeyName, ...restKeys } = params;
}

test();
```

Out

```javascript
var _excluded = ["anyKeyName"];
function _objectWithoutProperties(source, excluded) { ... }
function _objectWithoutPropertiesLoose(source, excluded) { ... }
function test(params) {
    var _ref = params || {},
        anyKeyName = _ref.anyKeyName,
        restKeys = _objectWithoutProperties(_ref, _excluded);
}
test();
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["babel-plugin-transforms-undefined-object-destructuring"]
}
```

### Via CLI

```bash
babel --plugins babel-plugin-transforms-undefined-object-destructuring script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["babel-plugin-transforms-undefined-object-destructuring"],
});
```
