import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Medication, DataTransferService } from '../shared/data-transfer.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any

@Component({
  selector: 'app-expensive',
  templateUrl: './expensive.component.html',
  styleUrls: ['./expensive.component.scss']
})
export class ExpensiveComponent implements OnInit {

  constructor(public service: DataTransferService, public toastr: ToastrService) { }
  
  fname = '';
  metaData = false;
  meds: Medication;
  role;
  medData: Medication;
  public searchString: string;
  ngOnInit() {
    this.resetForm();
    this.service.cc5$
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
    this.service.getMed().subscribe(res => {
      console.log(res);
      this.meds = res;
    })
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
  }
  resetForm(form?: NgForm) {
    this.edit = false
    if (form != null) {
      form.resetForm();
    }
    this.medData = {
      id: null,
      name: '',
      ain:'Active'
    }
  }
  logout() {
    this.service.logout();
  }
  s_id;
  edit = false;
  assign(data, id) {
    this.s_id = id;
    this.medData = data;
    this.edit = true
  }
  submit(form: NgForm) {
    console.log(form.value);
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
    this.service.sendMed(form).subscribe(res => {
      console.log(res);
      this.toastr.success('', 'Medicine Saved Successfully');
    })
    this.resetForm(form);
    this.ngOnInit();
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
    this.service.toinsurance('yes');
  }
  ae() {
    this.service.toprovider('yes');
  }

}
