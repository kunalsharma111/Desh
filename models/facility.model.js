const mongoose = require('mongoose');

let facilitySchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    capacity: { type: String },
    address1: { type: String },
    sn: { type: String },
    address2: { type: String },
    tof: { type: String },
    city:{type:String},
    state:{type:String},
    ain: {type:String}
});
mongoose.model('Facility', facilitySchema);
