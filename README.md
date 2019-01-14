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

## Installation

```
npm install deliminator
```

## Usage
#### Functionality Examples
``` js
const deliminator = require('deliminator');

const d = deliminator.create(';;;');    // Create a delimiter

let recieved = '';

recieved += d.delimit('Hello, ');       // 'Hello, ;;;'
recieved += d.delimit('World!');        // 'Hello, ;;;World!;;;'

d.dice(recieved);                       // ['Hello, ', 'World!', '']

recieved += 'incomplete data';          // Undelimited data

d.dice(recieved);                       // ['Hello, ', 'World!', 'incomplete data']

let leftOver = '';

d.diceAndTrim(recieved, leftOver);      /* 
                                        {
                                            complete: ['Hello, ', 'World!'], 
                                            pending: 'incomplete data'
                                        } 
                                        */
```

#### Socket Callbacks
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
    
    // Save pending data to be concatonated with future incoming data
    waitingOn = pending;

    // Process completed data
    complete.map(JSON.parse).map(handleMsg);
  });
});
```

The example above shows how Deliminator can simplify handling communication between peers using packages like `fully-connected-topology`.

## API
#### `const d = deliminator.create(str);`

Creates and returns a new delimiter. The string used as a delimiter is specifed by the parameter `str`.

#### `d.delimit(str);`

Returns delimited result of given string `str`.

#### `d.dice(str);`

Parses given string `str` based on the defined delimit string of the delimiter `d` and returns the results in the form of an array.  The last element of the returned array contains any pending data that is still incomplete.  If the last element is an empty string then all preceeding elements are complete packets.

#### `d.diceAndTrim(str, waitingOn);`

Parses in the same way that `.dice()` does but returns an object instead of an array.  This object contains two properties: `complete` and `pending`.  The complete property contains an array of all completed (delimited) data from the given string `str`.  The pending property contains a string that is a concatonation of the given string `waitingOn` and any incomplete (undelimited) data, respectively.

## License
MIT