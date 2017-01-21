
import {User} from './user';
import {UserPoolConfig} from './userPoolConfig';

export class UserPool {

    users:Array<User> = [];

    constructor(public config:UserPoolConfig) {
        for(var i = 0; i < config.numOfUsers;i++){
            this.users.push(new User());
        }
    }

}
