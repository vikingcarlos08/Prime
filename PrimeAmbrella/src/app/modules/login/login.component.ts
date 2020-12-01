import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../services/register.service";
import { registerInfo } from "../../services/model/register.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo: registerInfo [] = [];
  loginForm = new registerInfo();
  prompt: string [] = [];

  constructor(
    private _regService: RegisterService,
    private router: Router
    ) { }

  ngOnInit() {
      this.getUser();
  }

  async getUser(){
    this.loginInfo = await this._regService.getAllUser();
  }

  async loginFunction(){
    this.prompt = [];
    let logInfo = this.loginInfo.filter(item => item.username == this.loginForm.username);
    if(logInfo.length > 0){
      let val = await this.checkIfPasswordIsSame(logInfo)
      if(val != undefined){
        this.router.navigateByUrl("/home?id="+ val.id)
      }
      else{
        this.prompt.push("Incorrect Username/Password")
      }
    }
    else{
      this.prompt.push("Account does not exist")
    }
  }

  async checkIfPasswordIsSame(value: registerInfo[]){
    return value.find(item => item.password == this.loginForm.password)
  }



}
