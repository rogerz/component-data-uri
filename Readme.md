# component-data-uri

A plugin to transpile image files to data URI for component builder

# Install

```bash
npm install component-data-uri
```

# Usage

Add image files to the `dataURIs` array in your `component.json`:

```json
{
	"dataURIs": [
		"images/1.png",
		"images/2.png"
	]
}
```

Use the plugin during your build process:

```javascript
var Builder = require('component-builder'),
    fs = require('fs'),
    dataUri = require('component-data-uri');

var builder = new Builder(__dirname);

builder.use(dataUri);

builder.build(function (err, res) {
  if (err) {
    console.log(err);
  }
  fs.writeFileSync('example/build.js', res.require + res.js);
  if (res.css) fs.writeFileSync('build/build.css', res.css);
});
```

Or

```bash
component build -u component-data-uri
```

And then require the files in your javascript:

```javascript
var img = require('images/1.png');
```
