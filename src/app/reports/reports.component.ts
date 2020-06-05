import { Component, OnInit, Renderer2, ViewChild, ElementRef, PLATFORM_ID, Inject, Provider } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTransferService, PatientRound2, Facility } from '../shared/data-transfer.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any
import 'jspdf-autotable'
// import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  role;
  isBrowser;
  constructor(public service: DataTransferService, public renderer: Renderer2) {
    // this.isBrowser = isPlatformBrowser(platformId);
  }
  @ViewChild('ball', { static: true }) ball;
  @ViewChild('table', { static: false }) table: ElementRef;
  round2patients: any;
  report: {
    insurance: string;
    provider: string;
    date: Date;
  }
  resetform(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.repo = {
      facility: '',
      provider: '',
      date: null
    }
  }
  fname: string;
  metaData = false;
  patients: any;
  providers:Provider;
  facilities:Facility;
  output:any;
  providerreportoutput:any;
  facilityreportoutput:any;
  logout() {
    this.service.logout();
  }
  ngOnInit() {
    this.service.cc6$
    .subscribe(
      message => {
        if (message === 'yes') {
          this.open();
        }
      }
    )
    this.resetform();
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
    this.service.getData()
      .subscribe(
        res => {
          let user = res;
          this.fname = user.fname;
          this.role = user.userrole;
          this.metaData = true;
        }, err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.service.router.navigateByUrl('/');
          }
        })
    this.service.getProvider().subscribe(res => {
      this.providers = res;
      console.log(this.providers);
    });
    this.service.getFacility().subscribe(res => {
      this.facilities = res;
    })
  }
  
  repo:{
    facility:string,
    provider:string,
    date:string
  }
  repo1:{
    provider1:string,
    fromdate:string,
    todate:string
  }
  repo2:{
    facility1:string,
    fromdate1:string,
    todate1:string
  }
  showit = true;
  gammma = false;
  fn;
  pn;
  dd;
  submit(form) {
    localStorage.setItem("facility",form.value.facility);
    localStorage.setItem("provider",form.value.provider);
    localStorage.setItem("date",form.value.date);
    console.log(form.value);
    this.service.findprerecords(form.value).subscribe(res =>{
      this.output = res;
      this.gammma =true;
      this.showit = false;
    })
    this.fn = this.repo.facility;
    this.pn = this.repo.provider;
    this.dd = this.repo.date;
    this.resetform();
  }

  submitproviderreport(form){
    console.log(form.value);
    this.service.findproviderreport(form.value).subscribe(res =>{
      this.providerreportoutput = res;
    })
  }
  submitfacilityreport(form){
    console.log(form.value);
    this.service.findfacilityreport(form.value).subscribe(res =>{
      this.facilityreportoutput = res;
    })
  }

  submit2(obj) {
    localStorage.setItem("facility",obj.facility);
    localStorage.setItem("provider",obj.provider);
    localStorage.setItem("date",obj.date);
    console.log(obj);
    this.service.findprerecords(obj).subscribe(res =>{
      this.output = res;
      this.gammma =true;
      this.showit = false;
    })

    this.fn = obj.facility;
    this.pn = obj.provider;
    this.dd = obj.date;
    this.resetform();
  }
  
  ap() {
    this.service.topatient('yes');
  }
  app() {
    this.service.toprovider('yes');
  }
  af() {
    this.service.tofacility('yes');
  }
  ai() {
    this.service.toinsurance('yes');
  }
  ae() {
    this.service.toexpensive('yes');
  }
  public downloadAsPDF() {
    // if (this.isBrowser) {
    const jsPDF = require('jspdf')
    // const pdf = new jsPDF('p', 'mm', 'a4')
    // pdf.addImage(imgBlob, 'PNG', 0, 0)
    // pdf.save('test.pdf')
    const doc = new jsPDF();
    console.log(doc);

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.table.nativeElement;

    doc.autoTable({ html: pdfTable })
    doc.save('table.pdf')
    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   width: 200,
    //   'elementHandlers': specialElementHandlers
    // });

    doc.save('tableToPdf.pdf');
  }
  // }
  open() {
    setTimeout(() => {
      console.log("please call me");
      $("#myModalap").modal("show");

    let f = localStorage.getItem("facility");
    let p = localStorage.getItem("provider");
    let d = localStorage.getItem("date");
    console.log(f+p+d);
   var obj = {
      facility:f,
      provider:p,
      date:d
    }
    // console.log(obj.facility);
    this.submit2(obj);
    }, 100)
  }
}
