import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTransferService, Insurance } from '../shared/data-transfer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var $: any
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  constructor(public service: DataTransferService, public toastr: ToastrService) { }

  fname = '';
  role;
  metaData = false;
  insurances: Insurance;
  insuranceData: Insurance;
  public searchString: string;
  ngOnInit() {
    this.resetForm();
    this.service.cc4$
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
  logout() {
    this.service.logout();
  }
  resetForm(form?: NgForm) {
    this.edit = false
    if (form != null) {
      form.resetForm();
    }
    this.insuranceData = {
      id: null,
      name: '',
      ain:'Active'
    }
  }
  s_id;
  edit=false
  assign(data, id) {
    this.s_id = id;
    this.insuranceData = data;
    this.edit = true
  }
  submit(form: NgForm) {
    console.log(form.value);
    this.service.sendInsurance(form).subscribe(res => {
      console.log(res);
      this.toastr.success('', 'Insurance Saved Successfully');
    })
    this.resetForm(form);

    $("#myModalap").modal("hide");
  }
  func() {
    this.resetForm();
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
    this.service.toprovider('yes');
  }
  ae() {
    this.service.toexpensive('yes');
  }
}
