# Ignore Styled Components Theme

This snapshot serializer tries it's best to hide the theme property for styled components in snapshot tests.


## Usage

In your jest config add this as a serailizer

```javascript
module.exports = {
    ...,
    snapshotSerializers: [
        ...,
        "ignore-styled-components-theme"
    ]
}
```


## Complex Usage

You can customize the behavior of this serializer by creating a javascript file that imports the `createSerializer`.
This way you can still have snapshots when themes are actually being tested. 

In project root
`testSetup/ignore-styled-components-theme.js`
```javascript
const createSerializer = require('ignore-styled-components-theme/createSerializer');
module.exports = createSerializer({ aggressive: true });
```

`jest.config.js`
```javascript
module.exports = {
    ...,
    snapshotSerializers: [
        ...,
        "<rootDir>/testSetup/ignore-styled-components-theme.js"
    ]
}
```

## Nuclear

If you do not want to show theme props in snapshots at all you can use the nuclear option.

`testSetup/ignore-styled-components-theme.js`
```javascript
const createSerializer = require('ignore-styled-components-theme/createSerializer');
module.exports = createSerializer('nuclear');
```


## API

| Property     | Type     | Default Value | Description                                                           |
| ------------ | -------- | ------------- | --------------------------------------------------------------------- |
| defaultProps | boolean  | true          | removes themes in prop that are the same as default props             |
| aggressive   | boolean  | false         | removes themes in prop if the component is a styled component         |
| themes       | object[] | []            | removes themes in prop if they are the same as one in the given array |
