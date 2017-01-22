### User Simulator

Simulates configurable user behavior.

```javascript
var sim = require('@iamsap/user-simulator');

function doThisRandomThing(user, cb){
    // ... some action
    console.log(`User ${user.name} didThisRandomThing`);
    cb(null, 'all done');
}

function doAnotherRandomThing(user, cb){
    // ... some action
    console.log(`User ${user.name} didAnotherRandomThing`);
    cb(null, 'all done');
}

var config = {
    actions: [doThisRandomThing, doAnotherRandomThing],
    users: 100,
    timeBetweenActions: [5000,15000],
    actionsPerUser: [1,5]
}

sim.simulate(config);

````

User names are generated using @sillynames
