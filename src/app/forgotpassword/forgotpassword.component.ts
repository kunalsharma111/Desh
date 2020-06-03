import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../shared/data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  toggle:boolean=true;
  an;
  constructor(public http: HttpClient, public service: DataTransferService,private toastr: ToastrService) { }
  user = {
    email: '',
    pwd: ''
  }
  userr = {
    oo:'',
    em:this.an
  }
  resetForm(form: NgForm) {
    this.user.email = '';
  }
  resetFormm(formm: NgForm) {
    this.userr.oo = '';
  }
  a;
  ngOnInit() {
  }
  submit(form) {
    this.service.sendotp(form).subscribe(res => {
      this.toastr.show('Mail Sent','Enter OTP below to reset password');
      // this.a = res.em;  
      console.log(res.e);
      this.an = res.e; 
    },
      (err) => {
        if (err instanceof HttpErrorResponse)
        console.log("kidr");
          this.toastr.error('','This Email is not registered with any account !');
      });
      // this.resetForm(form);
      this.toggle = false;
  }
  submitt(formm) {
    this.service.compareotp(formm).subscribe(res => {
      this.toastr.show('Correct OTP','Enter New password');
      console.log(res);
    },
      (err) => {
        if (err instanceof HttpErrorResponse)
          this.toastr.error('','Wrong OTP');
      });
      this.resetFormm(formm);
  }
}
