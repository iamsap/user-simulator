### User Simulator

Simulates configurable user behavior.

Install via npm
```javascript
npm install @iamsap\user-simulator
```

Import the simulator
```javascript
var sim = require('@iamsap/user-simulator');
```

## To have user-simulator create new users with @sillyname

```javascript
var doThisRandomThing = function doThisRandomThing(user, cb) {
    // ... some action
    cb(null, user.name + ' didThisRandomThing ' + new Date());
}

var doAnotherRandomThing = function doAnotherRandomThing(user, cb) {
    // ... some action
    cb(null, user.name + ' didAnotherRandomThing ' + new Date());
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

```

## Or to provide your own users
```javascript
var myUserArr = [{name:'John'}, {name:'Paul'}, {name:'George'}, {name:'Ringo'}];

var config = {
    actions: [doThisRandomThing, doAnotherRandomThing],
    users: myUserArr,
    timeBetweenActions: [50, 500],
    actionsPerUser: [1, 5],
    debug: true
}

sim.simulate(config, function onComplete(err, results) {
    console.log('All done: ' + JSON.stringify(results));
});
```

Note: Actions do not run concurrently (yet).  