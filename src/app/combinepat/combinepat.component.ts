import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { combined, DataTransferService } from '../shared/data-transfer.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, from } from 'rxjs';
import { map, first, filter } from 'rxjs/operators'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var $: any
@Component({
  selector: 'app-combinepat',
  templateUrl: './combinepat.component.html',
  styleUrls: ['./combinepat.component.scss']
})
export class CombinepatComponent implements OnInit {
  modalRef: BsModalRef;
  previousRoute: string;
  constructor(public service: DataTransferService, private modalService: BsModalService, public el: ElementRef,
    public toastr: ToastrService, public router: Router) { }
  scale_score=[];
  scale_name=[];
  combined: combined;
  providers: any;
  facilities: any;
  insurances: any;
  meds: any;
  user;
  role;
  fname;
  metaData;
  todaydate;
  scale_date_text: string;
  scale_score_text;
  scale_form_result;
  data: any = {};
  obj: {
    scale_name: string
    scale_date: string;
    scale_score: number;
    scaledays: string;
  }
  p_id: string;
  masterobj;
  update = false;
  kdate: Date;
  stringdate: string;
  cd: Date;
  kd;
  default_scales = ['PHQ9', 'GDS', "BIMS", "MMSE", "BTQ", 'LEC-5', 'GAD', "BAI"];
  scale60days = ['PHQ9','GDS','BIMS','MMSE','GAD','BAI','BEHAVE-AD', 'RMBC','MOCA','NPQ','ISI','AIS','PNASS','BPRS'];
  ngOnInit() {
    this.previousRoute = this.service.getPreviousUrl();
    this.kdate = new Date();
    this.cd = new Date();
    this.kd = this.cd.toISOString().slice(0, 10);
    this.stringdate = this.kdate.toISOString().slice(0, 10);
    this.service.subject.subscribe(res => this.p_id = res);
    if (this.p_id == null || this.p_id == undefined) {
      this.service.router.navigateByUrl('/');
    }
    this.service.getByid(this.p_id).subscribe(res => {
      this.masterobj = res;
      if (res.visit != undefined) {
        this.combined = res.visit;
        this.update = true;
        console.log('########################################################################');
        setTimeout(() => {
          var x = this.el.nativeElement.querySelectorAll('.chkbx');
          var status = this.el.nativeElement.querySelectorAll('.medstatus');
          var date = this.el.nativeElement.querySelectorAll('.meddate');
          console.log(this.masterobj.visit.exmeds)
          this.el.nativeElement.querySelector('#cid').value = this.stringdate;
          x.forEach((item, index) => {
            this.masterobj.visit.exmeds.forEach(med => {
              if (med.name == item.value) {
                item.checked = true;
                status[index].value = med.status;
                if (med.status == "Approved")
                  date[index].value = med.date
              }
            })
          });

          var scalechkbx = this.el.nativeElement.querySelectorAll('.scaleschkbx');
          var scalescore = this.el.nativeElement.querySelectorAll('.scale_score');
          var scaledate = this.el.nativeElement.querySelectorAll('.scale_date');
          var scaledayss = this.el.nativeElement.querySelectorAll('.scaledays');
          console.log(this.masterobj.visit.scaleinfo)
          scalechkbx.forEach((item, index) => {
            this.masterobj.visit.scaleinfo.forEach(med => {
              if (med.scale_name == item.value) {
                item.checked = true;
                scalescore[index].value = med.scale_score;
                scaledate[index].value = med.scale_date;
                scaledayss[index].value = med.scaledays;
              }
            })
          });

          var medsyms = this.el.nativeElement.querySelectorAll('.symtoms_meds');
          console.log(this.masterobj.visit.psy_symptoms)
          medsyms.forEach((item) => {
            this.masterobj.visit.meds_symptoms.forEach(med => {
              if (med == item.value) {
                item.checked = true;
                item.value = med;
              }
            })
          });

          var psysyms = this.el.nativeElement.querySelectorAll('.symtoms_psy');
          console.log(this.masterobj.visit.psy_symptoms)
          psysyms.forEach((item) => {
            this.masterobj.visit.psy_symptoms.forEach(med => {
              if (med == item.value) {
                item.checked = true;
                item.value = med;
              }
            })
          });
        }, 500)
      }
      else {
        setTimeout(() => {
          console.log("-----------------------------------------------------------------")
          this.el.nativeElement.querySelector('#cid').value = this.stringdate;
          this.el.nativeElement.querySelectorAll('.scaleschkbx').forEach(scale => {
            // if(this.default_scales.includes(scale)) {
            console.log(scale);
            // }
          })
        }, 500);
      }
      console.log(this.update)
      this.combined.name = res.name;
      this.combined.dob = res.dob;
      this.combined.flag = res.flag;
      // this.el.nativeElement.getElementById('cid').value = this.stringdate;

      // console.log(res.visit.exmeds)
      // this.reset_limited()
    });

    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
    this.service.getData()
      .subscribe(
        res => {
          this.user = res;
          this.fname = this.user.fname;
          this.role = this.user.userrole;
          // this.todaydate = new Date();
          // this.user.visit = this.todaydate;
          this.metaData = true;
          console.log(this.user);
        }, err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.service.router.navigateByUrl('/');
          }
        })
    this.resetForm();
    console.log(typeof this.combined.sinsurance)
    this.service.getFacility().subscribe(res => {
      // console.log(res);
      this.facilities = res;
    })
    this.service.getInsurance().subscribe(res => {
      // console.log(res);
      this.insurances = res;
    })
    this.service.getMed().subscribe(res => {
      // console.log(res);
      this.meds = res;
    })
    this.service.getProvider().subscribe(res => {
      this.providers = res;
    })
    console.log(this.update)
  }
  unstable_syms = ['depression', 'anxiety', 'mania', 'psychosis', 'dementia progression and related behaviors', 'delirium and related behaviors', 'pseudobulbar affect']
  type_visits = ['Med-management follow up', 'Psycothreapy', 'Case Management/Psychiatric screenings', 'Care coordination time spent']
  scales = ['Depression', 'PHQ9', 'GDS', 'BDI', 'Cognitive impairment', 'BIMS', 'MMSE', 'Trauma', 'BTQ', 'LEC-5', 'Anxiety', 'GAD', 'BAI', 'PTSD', 'PCL', 'NSESS', 'Bipolar diagnostic', 'BSDS', 'MDQ', 'Dementia with behaviors', 'BEHAVE-AD', 'RMBC', 'Dementia testing', 'MOCA', 'NPQ', 'Insomnia', 'ISQ', 'ISI', 'Suicidal assessment', 'CSSRS', 'BSS', 'Schizophrenia', 'PNASS', 'BPRS', 'Substance use', 'AUDIT', 'DAST', 'FAGERSTORM', 'Misc', 'CNSLS', 'AIMS'];
  med_reasons = ['Patient did not tolerate side effects', 'Patient did not benefit from it', 'Patient cannot afford it', 'Medicine interacts with other medicines', 'Other', 'Not Applicable'];
  genatic_reasons = ['Insurance does not cover it', 'Patient cannot afford copay', 'Patient/POA denied consent', 'Other', 'Not Applicable'];
  med_reasons2 = ['Patient does not need it clinically', 'Patient/POA refused', 'PCP removed the consultation order', 'Other', 'Not Applicable']
  med_reasons3 = ['Pt does not need it clinically', 'Pt/POA refused', 'POA is unable to support', 'Other', 'Not Applicable'];
  psy_reasons = ['Patient does not need it clinically', 'Patient/POA refused', 'Patient is unable to participate because of severe cognitive disorder', 'Patient is unable to participate because of severe speech disorder', 'PCP removed consultation order', 'Other', 'Not Applicable']
  no_see_doc_reasons = ['Patient was not in the facility', 'Patient could not participate in the interview', 'Patient refused to participate in the interview', 'I met the target points for the day', 'Other']
  followup_type = ['Per routine protocol', 'Urgent', 'Very Urgent', 'Date Specific']
  scaleeligible_reasons = ['Patient was not in the Facility', 'Patient could not particpate in the interview', 'Patient refused to particpate in the interview', 'I met the target points for the day', 'Patient not available', 'Other']
  sptime = ['Upto 30 min', 'Upto 45 min', 'Upto 1 Hr', 'More then 1 Hr']
  sday = ['Not Applicable','3 Months','6 Months'];
  // firstat : false;
  // reset_limited() {
  //   this.combined
  // }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm()
    }

    this.combined = {
      id: null,
      visit: null,
      name: '',
      dob: null,
      careconditiontimespent: '',
      seedoc: '',
      noseedocreason: '',
      othernoseedocreason: '',
      psynoseedocreason: '',
      otherpsynoseedocreason: '',
      stable: '',
      gdrstable: '',
      psythreapy: 'yes',
      reasonpsy: '',
      psyscreen: 'yes',
      psyscreenreason: '',
      labs: 'no',
      np: 'no',
      labname: '',
      medmanage: 'yes',
      reasonmedmanage: '',
      followup: '',
      patientcondition: '',
      unstable_text: '',
      started: '',
      increase: '',
      decrease: '',
      stopped: '',
      decrease2: '',
      stopped2: '',
      medstopdate: null,
      newappointmentrecord: '',
      added: '',
      addeddate: '',
      yesstable: '',
      nostable: '',
      verystable: '',
      yesstablepsy: '',
      nostablepsy: '',
      verystablepsy: '',
      psymanage: 'no',
      seepsy: '',
      noseepsyreason: '',
      theligible: '',
      pinsurance: '',
      sinsurance: '',
      facility: '',
      provider: '',
      room: '',
      medication: 'no',
      medicationName: '',
      generictest: 'no',
      pcp: 'no',
      genericresult: '',
      docterupload: '',
      demographicsheetuploaded: 'no',
      capacityassesment: 'no',
      capacity: 'no',
      bhi: 'no',
      ccm: 'no',
      cch: 'no',
      cchconcent: '',
      cchdate: null,
      cchreason: '',
      othercchreason: '',
      bhiconcent: '',
      ccmconcent: '',
      medmanage2: 'no',
      scaleeligible: 'no',
      scale: '',
      comment: '',
      service_type: '',
      frequentlypsychotherapy: null,
      typevisit: '',
      medreason: '',
      othermedreason: '',
      geneticreason: '',
      othergeneticreason: '',
      medreason2: '',
      othermedreason2: '',
      psyreason: '',
      otherpsyreason: '',
      otherpsyscreenreason: '',
      bhireason: '',
      otherbhireason: '',
      ccmreason: '',
      otherccmreason: '',
      homeclinic: 'no',
      homeclinicconcent: '',
      homeclinicreason: '',
      otherhomeclinicreason: '',
      masterstable: 'stable',
      masterstablereason: '',
      typevisitreason: '',
      thtime: null,
      consult: 'no',
      conpsy: '',
      conmed: '',
      conscr: '',
      conpsyreason: '',
      conmedreason: '',
      conscrreason: '',
      conpsyname: '',
      currentmeds: '',
      medfollowup: 'Per routine protocol',
      followupreason: '',
      followupdays: null,
      scaleeligiblereason: 'Not Applicable',
      otherscaleeligiblereason: '',
      flag: null
    }
  }
  one(val: any) {
    console.log(val);
    this.combined.sinsurance = val;
  }
  notvalidate:boolean;
  submit(form: NgForm) {
    if(form.valid){
      var x = this.el.nativeElement.querySelectorAll('.chkbx');
      var status = this.el.nativeElement.querySelectorAll('.medstatus');
      var date = this.el.nativeElement.querySelectorAll('.meddate')
      let medData: any = [];
      let stream$ = from(x);
      this.combined.flag = 1;
      stream$.pipe(filter((val: any) => val.checked)).subscribe((res: any) => {
        let meddata: any = {}
        meddata.name = res.value;
        let parstat = status[parseInt(res.id) - 1].value;
        meddata.status = parstat;
        if (parstat == 'Approved')
          meddata.date = date[res.id - 1].value;
        medData.push(meddata);
      })
      console.log(medData)
  
      var scalechkbx = this.el.nativeElement.querySelectorAll('.scaleschkbx');
      var scalescore = this.el.nativeElement.querySelectorAll('.scale_score');
      var scaledate = this.el.nativeElement.querySelectorAll('.scale_date');
      var scaledayss = this.el.nativeElement.querySelectorAll('.scaledays');
      console.log(scaledayss);
      let scaleData = [];
      var scalestream$ = from(scalechkbx);
      scalestream$.pipe(filter((val: any) => val.checked)).subscribe((res: any) => {
        let scaledata: any = {}
        scaledata.scale_name = res.value;
        let parstat = scalescore[parseInt(res.id) - 100].value;
        scaledata.scale_score = parstat;
        scaledata.scale_date = scaledate[res.id - 100].value;
        scaledata.scaledays = scaledayss[res.id - 100].value;
        console.log(scaledayss);
        scaleData.push(scaledata);
      })
  
      var medsyms = this.el.nativeElement.querySelectorAll('.symtoms_meds');
      let syn_meds = [];
      var med_syn_stream$ = from(medsyms);
      med_syn_stream$.pipe(filter((val: any) => val.checked)).subscribe((res: any) => {
        syn_meds.push(res.value);
      })
  
      var psysyms = this.el.nativeElement.querySelectorAll('.symtoms_psy');
      let syn_psy = [];
      var psy_syn_stream$ = from(psysyms);
      console.log(psysyms)
      psy_syn_stream$.pipe(filter((val: any) => val.checked)).subscribe((res: any) => {
        syn_psy.push(res.value);
        console.log(res)
      })
      var psy_psyms = { psy_symptoms: syn_psy }
      var med_syms = { meds_symptoms: syn_meds }
      var meds = { exmeds: medData }
      var scaleinfo = { scaleinfo: scaleData }
  
      let masterptdata = { ...meds, ...med_syms, ...psy_psyms, ...scaleinfo, ...form.value }
      this.service.submitMasterPatientData(masterptdata);
      this.toastr.success('', 'Patient Record Updated Successfully');
      if(this.previousRoute == '/patient'){
      this.router.navigate(['/patient']);
      }else{
        this.gotoreport();
      }
    }
    else{
      this.notvalidate = true;
    }
  
    // this.resetForm();
  }
  app() {
    setTimeout(() => {
      console.log("please call me");
      $("#myModalap").modal("show");
    }, 100)
  }
  getcurrentDate(): string {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth().toString().length == 1 ? "0" + d.getMonth().toString() : d.getMonth().toString();
    let date = d.getDate().toString().length == 1 ? "0" + d.getMonth().toString() : d.getMonth().toString();
    return `${year}-${month}-${date}`
  }
  logout() {
    this.service.logout()
  }
  ap() {
    this.service.topatient('yes');
  }
  af() {
    this.service.toprovider('yes');
  }
  ai() {
    this.service.toinsurance('yes');
  }
  ae() {
    this.service.toexpensive('yes');
  }
  gotoreport(){
    this.service.toreport('yes');
  }
  fill(e) {
    if (e == "yes" && this.combined.flag == 0) {
      setTimeout(() => {
        this.el.nativeElement.querySelectorAll('.scaleschkbx').forEach(res => {
          if (this.default_scales.includes(res.value)) {
            res.checked = 1;
          }
        })
      }, 1000)
      // setTimeout(()=>{
      //   this.masterobj.visit.scaleinfo.forEach(res => {
      //     if (this.scale60days.includes(res.value)) {
      //         res.scaledays = "60 Days"
      //     }
      //   })
      // },1000)
    }
  }
}
