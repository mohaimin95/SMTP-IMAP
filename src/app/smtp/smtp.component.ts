import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.css']
})
export class SmtpComponent implements OnInit {
  smtpForm:FormGroup = new FormGroup({
    provider:new FormControl(""),
    username:new FormControl(),
    password:new FormControl(),
  });
  response:Object;
  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }
  submitSMTP() {
    this.apiService.verifySMTP(this.smtpForm.value).subscribe(res=>{
      console.log("Got Response",res);
      
      this.response = res;
    },err=>{
      this.response = err;
      console.log("Got Error",err);
    })
  }

}
