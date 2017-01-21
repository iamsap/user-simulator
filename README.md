### User Simulator

Simulates configurable user behavior.

```javascript
var sim = require('user-simulator');

function doThisRandomThing(user){
    // ... some action
}

function doAnotherRandomThing(user){
    // ... some action
}

var config = {
    actions: [doThisRandomThing, doAnotherRandomThing],
    users: 100,
    timeBetweenActions: [5000,15000],
    actionsPerUser: [1,5]
}

sim.simulate(100, []);

````

User names are generated using @sillynames
