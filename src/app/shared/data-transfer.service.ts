import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

export interface Admin {
  fname: string;
  lname: string;
  pwd: string;
  email: string;
  mobile: string;
  userrole: string;
}
export interface Insurance {
  id: string;
  name: string;
  ain: string;
}
export interface Provider {
  id: string;
  name: string;
  insurance: string;
  ain: string;
}
export interface Medication {
  id: string;
  name: string;
  ain:string;
}
export interface combined {
  id: string;
  name: string,
  dob: Date,
  pcp: string;
  typevisit: string;
  visit: Date;
  seedoc: string;
  noseedocreason: string;
  stable: string;
  gdrstable: string;
  psythreapy: string;
  labs: string;
  labname: string;
  medmanage: string;
  reasonmedmanage: string;
  reasonpsy: string;
  psyscreen: string;
  psyscreenreason: string;
  followup: string;
  patientcondition: string
  unstable_text: string
  started: string;
  increase: string;
  decrease: string;
  stopped: string;
  medstopdate: Date;
  newappointmentrecord: string;
  added: string;
  addeddate: string;
  yesstable: string;
  nostable: string;
  theligible: string;
  pinsurance: string;
  sinsurance: string;
  facility: string;
  provider: string;
  room: string;
  medication: string;
  medicationName: string;
  generictest: string;
  genericresult: string;
  docterupload: string;
  demographicsheetuploaded: string;
  capacityassesment: string;
  capacity: string;
  bhi: string;
  ccm: string;
  bhiconcent: string;
  ccmconcent: string;
  medmanage2: string;
  scaleeligible: string;
  scale: string;
  comment: string;
  service_type: string,
  frequentlypsychotherapy: number,
  verystable: string,
  psymanage: string,
  seepsy: string,
  noseepsyreason: string,
  yesstablepsy: '',
  nostablepsy: '',
  verystablepsy: '',
  careconditiontimespent: string,
  medreason: string,
  othermedreason: string,
  geneticreason: string,
  othergeneticreason: string,
  medreason2: string;
  othermedreason2: string,
  psyreason: string,
  otherpsyreason: string,
  otherpsyscreenreason: string;
  bhireason: string,
  otherbhireason: string,
  ccmreason: string,
  otherccmreason: string,
  homeclinic: string,
  homeclinicconcent: string,
  homeclinicreason: string
  otherhomeclinicreason: string,
  masterstable: string,
  typevisitreason: string;
  masterstablereason: string;
  thtime: number,
  othernoseedocreason: string,
  psynoseedocreason: string,
  otherpsynoseedocreason: string,
  consult: string,
  conpsy: string,
  conmed: string,
  conscr: string,
  conpsyreason: string,
  conmedreason: string,
  conscrreason: string,
  conpsyname: string,
  currentmeds: string,
  np:string,
  cch:string,
  cchconcent:string,
  cchdate:Date,
  cchreason:string,
  othercchreason:string,
  medfollowup:string,
  followupreason:string,
  followupdays:Date,
  scaleeligiblereason:string,
  otherscaleeligiblereason:string,
  flag:Number,
  scaledays:string
}
export interface PatientRound2 {
  id: string;
  eval: string;
  visit: Date;
  seedoc: string;
  droped: string;
  stable: string;
  gdrstable: string;
  psythreapy: string;
  labs: string;
  labname: string;
  medmange: string;
  urgentcall: string;
  outreach: string;
  followup: string;
  patientcondition: string
  unstable_text: string
  started: string;
  increase: string;
  decrease: string;
  stopped: string;
  medstopdate: Date;
  psa: string;
  newappointmentrecord: string;
  providername: string;
  added: string;
  addeddate: string;
  yesstable: string;
  nostable: string;
}
export interface Facility {
  id: string;
  name: string;
  address: string;
  capacity: string;
  address1: string;
  address2: string;
  tof: string;
  sn: string;
  city:string;
  state:string;
  ain:string;
}
export interface Patient {
  id: string;
  name: string;
  dob: Date;
  theligible: string;
  pinsurance: string;
  sinsurance: string;
  facility: string;
  provider: string;
  room: string;
  medication: string;
  medicationName: string;
  generictest: string;
  genericresult: string;
  docterupload: string;
  demographicsheetuploaded: string;
  capacityassesment: string;
  capacity: string;
  bhi: string;
  ccm: string;
  scaleeligible: string;
  scale: string;
  comment: string;
  patientcondition: string,
  service_type: string,
  psychotherapydate: string,
  frequentlypsychotherapy: number,
}
@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  adminData: Admin;
  patientData: combined
  private c1 = new Subject<String>();
  cc1$ = this.c1.asObservable();
  private c2 = new Subject<String>(); cc2$ = this.c2.asObservable();
  private c3 = new Subject<String>(); cc3$ = this.c3.asObservable();
  private c4 = new Subject<String>(); cc4$ = this.c4.asObservable();
  private c5 = new Subject<String>(); cc5$ = this.c5.asObservable();
  metcha = 'https://deshdesh.herokuapp.com/api';
  // metcha = 'http://localhost:4000/api'
  url = `${this.metcha}/login`;
  url1 = `${this.metcha}/users`;
  url2 = `${this.metcha}/red`;
  url3 = `${this.metcha}/pat`;
  url4 = `${this.metcha}/patien`;
  url5 = `${this.metcha}/sendmoredata`;
  url6 = `${this.metcha}/r2`;
  url7 = `${this.metcha}/r2p`;
  url8 = `${this.metcha}/facilityadd`
  url9 = `${this.metcha}/getfacility`
  url10 = `${this.metcha}/insuranceadd`
  url11 = `${this.metcha}/getinsurance`
  url12 = `${this.metcha}/provideradd`
  url13 = `${this.metcha}/getprovider`
  url14 = `${this.metcha}/medadd`
  url15 = `${this.metcha}/getmed`;
  url16 = `${this.metcha}/goku`;
  url17 = `${this.metcha}/basedata`;
  url18 = `${this.metcha}/get`;
  url19 = `${this.metcha}/preround`;

  constructor(public http: HttpClient, public router: Router, public _route: ActivatedRoute) { }

  subject = new BehaviorSubject("123");
  checkLogin(form) {
    // console.log(this._route.snapshot.url);
    return this.http.post<any>(this.url, form.value);
  }
  transferToServer(form) {
    return this.http.post<any>(this.url1, form.value);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getData() {
    return this.http.get<any>(this.url2)
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  addBasePatientData(form) {
    console.log(form);
    return this.http.post<any>(this.url3, form);
  }
  getPatientData() {
    return this.http.get(this.url4);
  }
  sendMorePatientData(userForm) {
    return this.http.post<any>(this.url5, userForm);
  }
  sendDataRound2(data) {
    return this.http.post<any>(this.url6, data.value);
  }
  getR2Data() {
    return this.http.get<any>(this.url7);
  }
  sendFacility(form) {
    return this.http.post<any>(this.url8, form.value);
  }
  getFacility() {
    return this.http.get<any>(this.url9);
  }
  sendInsurance(form) {
    return this.http.post<any>(this.url10, form.value);
  }
  getInsurance() {
    return this.http.get<any>(this.url11);
  }
  sendProvider(form) {
    return this.http.post<any>(this.url12, form);
  }
  getProvider() {
    return this.http.get<any>(this.url13);
  }
  sendMed(form) {
    return this.http.post<any>(this.url14, form.value);
  }
  getMed() {
    return this.http.get<any>(this.url15);
  }
  topatient(message: string) {
    setTimeout(() => {
      this.c1.next('yes');
    }, 100)
    this.router.navigateByUrl('/patient');
  }
  tofacility(message: string) {
    setTimeout(() => {
      this.c2.next('yes');
    }, 100)
    this.router.navigateByUrl('/facility');
  }
  toprovider(message: string) {
    setTimeout(() => {
      this.c3.next('yes');
    }, 100)
    this.router.navigateByUrl('/provider');
  }
  toinsurance(message: string) {
    setTimeout(() => {
      this.c4.next('yes');
    }, 100)
    this.router.navigateByUrl('/insurance');
  }
  toexpensive(message: string) {
    setTimeout(() => {
      this.c5.next('yes');
    }, 100)
    this.router.navigateByUrl('/expensive');
  }
  createdownloadlink(some) {
    console.log("i do nothing")
  }
  submitMasterPatientData(data) {
    console.log("i am inside service and getting triggered")
    console.log(data);
    this.http.post<any>(this.url16, data).subscribe(res => {
      console.log(res)
    });
  }
  useriden(id?: string) {
    this.subject.next(id);
  }
  sendBaseData(data) {
    console.log(data)
    this.http.post<any>(this.url17, data).subscribe(res => {
      console.log(res);
    })
  }
  getByid(id) {
    const params = new HttpParams().set('id', id);
    console.log(params)
    return this.http.get<any>(this.url18,{params});
  }
  findprerecords(data) {
    //this is the data i get
    console.log(data);
    return this.http.post<any>(this.url19,data);
    // return this.http.post<any>(this.url19,data).subscribe(res=>{
    //   console.log(res)
    // })
  }
}
