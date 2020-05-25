const mongoose = require('mongoose');

let insuranceSchema = new mongoose.Schema({
    name: { type: String },
    ain: {type:String}
});
mongoose.model('Insurance', insuranceSchema);
