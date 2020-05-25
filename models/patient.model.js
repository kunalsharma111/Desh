const mongoose = require('mongoose');

let patientSchema = new mongoose.Schema({
    name: {type: String},
    dob: { type: Date },
    theligible: { type: String },
    medicene: { type: Array },
    pinsurance: { type: String },
    sinsurance: { type: String },
    facility: { type: String },
    provider: { type: String },
    room: { type: String },
    medication: { type: String },
    medicationName: {type:String},
    generictest: { type: String },
    docterupload: { type: String },
    genericresult: {type:String},
    demographicsheetuploaded: { type: String },
    capacityassesment: { type: String },
    capacity: { type: String },
    scaleeligible: { type: String },
    comment: { type: String },
    scale: { type: String },
    patientcondition: { type: String },
    scale_info:{type:Array},
    patient_services:{type:Array},
    service:{type:String},
    psychotherapydate:{type:String},
    frequentlypsychotherapy: {type:Number},
    bhi:{type:String},
    ccm:{type:String}
});

mongoose.model('Patient', patientSchema);
