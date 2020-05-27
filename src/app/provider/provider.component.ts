import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTransferService, Provider, Insurance } from '../shared/data-transfer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var $: any

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  @ViewChild('row', { static: true }) row: ElementRef;
  constructor(public service: DataTransferService, public toastr: ToastrService, private renderer: Renderer2, public el: ElementRef) { }
  public searchString: string;

  fname = '';
  types = ['Medication management', 'Psychotherapist', 'Scale Performer'];
  metaData = false;
  providers: Provider;
  role;
  providerData: Provider;
  insurances: any;
  x = [1, 2, 3, 4, 5];
  some = [];
  some2 = [];
  @ViewChild('batch', { static: true }) batch: ElementRef;
  ngOnInit() {
    this.resetForm();
    this.service.cc3$
      .subscribe(
        message => {
          if (message === 'yes') {
            this.app();
          }
        }
      )
    this.service.getData()
      .subscribe(
        res => {
          let user = res;
          this.fname = user.fname;
          this.role =  user.userrole;
          this.metaData = true;
        }, err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.service.router.navigateByUrl('/');
          }
        })
    this.service.getProvider().subscribe(res => {
      console.log(res);
      this.providers = res;
    })
    this.service.getInsurance().subscribe(res => {
      console.log(res);
      this.insurances = res;
    })
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
  }
  add() {
    console.log(this.batch.nativeElement)
  }
  resetForm(form?: NgForm) {
    this.edit = false
    if (form != null) {
      form.resetForm();
    }
    this.providerData = {
      id: null,
      name: '',
      insurance: '',
      ain:'Active'
    }
    this.some2 = [];
    this.some = [];
    let arr = this.el.nativeElement.querySelectorAll(".chkbx");
    let arr1 = this.el.nativeElement.querySelectorAll(".chkbx2");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked) {
        arr[i].checked = false;
      }
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].checked) {
        arr1[i].checked = false;
      }
    }
  }
  s_id;
  edit = false;
  assign(data, id) {
    this.resetForm();
    this.edit = true
    this.s_id = id;
    this.providerData.name = data.name;
    this.providerData.ain = data.ain;
    console.log(this.providerData.name);
    let arr = this.el.nativeElement.querySelectorAll(".chkbx");
    let arr1 = this.el.nativeElement.querySelectorAll(".chkbx2");
    for (let i = 0; i < arr.length; i++) {
      data.insurance.forEach(element => {
        if (arr[i].value == element) {
          arr[i].checked = true;
        }
      })
    }
    for (let i = 0; i < arr1.length; i++) {
      data.role.forEach(element => {
        if (arr1[i].value == element) {
          arr1[i].checked = true;
        }
      })
    }
  }
  submit(form: NgForm) {
    console.log(form.value);
    console.log(this.el.nativeElement.querySelectorAll(".chkbx"))
    let arr = this.el.nativeElement.querySelectorAll(".chkbx");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked) {
        console.log('found');
        this.some.push(arr[i].value)
      }
    }
    let arr1 = this.el.nativeElement.querySelectorAll(".chkbx2");
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].checked) {
        console.log('found');
        this.some2.push(arr1[i].value)
      }
    }
    // console.log(this.some);
    // console.log(this.some2);
    form.value;
    let data = {
      insurance: this.some,
      role: this.some2,
      name: form.value.name,
      id: form.value.id,
      ain: form.value.ain
    }
    console.log(data+"print hoja");
    this.service.sendProvider(data).subscribe(res => {
      console.log(res);
      this.toastr.success('', 'Provider Saved Successfully');
    })
    this.resetForm(form);
    this.ngOnInit();
    $("#myModalap").modal("hide");
  }
  func() {
    this.resetForm();
  }
  logout() {
    this.service.logout();
  }
  app() {
    setTimeout(() => {
      console.log("please call me");
      $("#myModalap").modal("show");
    }, 100)
  }
  ap() {
    this.service.topatient('yes');
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
}
