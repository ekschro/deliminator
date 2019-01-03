# Deliminator

Node module for delimiting and parsing socket communicaton. 
    ___       ___       ___       ___       ___       ___       ___       ___       ___       ___       ___   
   /\  \     /\  \     /\__\     /\  \     /\__\     /\  \     /\__\     /\  \     /\  \     /\  \     /\  \  
  /::\  \   /::\  \   /:/  /    _\:\  \   /::L_L_   _\:\  \   /:| _|_   /::\  \    \:\  \   /::\  \   /::\  \ 
 /:/\:\__\ /::\:\__\ /:/__/    /\/::\__\ /:/L:\__\ /\/::\__\ /::|/\__\ /::\:\__\   /::\__\ /:/\:\__\ /::\:\__\
 \:\/:/  / \:\:\/  / \:\  \    \::/\/__/ \/_/:/  / \::/\/__/ \/|::/  / \/\::/  /  /:/\/__/ \:\/:/  / \;:::/  /
  \::/  /   \:\/  /   \:\__\    \:\__\     /:/  /   \:\__\     |:/  /    /:/  /   \/__/     \::/  /   |:\/__/ 
   \/__/     \/__/     \/__/     \/__/     \/__/     \/__/     \/__/     \/__/               \/__/     \|__|  

## Usage

``` js
const deliminator = require('deliminator');

const d = deliminator.create(';;;');            // Create a delimiter

let recieved = '';

recieved += d.delim('Hello, ');                 // 'Hello, ;;;'
recieved += d.delim('World!');                  // 'Hello, ;;;World!;;;'

d.dice(recieved);                               // ['Hello, ', 'World!', '']

recieved += 'incomplete data that is not delimited';

d.dice(recieved);                               // ['Hello, ', 'World!', 'incomplete data that is not delimited']

let leftOver = '';

d.diceAndTrim(recieved, leftOver);                 /* {
                                                        complete: ['Hello, ', 'World!'], 
                                                        pending: 'incomplete data that is not delimited'
                                                    } */

```

