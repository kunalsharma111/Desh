import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../shared/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  toggle:number=1;
  an;
  constructor(public http: HttpClient, public service: DataTransferService,private toastr: ToastrService,public router: Router) { }
  user = {
    email: '',
    pwd: ''
  }
  userr = {
    oo:'',
    em:''
  }
  userrr = {
    pw1:'',
    em:''
  }
  resetForm(form: NgForm) {
    this.user.email = '';
  }
  resetFormm(formm: NgForm) {
    this.userr.oo = '';
    this.userr.em = '';
  }
  resetFormmm(formmm: NgForm) {
    this.userrr.pw1 = '';
    this.userr.em = '';
  }

  ngOnInit() {
  }
  move(){
    this.toggle = 1;
  }
  submit(form) {
    this.service.sendotp(form).subscribe(res => {
      this.toastr.show('Mail Sent','Enter OTP below to reset password');
      // this.a = res.em;  
      console.log(res.e);
      this.an = res.e; 
      this.toggle = 2;
    },
      (err) => {
        if (err instanceof HttpErrorResponse)
        console.log("kidr");
          this.toastr.error('','This Email is not registered with any account !');
      });
      // this.resetForm(form);
  }
  submitt(formm) {
    formm.value.em =  this.an;
    console.log(formm.value);
    this.service.compareotp(formm).subscribe(res => {
      this.toastr.show('Correct OTP','Enter New password');
      console.log(res);
      this.toggle = 3;
    },
      (err) => {
        if (err instanceof HttpErrorResponse)
          this.toastr.error('','Wrong OTP');
      });
      this.resetFormm(formm);  
    }
    submittt(formmm) {
      formmm.value.em =  this.an;
      console.log(formmm.value);
      this.service.newpassword(formmm).subscribe(res => {
        this.toastr.show('Password changed Successfully','Login With New Password');
        this.router.navigate(['/']);
        console.log(res);
      },
        (err) => {
          if (err instanceof HttpErrorResponse)
            this.toastr.error('','Password change failed');
        });
        this.resetFormmm(formmm);  
      }

}
