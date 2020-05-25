import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTransferService } from '../shared/data-transfer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles = ['Admin', 'Provider', 'Data Entry Operator'];
  constructor(public ctrl: DataTransferService, public toastr: ToastrService) { }
  user;
  name: String;
  metaData
  ngOnInit() {
    this.name = '';
    this.ctrl.getData()
      .subscribe(
        res => {
          this.user = res;
          this.name = this.user.fname;
          this.metaData = true;
          console.log(typeof this.name);
        }, err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.ctrl.router.navigateByUrl('/');
          }
        })
    console.log(this.user)
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
    this.resetform();
  }
  resetform(form?: NgForm) {
    if (form != null) form.resetForm();
    this.ctrl.adminData = {
      fname: '',
      lname: '',
      email: '',
      pwd: '',
      mobile: '',
      userrole: ''
    }
  }
  submit(form: NgForm) {
    this.ctrl.transferToServer(form).subscribe(res => {
      // console.log(res);
      localStorage.setItem('token', res.token);
      this.toastr.success("","New User Created")
    });
    console.log("new user created")
    this.resetform()
    this.ctrl.router.navigateByUrl('/dashboard')
  }
  logout() {
    this.ctrl.logout();
  }
  ap() {
    this.ctrl.topatient('yes');
  }
  app() {
    this.ctrl.toprovider('yes');
  }
  af() {
    this.ctrl.tofacility('yes');
  }
  ai() {
    this.ctrl.toinsurance('yes');
  }
  ae() {
    this.ctrl.toexpensive('yes');
  }

}
