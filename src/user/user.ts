/// <reference path="../../typings/sillyname/sillyname.d.ts" />

import sillyname = require('sillyname');

export class User {
    constructor(public name:any = null) {

        if ( !name ) {
            this.name = sillyname(null);
        }
    }

}
