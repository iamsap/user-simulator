'use strict'

var sillyname = require('sillyname');

const DEFAULT_USERS = 10;
const DEFAULT_MIN_TIME_BETWEEN_ACTIONS = 5000;
const DEFAULT_MAX_TIME_METWEEN_ACTIONS = 15000;
const DEFAULT_MIN_ACTIONS_PER_USER = 1;
const DEFAULT_MAX_ACTIONS_PER_USER = 5;

function User(name, maxNumOfActions) {
    this.name = name;
    this.maxNumOfActions = maxNumOfActions;
    this.actionCount = 0;
}

function Simulator() {
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Simulator.prototype.simulate = function simulate(config, onComplete) {
    this.config = config;
    this.onComplete = onComplete;

    this.log('simulate(' + JSON.stringify(this.config) + ')');

    if (this.hasErrors()) {
        this.log('Exiting because of config errors');
        return;
    }

    this.init();
    this.next();    // start the chain
}

Simulator.prototype.next = function next() {
    var user = this.nextAvailUser();
    if (!user) {
        this.log('Simulation complete:' + JSON.stringify(this.config));
        this.onComplete(null, this.config.results);
        return;
    }

    var actionId = random(0, this.config.actions.length);
    var action = this.config.actions[actionId];

    if (!action || !(typeof action == 'function')) {
        console.error('Action at index ' + actionId + ' is not valid, exiting!');
        return;
    }

    var waitTime = random(this.config.timeBetweenActions[0], this.config.timeBetweenActions[1]);

    this.log('waitTime ' + waitTime);
    setTimeout(function (user, action, self) {
        self.log('Action (' + ++self.config.totalActionCount + '/' + self.config.maxActionCount + ')');

        action(user, function (err, result) {
            if (err) {
                console.error('Stopping simulation, error received: ' + err);
                return;
            }

            user.actionCount++;
            self.totalActionCount++;
            self.config.results.push(result);
            if (user.actionCount >= user.maxNumOfActions) {
                removeUserFromArray(user, self.config.users);
                self.config.completedUsers.push(user);
            }

            self.next();
        });
    }, waitTime, user, action, this);
}

function removeUserFromArray(user, arr) {
    arr.splice(arr.indexOf(user), 1);
}

Simulator.prototype.nextAvailUser = function nextAvailUser() {
    if (this.config.users.length == 0) {
        return null;
    }

    var id = random(0, this.config.users.length);
    this.log('nextAvailUser\t' + id + '\t' + this.config.users[id].name);
    return this.config.users[id];
}

Simulator.prototype.init = function init() {
    this.log('config()');
    this.config.results = [];

    var hasDefaultUsers = this.config.users;
    this.config.maxActionCount = 0;
    this.config.completedUsers = [];
    this.config.totalActionCount = 0;

    for (var i = 0; i < this.config.userCount; i++) {
        var actionCount = random(this.config.actionsPerUser[0], this.config.actionsPerUser[1]);
        this.config.maxActionCount += actionCount;

        if (hasDefaultUsers) {
            this.config.users[i].maxNumOfActions = actionCount;
            this.config.users[i].actionCount = 0;
        } else {
            if (!this.config.users) {
                this.config.users = [];
            }
            var user = new User(sillyname(), actionCount);
            this.config.users.push(user);
        }
    }

    this.log('Updated config with test users: ' + JSON.stringify(this.config));
}

Simulator.prototype.hasErrors = function hasErrors() {
    if (!this.config.actions) {
        console.error('Simulator has no actions defined in the config.  {actions:[first,second, etc]}');
        return true;
    }

    if (!this.onComplete) {
        console.error('No callback function defined, how will yo know when were done?');
        return true;
    }

    if (this.config.users) {
        this.config.userCount = this.config.users.length;
    }

    if (!this.config.userCount) {
        console.warn('No user count defined, using default value of ' + DEFAULT_USERS);
        this.config.userCount = DEFAULT_USERS;
    }

    if (!this.config.timeBetweenActions || this.config.timeBetweenActions.length < 2) {
        console.warn('No timeBetweenActions defined, using default values of ' + DEFAULT_MIN_TIME_BETWEEN_ACTIONS + ',' + DEFAULT_MAX_TIME_METWEEN_ACTIONS);
        this.config.timeBetweenActions = [DEFAULT_MIN_TIME_BETWEEN_ACTIONS, DEFAULT_MAX_TIME_METWEEN_ACTIONS];
    }

    if (!this.config.actionsPerUser || this.config.actionsPerUser.length < 2) {
        console.warn('No actionsPerUser defined, using default values of ' + DEFAULT_MIN_ACTIONS_PER_USER + ',' + DEFAULT_MAX_ACTIONS_PER_USER);
        this.config.timeBetweenActions = [DEFAULT_MIN_TIME_BETWEEN_ACTIONS, DEFAULT_MAX_TIME_METWEEN_ACTIONS];
    }
    return false;
}

Simulator.prototype.log = function log(msg) {
    if (this.config.debug) {
        console.log(msg);
    }
}

module.exports = new Simulator();