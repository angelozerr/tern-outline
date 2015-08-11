tern-outline
=========

[![Build Status](https://secure.travis-ci.org/angelozerr/tern-outline.png)](http://travis-ci.org/angelozerr/tern-outline)
[![NPM version](https://img.shields.io/npm/v/tern-outline.svg)](https://www.npmjs.org/package/tern-outline)

# Usage

[tern-outline](https://github.com/angelozerr/tern-outline) is a [tern plugin](http://ternjs.net/) which can be used to display the outline of a JavaScript file. 

# Editors / IDE

## CodeMirror

## Eclipse

[Tern Explorer View](https://github.com/angelozerr/tern.java/wiki/Tern-Outline-support) is filled with tern-outline : 

![Tern Explorer View](https://github.com/angelozerr/tern-outline/wiki/images/EclipseIDE_TernExplorer.png)

## Other editors

Takes a sample : 


```javascript
var arr = ["string"];

var n1 = 10;
n1 = "";

function sum(x1, x2) {
	var tmp = x1 * x2;
	return tmp;
}

var n2 = arr;
```

If you wish to integrate the tern lint with an editor (Vim, Sublime, etc), here the **JSON request** to post to the tern server :

```json
{
  "query": {
    "type": "outline",
    "file": "b.js"
  },
  "files": [
    {
      "name": "b.js",
      "text": "var arr = [\"string\"];\r\n\r\nvar n1 = 10;\r\nn1 = \"\";\r\n\r\nfunction sum(x1, x2) {\r\n\tvar tmp = x1 * x2;\r\n\treturn tmp;\r\n}\r\n\r\nvar n2 = arr;",
      "type": "full"
    }
  ]
}
```

and the **JSON response** of the tern server :

```json
{
  "outline": [
    {
      "name": "arr",
      "type": "[string]",
      "start": 4,
      "end": 7
    },
    {
      "name": "n1",
      "type": "number|string",
      "start": 29,
      "end": 31
    },
    {
      "name": "sum",
      "type": "fn(x1: ?, x2: ?) -> number",
      "start": 51,
      "end": 111,
      "children": [
        {
          "name": "tmp",
          "type": "number",
          "start": 80,
          "end": 83
        }
      ]
    },
    {
      "name": "n2",
      "type": "[string]",
      "start": 119,
      "end": 121
    }
  ]
}
```
