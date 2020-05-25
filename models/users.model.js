const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fname: {
        type:String
    },
    lname: {
        type:String
    },
    email: {
        type:String
    },
    mobile: {
        type:String
    },
    pwd: {
        type:String
    },
    userrole: {
        type:String
    }
});

mongoose.model('User', userSchema);
