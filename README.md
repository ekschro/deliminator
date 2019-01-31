[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]
[![Build Status][build-status-image]][build-status-url]
![Dependencies Status][david-image]
[![Maintainability][code-climate-image]][code-climate-url]

# Deliminator
Node module for delimiting and parsing socket communicaton. 

```
    ___       ___       ___     ___       ___       ___       ___       ___      ___       ___       ___   
   /\  \     /\  \     /\__\   /\  \     /\__\     /\  \     /\__\     /\  \    /\  \     /\  \     /\  \  
  /::\  \   /::\  \   /:/  /  _\:\  \   /::L_L_   _\:\  \   /:| _|_   /::\  \   \:\  \   /::\  \   /::\  \ 
 /:/\:\__\ /::\:\__\ /:/__/  /\/::\__\ /:/L:\__\ /\/::\__\ /::|/\__\ /::\:\__\  /::\__\ /:/\:\__\ /::\:\__\
 \:\/:/  / \:\:\/  / \:\     \::/\/__/ \/_/:/  / \::/\/__/ \/|::/  / \/\::/  / /:/\/__/ \:\/:/  / \;:::/  /
  \::/  /   \:\/  /   \:\__\  \:\__\     /:/  /   \:\__\     |:/  /    /:/  /  \/__/     \::/  /   |:\/__/ 
   \/__/     \/__/     \/__/   \/__/     \/__/     \/__/     \/__/     \/__/              \/__/     \|__|  
```

## Features 🔥
- **One dependency**, Ramda, for "practical functional" goodness.
- **Asynchronous and Synchronous** options.
- Builds for **Node.js 6,8,9,10,11** and beyond

## Installation 🔧

```
npm install deliminator
```

## Usage 📦
#### Functionality Examples
``` js
const deliminator = require('deliminator');

const d = deliminator.create(';;;');  // Create a delimiter

let recieved = '';

recieved += d.delimit('Hello, ');     // 'Hello, ;;;'
recieved += d.delimit('World!');      // 'Hello, ;;;World!;;;'

d.dice(recieved);                     // ['Hello, ', 'World!', '']

recieved += 'incomplete data';        // Undelimited data

d.dice(recieved);                     // ['Hello, ', 'World!', 'incomplete data']

let leftOver = '';

d.diceAndTrim(recieved, leftOver);    /* 
                                      {
                                          complete: ['Hello, ', 'World!'], 
                                          pending: 'incomplete data'
                                      } 
                                      */
```

#### Socket Callbacks 🔌
```js
const topology = require('fully-connected-topology');
const deliminator = require('deliminator');

const t = topology(/* ... */);

/* ... */

let waitingOn = '';

t.on('connection', (socket) => {
  socket.on('data', (data) => {
    const dataStr = data.toString();

    // Seperate completed data from pending data
    const { complete, pending } = delim.diceAndTrim(dataStr, waitingOn);
    
    // Save pending data to be concatenated with future incoming data
    waitingOn = pending;

    // Process completed data
    complete.map(JSON.parse).map(handleMsg);
  });
});
```

The example above shows how Deliminator can simplify handling communication between peers using packages like `fully-connected-topology`.

## API 🎛
#### `const d = deliminator.create(str);`

Creates and returns a new delimiter object. The string used as a delimiter is specifed by the parameter `str`.

#### `const d = deliminator.createAsync(str);`

Creates and returns a new asynchronous delimiter object.  Both `dice()` and `diceAndTrim()` will return non-blocking promises for their results.  The string used as a delimiter is specifed by the parameter `str`.

#### `d.delimit(str);`

Returns delimited result of given string `str`.

#### `d.dice(str);`

Parses given string `str` based on the defined delimit string of the delimiter `d` and returns the results in the form of an array.  The last element of the returned array contains any pending data that is still incomplete.  If the last element is an empty string then all preceeding elements are complete packets.

In the case that you created an asynchronous delimiter object, the results described above will come wrapped in a promise.

#### `d.diceAndTrim(str, waitingOn);`

Parses in the same way that `.dice()` does but returns an object instead of an array.  This object contains two properties: `complete` and `pending`.  The complete property contains an array of all completed (delimited) data from the given strings `waitingOn` and `str` when concatenated, respectively.  The pending property contains a string of any incomplete (undelimited) data.

In the case that you created an asynchronous delimiter object, the results described above will come wrapped in a promise.

## Author ☕️
#### [@ekschro](https://github.com/ekschro)
#### LinkedIn: ![Ericsson Schroeter](www.linkedin.com/in/ericsson-schroeter)

## License 🔑
Copyright © 2019, [Ericsson Schroeter](https://github.com/ekschro). Released under the [MIT License](LICENSE).

[npm-image]: https://img.shields.io/npm/v/deliminator.svg?
[npm-url]: https://www.npmjs.com/package/deliminator
[license-image]: https://img.shields.io/npm/l/deliminator.svg?
[license-url]: https://www.npmjs.com/package/deliminator
[downloads-image]: https://img.shields.io/npm/dt/deliminator.svg?
[downloads-url]: https://www.npmjs.com/package/deliminator
[build-status-image]: https://travis-ci.org/ekschro/deliminator.svg?branch=master
[build-status-url]: https://travis-ci.org/ekschro/deliminator
[david-image]: https://img.shields.io/david/ekschro/deliminator.svg
[code-climate-url]: https://codeclimate.com/github/ekschro/deliminator/maintainability
[code-climate-image]: https://api.codeclimate.com/v1/badges/78baced79207578bba1a/maintainability