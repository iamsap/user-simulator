'use strict'

var sim = require('../lib/simulator');

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
    userCount: 2,
    timeBetweenActions: [50, 500],
    actionsPerUser: [1, 5],
    debug: true
}

sim.simulate(config, function onComplete(err, results) {
    console.log('All done: ' + JSON.stringify(results));
});