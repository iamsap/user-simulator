import {User} from '../user/user';
import {UserPool} from '../user/userPool';
import {UserPoolConfig} from '../user/userPoolConfig';

let config = new UserPoolConfig(100);   //100 users
let pool = new UserPool(config);

console.log(`I created ${pool.users.length} users`);
for(var user of pool.users){
    console.log(`I created ${user.name}`);
}
