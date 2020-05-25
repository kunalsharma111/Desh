const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const router = express.Router();

require('../models/db');
const userModel = mongoose.model("User");
const patientModel = mongoose.model("Patient");
const R2Model = mongoose.model("R2P");
const FacilityModel = mongoose.model("Facility");
const InsuranceModel = mongoose.model("Insurance");
const MedicationModel = mongoose.model("Medication");
const ProviderModel = mongoose.model("Provider");
const MasterPatientModel = mongoose.model("MasterPatient");
const VModel = mongoose.model('VM');
var bcrypt = require('bcryptjs');

//register
router.post("/users", (req, res) => {
    // console.log(req.body);
    var user = new userModel(req.body);
    // console.log(user);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.pwd, salt, function (err, hash) {
            // Store hash in your password DB.
            console.log(hash);
            user.pwd = hash;
            if (!err) {
                user.save((err, doc) => {
                    if (err) {
                        console.log("Error" + err);
                        res.send("failed");
                    } else {
                        console.log(doc);
                        let payload = { subject: doc._id };
                        let token = jwt.sign(payload, 'keysecret');
                        res.status(200).json(token);
                    }
                });
            } else {
                console.log("error in hashing the password");
            }
        });
    });
});
let sub;
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    // console.log("no error till here");
    let payload = jwt.verify(token, 'keysecret');
    // console.log(payload);
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;
    sub = payload.subject;
    next()
}
//get current user
router.get('/red', verifyToken, (req, res) => {
    userModel.findOne({ _id: sub }, function (err, user) {
        if (!err) {
            res.json(user);
        }
        if (err) {
            console.log(err);
        }
    });
})
router.get('/man', verifyToken, (req, res) => {
    res.end("god");
})
router.post('/pat', verifyToken, (req, res) => {
    console.log(req.body);
    var patient = new patientModel({
        name: req.body.name,
        dob: req.body.dob,
        theligible: req.body.theligible,
        medication: req.body.medication,
        generictest: req.body.generictest,
        docterupload: req.body.docterupload,
        demographicsheetuploaded: req.body.demographicsheetuploaded,
        capacityassesment: req.body.capacityassesment,
        scaleeligible: req.body.scaleeligible,
        bhi: req.body.bhi,
        ccm: req.body.ccm,
        patientcondition: req.body.patientcondition
    })
    console.log(patient);
    patient.save().then(doc => { console.log("saved"); res.json('saved') }, err => {
        console.error("error");
        res.json('failure');
    })
})
router.post('/sendmoredata', verifyToken, (req, res) => {
    console.log(req.body);
    patientModel.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
        if (!err) {
            console.log(doc);
            res.json('saved to db');
        }
    })
})
router.post('/r2', verifyToken, (req, res) => {
    console.log(req.body);
    let visit = {
        eval: req.body.eval,
        seedoc: req.body.seedoc,
        droped: req.body.droped,
        stable: req.body.stable,
        gdrstable: req.body.gdrstable,
        psythreapy: req.body.psythreapy,
        labs: req.body.labs,
        labname: req.body.labname,
        medmange: req.body.medmange,
        urgentcall: req.body.urgentcall,
        outreach: req.body.outreach,
        room: req.body.room,
        visit: req.body.visit,
        unstable_text: req.body.unstable_text,
        started: req.body.started,
        increase: req.body.increase,
        decrease: req.body.decrease,
        stopped: req.body.stopped,
        medstopdate: req.body.medstopdate,
        psa: req.body.psa,
        providername: req.body.providername,
        followup: req.body.followup,
        added: req.body.added,
        addeddate: req.body.addeddate,
        yesstable: req.body.yesstable,
        nostable: req.body.nostable
    }
    let data = new R2Model({
        _id: req.body.id,
        visitations: [visit]
    });
    if (req.body.newappointmentrecord == 'yes') {
        R2Model.findById(data._id, ((err, record) => {
            if (record) {
                record.visitations.push(visit);
                record.save().then(result => {
                    res.json('record save to db' + result)
                }, err => {
                    console.log('theres was n error during save' + err);
                })
            }
            else {
                data.save().then(res => {
                    res.json('this was a brand new record');
                }, err => {
                    res.json("could not update this record contact support id the issue persists")
                })
            }
        }))
    }
    else {
        R2Model.findById(data._id, (err, rec) => {
            if (!err) {
                console.log("no error" + rec);
                if (rec) {
                    R2Model.findById(data._id, (err, doc) => {
                        let index;
                        if (!err) {
                            doc.visitations.forEach((rec, i) => {
                                console.log("visit on db" + rec.visit);
                                console.log(visit.visit)
                                if (rec.visit == visit.visit) {
                                    index = i;
                                }
                            })
                            doc.visitations[index] = visit;
                            doc.save().then(r => {
                                console.log("update force");
                                res.json('record updated')
                            }, err => {
                                console.log("some eeeeeee" + err);
                                res.json('error in updaetd')
                            })
                        }
                    })
                } else {
                    data.save().then(result => {
                        res.json("added new record");
                    }, err => {
                        res.json('error in updating record');
                    })
                }
            }
        })

    }
})
router.get('/patien', verifyToken, (req, res) => {
    MasterPatientModel.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            console.log(err);
        }
    })
})
router.get('/r2p', verifyToken, (req, res) => {
    R2Model.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            res.status(401).send('Invalid Response');
        }
    })
})
router.post('/facilityadd', verifyToken, (req, res) => {
    console.log(req.body+"vg");
    if (req.body.id == null) {
        let facility = new FacilityModel(req.body);
        facility.save(err => {
            if (!err) {
                res.json('saved to db');
            }
            else {
                console.log(err);
            }
        })
    } else {
        FacilityModel.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
            if (!err) {
                res.json('record updated')
            }
            else {
                res.json('some error');
            }
        })
    }
})
router.get('/getfacility', verifyToken, (req, res) => {
    FacilityModel.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            console.log('err to fetch details');
        }
    })
})
router.post('/insuranceadd', verifyToken, (req, res) => {
    console.log(req.body);
    if (req.body.id == null) {
        let insurance = new InsuranceModel(req.body);
        insurance.save(err => {
            if (!err) {
                res.json('saved to db');
            }
            else {
                console.log(err);
            }
        })
    } else {
        InsuranceModel.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
            if (!err) {
                res.json('record updated')
            }
            else {
                res.json('some error');
            }
        })
    }
})
router.get('/getinsurance', verifyToken, (req, res) => {
    InsuranceModel.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            console.log('err to fetch details');
        }
    })
})
router.post('/provideradd', verifyToken, (req, res) => {
    if (req.body.id == null) {
        console.log("here");
        console.log(req.body);
        let provider = new ProviderModel(req.body);
        provider.save(err => {
            if (!err) {
                res.json('saved to db');
            }
            else {
                console.log(err);
            }
        })
    } else {
        ProviderModel.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
            if (!err) {
                res.json('record updated')
            }
            else {
                res.json('some error');
            }
        })
    }
})
router.get('/getprovider', verifyToken, (req, res) => {
    ProviderModel.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            console.log('err to fetch details');
        }
    })
})
router.post('/medadd', verifyToken, (req, res) => {
    console.log(req.body);
    if (req.body.id == null) {
        let med = new MedicationModel(req.body);
        med.save(err => {
            if (!err) {
                res.json('saved to db');
            }
            else {
                console.log(err);
            }
        })
    } else {
        MedicationModel.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
            if (!err) {
                res.json('record updated')
            }
            else {
                res.json('some error');
            }
        })
    }
})
router.post('/goku', verifyToken, (req, res) => {
    let days = 7;
    if (req.body.medfollowup != "Per routine protocol") {
        days = req.body.followupdays;
    }
    let masterdata = {
        visit: req.body.visit,
        careconditiontimespent: req.body.careconditiontimespent,
        seedoc: req.body.seedoc,
        noseedocreason: req.body.noseedocreason,
        othernoseedocreason: req.body.othernoseedocreason,
        psynoseedocreason: req.body.psynoseedocreason,
        otherpsynoseedocreason: req.body.otherpsynoseedocreason,
        stable: req.body.stable,
        gdrstable: req.body.gdrstable,
        psythreapy: req.body.psythreapy,
        reasonpsy: req.body.reasonpsy,
        psyscreen: req.body.psyscreen,
        psyscreenreason: req.body.psyscreenreason,
        labs: req.body.labs,
        labname: req.body.labname,
        medmanage: req.body.medmanage,
        reasonmedmanage: req.body.reasonmedmanage,
        followup: req.body.followup,
        patientcondition: req.body.patientcondition,
        unstable_text: req.body.unstable_text,
        started: req.body.started,
        increase: req.body.increase,
        decrease: req.body.decrease,
        stopped: req.body.stopped,
        medstopdate: req.body.medstopdate,
        newappointmentrecord: req.body.newappointmentrecord,
        added: req.body.added,
        addeddate: req.body.addeddate,
        yesstable: req.body.yesstable,
        nostable: req.body.nostable,
        verystable: req.body.verystable,
        yesstablepsy: req.body.yesstablepsy,
        nostablepsy: req.body.nostablepsy,
        verystablepsy: req.body.verystablepsy,
        psymanage: req.body.psymanage,
        seepsy: req.body.seepsy,
        noseepsyreason: req.body.noseepsyreason,
        theligible: req.body.theligible,
        pinsurance: req.body.pinsurance,
        sinsurance: req.body.sinsurance,
        facility: req.body.facility,
        provider: req.body.provider,
        room: req.body.room,
        medication: req.body.medication,
        medicationName: req.body.medicationName,
        generictest: req.body.generictest,
        pcp: req.body.pcp,
        genericresult: req.body.genericresult,
        docterupload: req.body.docterupload,
        demographicsheetuploaded: req.body.demographicsheetuploaded,
        capacityassesment: req.body.capacityassesment,
        capacity: req.body.capacity,
        bhi: req.body.bhi,
        ccm: req.body.ccm,
        bhiconcent: req.body.bhiconcent,
        ccmconcent: req.body.ccmconcent,
        medmanage2: req.body.medmanage2,
        scaleeligible: req.body.scaleeligible,
        scale: req.body.scale,
        comment: req.body.comment,
        service_type: req.body.service_type,
        frequentlypsychotherapy: req.body.frequentlypsychotherapy,
        typevisit: req.body.typevisit,
        medreason: req.body.medreason,
        othermedreason: req.body.othermedreason,
        geneticreason: req.body.geneticreason,
        othergeneticreason: req.body.othergeneticreason,
        medreason2: req.body.medreason2,
        othermedreason2: req.body.othermedreason2,
        psyreason: req.body.psyreason,
        otherpsyreason: req.body.otherpsyreason,
        otherpsyscreenreason: req.body.otherpsyscreenreason,
        bhireason: req.body.bhireason,
        otherbhireason: req.body.otherbhireason,
        ccmreason: req.body.ccmreason,
        otherccmreason: req.body.otherccmreason,
        homeclinic: req.body.homeclinic,
        homeclinicconcent: req.body.homeclinicconcent,
        homeclinicreason: req.body.homeclinicreason,
        otherhomeclinicreason: req.body.otherhomeclinicreason,
        masterstable: req.body.masterstable,
        masterstablereason: req.body.masterstablereason,
        typevisitreason: req.body.typevisitreason,
        thtime: req.body.thtime,
        consult: req.body.consult,
        conpsy: req.body.conpsy,
        conmed: req.body.conmed,
        conscr: req.body.conscr,
        conpsyreason: req.body.conpsyreason,
        conmedreason: req.body.conmedreason,
        conscrreason: req.body.conscrreason,
        conpsyname: req.body.conpsyname,
        currentmeds: req.body.currentmeds,
        psy_symptoms: req.body.psy_symptoms,
        meds_symptoms: req.body.meds_symptoms,
        exmeds: req.body.exmeds,
        scaleinfo: req.body.scaleinfo,
        np: req.body.np,
        cch: req.body.cch,
        cchconcent: req.body.cchconcent,
        cchdate: req.body.cchdate,
        cchreason: req.body.cchreason,
        othercchreason: req.body.othercchreason,
        medfollowup: req.body.medfollowup,
        followupreason: req.body.followupreason,
        followupdays: days,
        scaleeligiblereason: req.body.scaleeligiblereason,
        otherscaleeligiblereason: req.body.otherscaleeligiblereason,
        scaledays: req.body.scaledays
    }
    MasterPatientModel.findById(req.body.id, (err, doc) => {
        if (!err) {
            doc.visits.push(masterdata);
            doc.save().then(res => {
                console.log("records saved")
            }, err => {
                console.log(err);
            })
        }
    })
});
router.get('/getmed', verifyToken, (req, res) => {
    MedicationModel.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            console.log('err to fetch details');
        }
    })
})
router.post("/login", (req, res) => {
    // console.log(req.body);
    var user = req.body;

    userModel.findOne({ email: user.email }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (!doc) {
                res.status(401).send('Invalid Email')
            } else {
                bcrypt.compare(user.pwd, doc.pwd).then((result) => {
                    console.log(result);
                    if (!result) {
                        res.status(401).send('Invalid Password')
                    } else {
                        let payload = { subject: doc._id }
                        let token = jwt.sign(payload, 'keysecret')
                        res.status(200).send({ token })
                    }
                });
            }
        }
    })

});

router.post('/basedata', verifyToken, (req, res) => {
    // console.log(req.body);
    let data = req.body;
    let basedata = new MasterPatientModel(data);
    console.log(basedata)
    basedata.save().then(res => {
        console.log(res);
        res.json("saved to db")
    }, err => {
        console.log(err);
        res.json("errors in save")
    })
})

router.get('/get', verifyToken, (req, res) => {
    MasterPatientModel.findById(req.query.id).then(doc => {
        // console.log(doc.visits.length)
        // console.log(doc.visits[doc.visits.length-1])
        // console.log(doc.visits)
        console.log(doc.dob)
        console.log(doc.name)
        if (doc.visits.length > 0) {
            console.log("visits not null", doc.visits[doc.visits.length - 1])
            res.json({ visit: doc.visits[doc.visits.length - 1], name: doc.name, dob: doc.dob });
        }
        else {
            console.log("visits null", doc)
            res.json(doc)
        }
    }, err => {
        res.json(err);
    })
})
router.post('/preround', verifyToken, (req, res) => {

    ProviderModel.find({ name: req.body.provider }).then(doc => {
        return doc[0];
    })
        .catch(err => {
            console.log(err);
            res.json(err)
        })
        .then(result => {
            console.log(result);
            MasterPatientModel.find({}).then(step2 => {
                let preroundupdata = [];
                step2.forEach(pat => {
                    let x = pat.visits[pat.visits.length - 1]
                    if (x != undefined) {
                        let veryUrgent = false;
                        if (x.medfollowup == "Very Urgent") veryUrgent = true;
                        if (result.insurance.includes(x.pinsurance) || result.insurance.includes(x.sinsurance) || veryUrgent) {
                            console.log(pat.name)
                            if (req.body.facility === x.facility) {
                                console.log(pat.name)
                                let visitdate = new Date(x.visit);
                                let selecteddate = new Date(req.body.date);
                                let psydate = new Date(x.visit);
                                let v_t = [];
                                let p_s = [];
                                let s_d = [];
                                let urgent = false;
                                if (x.medfollowup == 'urgent') {
                                    urgent = true;
                                }
                                let psyco = false;
                                if (x.followup) {
                                    psydate.setDate(psydate.getDate() + parseInt(x.followup));
                                    psyco = true;
                                }
                                let medmanage = false;
                                if (x.nostable == 'no') {
                                    medmanage = true;
                                    console.log(visitdate.getDate());
                                    if (x.followupdays != null || x.followupdays != undefined) {
                                        visitdate = new Date(x.followupdays.valueOf());
                                    }
                                    else
                                        visitdate.setDate(visitdate.getDate() + 7);
                                }
                                else {
                                    visitdate.setDate(visitdate.getDate() + 30);
                                    medmanage = true;
                                }
                                let s_e = [];
                                if (x.medmanage == 'yes') {
                                    s_e.push('Med-Management')
                                }
                                if (x.psythreapy == 'yes') {
                                    s_e.push('Psycothreapy')
                                }
                                if (x.psyscreen == "yes") {
                                    s_e.push("Psychiatric screenings")
                                }
                                if (x.bhi == "yes") {
                                    s_e.push("bhi");
                                }
                                if (x.ccm == "yes") {
                                    s_e.push("ccm")
                                }
                                if (x.homeclinic == "yes") {
                                    s_e.push("virtual clinic")
                                }
                                let scale_names = ['PHQ9', 'GDS', 'BIMS', 'GAD7', 'AIMS', 'MOCA'];
                                let scale_dataa = false;
                                if (result.role.includes('Scale Performer')) {
                                    x.scaleinfo.forEach(scale => {
                                        // console.log(scale)
                                        if (scale.scale_score == '') {
                                            p_s.push(scale.scale_name)
                                        }
                                        else if (scale_names.includes(scale.scale_name)) {
                                            let scale_visit_date = new Date(scale.scale_date);
                                            console.log(scale_visit_date.toString())
                                            var newDate = new Date(scale_visit_date.setMonth(scale_visit_date.getMonth() + 6));
                                            console.log(scale_visit_date.toString())
                                            if (+newDate <= +selecteddate) {
                                                scale_dataa = true;
                                                s_d.push(scale);
                                            }
                                        }
                                    })
                                }
                                if (scale_dataa) {
                                    v_t.push("Scales")
                                }
                                console.log(visitdate.toString(), selecteddate.toString(), psydate.toString())
                                console.log(result.role.includes('Medication management'))
                                let followup_reason = "-"
                                if (x.followupreason != undefined) {
                                    followup_reason = x.followupreason
                                }
                                if (+visitdate <= +selecteddate && result.role.includes('Medication management') && medmanage || urgent || veryUrgent) {
                                    if (+visitdate <= +selecteddate && result.role.includes('Medication management')) {
                                        v_t.push("Med-Management")
                                    }

                                    if (urgent) {
                                        v_t.push("urgent");
                                    }
                                    if (veryUrgent) {
                                        v_t.push("very urgent");
                                    }

                                    let data_partial = {
                                        id: pat._id,
                                        name: pat.name,
                                        dob: pat.dob,
                                        room: x.room,
                                        insurance: x.pinsurance + " " + x.sinsurance,
                                        services_eligible: s_e,
                                        visit_type: v_t,
                                        followup_type: x.medfollowup,
                                        followup_reason: followup_reason
                                    }
                                    console.log(data_partial);
                                    preroundupdata.push(data_partial);
                                }
                                if (+psydate <= +selecteddate && result.role.includes('Psychotherapist') && psyco) {
                                    v_t.push("Psycothreapy");
                                    let data_partial = {
                                        id: pat._id,
                                        name: pat.name,
                                        dob: pat.dob,
                                        room: x.room,
                                        insurance: x.pinsurance + " " + x.sinsurance,
                                        services_eligible: s_e,
                                        visit_type: v_t,
                                        followup_type: x.medfollowup,
                                        followup_reason: followup_reason
                                    }
                                    console.log(data_partial);
                                    preroundupdata.push(data_partial);
                                }
                                if (result.role.includes('Scale Performer') && (p_s.length > 0 || s_d.length > 0)) {
                                    let data_partial = {
                                        id: pat._id,
                                        name: pat.name,
                                        dob: pat.dob,
                                        room: x.room,
                                        insurance: x.pinsurance + " " + x.sinsurance,
                                        services_eligible: s_e,
                                        pending_scales: p_s,
                                        scales_due: s_d,
                                        visit_type: v_t,
                                        followup_type: x.medfollowup,
                                        followup_reason: followup_reason
                                    }
                                    console.log(data_partial);
                                    preroundupdata.push(data_partial);
                                }
                            }
                        }
                    }
                })
                res.json(preroundupdata)
            })
        })
})
module.exports = router;