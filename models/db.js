const mongoose = require('mongoose');
const uri = "mongodb+srv://sukrit:love@cluster0-bn91a.mongodb.net/test?retryWrites=true&w=majority";
require('./users.model');
require('./patient.model');
require('./r2patient.model');
require('./facility.model');
require('./insurance.model');
require('./med.model');
require('./provider.model');
require('./masterptrecord.model')
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false }, (err)=>{
    if(err) {
        console.log(err);
    }
    else{
        console.log('db connected');
    }
});
mongoose.Promise = global.Promise;