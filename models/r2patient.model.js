const mongoose = require('mongoose');

const visitationSchema = new mongoose.Schema({
    eval: { type: String },
    seedoc: { type: String },
    droped: { type: String },
    stable: { type: String },
    gdrstable: { type: String },
    psythreapy: { type: String },
    labs: { type: String },
    labname: { type: String },
    medmange: { type: String },
    urgentcall: { type: String },
    outreach: { type: String },
    room: { type: String },
    patientcondition: { type: String },
    visit: { type: String },
    unstable_text: { type: String },
    started: { type: String },
    increase: { type: String },
    decrease: { type: String },
    stopped: { type: String },
    medstopdate: { type: String },
    psa:{type:String},
    providername:{type:String},
    followup:{type:String},
    added: {type:String},
    addeddate: {type:String},
    yesstable: {type:String},
    nostable: {type:String}
})
mongoose.model('VM',visitationSchema);
let patientR2Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    visitations:[visitationSchema]
});
mongoose.model('R2P', patientR2Schema);
