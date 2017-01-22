### User Simulator

Simulates configurable user behavior.

```javascript
var sim = require('@iamsap/user-simulator');

var doThisRandomThing = function doThisRandomThing(user, cb) {
    // ... some action
    cb(null, user.name + ' didThisRandomThing ' + new Date());
}

var doAnotherRandomThing = function doAnotherRandomThing(user, cb) {
    // ... some action
    cb(null, user.name + '" didAnotherRandomThing ' + new Date());
}

var config = {
    actions: [doThisRandomThing, doAnotherRandomThing],
    userCount: 10,
    timeBetweenActions: [1000, 5000],
    actionsPerUser: [1, 5],
    debug: true
}

sim.simulate(config, function onComplete(err, results) {
    console.log('All done: ' + JSON.stringify(results));
});

````

User names are generated using @sillynames.

Actions do not run concurrently (yet).  