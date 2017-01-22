'use strict'

var sillyname = require('sillyname');

const DEFAULT_USERS = 10;
const DEFAULT_MIN_TIME_BETWEEN_ACTIONS = 5000;
const DEFAULT_MAX_TIME_METWEEN_ACTIONS = 15000;
const DEFAULT_MIN_ACTIONS_PER_USER = 1;
const DEFAULT_MAX_ACTIONS_PER_USER = 5;

function User(name, maxNumOfActions){
    this.name = name;
    this.maxNumOfActions = maxNumOfActions;
    this.actionCount = 0;
}

function Simulator() {
}

function random(minMaxArr){
    var min = minMaxArr[0];
    var max = minMaxArr[1];
    return Math.floor(Math.random() * (max - min)) + min;
}

Simulator.prototype.simulate = function simulate(config) {
    this.config = config;

    this.log('simulate(' + JSON.stringify(this.config) + ')');

    if(this.hasErrors()) {
        this.log('Exiting because of config errors');
        return;
    }

    this.createUserPool();
    this.next();    // start the chain
}

Simulator.prototype.next = function next(){
    var user = this.nextAvailUser();
    if(!user){
        this.log('Simulation complete');
        return;
    }
}

Simulator.prototype.nextAvailUser = function nextAvailUser(){
    if(this.config.users.length == 0){
        return null;
    }

    var id = random([0, this.config.users.length]);
    this.log('nextAvailUser ' + id);
}

Simulator.prototype.createUserPool = function createUserPool(){
    this.log('createUserPool()');
    this.config.users = [];
    this.config.completedUsers = [];
    for(var i = 0; i < this.config.userCount;i++){
        var user = new User(sillyname(), random(this.config.actionsPerUser));
        this.config.users.push(user);
    }

    this.log('Updated config with test users: ' + JSON.stringify(this.config));
}

Simulator.prototype.hasErrors = function hasErrors() {
    if(!this.config.actions) {
        console.error('Simulator has no actions defined in the config.  {actions:[first,second, etc]}');
        return true;
    }

    if(!this.config.userCount) {
        console.warn('No user count defined, using default value of ' + DEFAULT_USERS);
        this.config.userCount = DEFAULT_USERS;
    }

    if(!this.config.timeBetweenActions || this.config.timeBetweenActions.length < 2) {
        console.warn('No timeBetweenActions defined, using default values of ' + DEFAULT_MIN_TIME_BETWEEN_ACTIONS + ',' + DEFAULT_MAX_TIME_METWEEN_ACTIONS);
        this.config.timeBetweenActions = [DEFAULT_MIN_TIME_BETWEEN_ACTIONS, DEFAULT_MAX_TIME_METWEEN_ACTIONS];
    }

    if(!this.config.actionsPerUser || this.config.actionsPerUser.length < 2) {
        console.warn('No actionsPerUser defined, using default values of ' + DEFAULT_MIN_ACTIONS_PER_USER + ',' + DEFAULT_MAX_ACTIONS_PER_USER);
        this.config.timeBetweenActions = [DEFAULT_MIN_TIME_BETWEEN_ACTIONS, DEFAULT_MAX_TIME_METWEEN_ACTIONS];
    }
    return false;
}

Simulator.prototype.log = function log(msg){
    if(this.config.debug){
        console.log(msg);
    }
}

module.exports = new Simulator();