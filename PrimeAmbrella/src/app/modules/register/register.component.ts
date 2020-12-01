import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { registerInfo } from "../../services/model/register.model";
import { Router } from "@angular/router";
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  repPass: string;
  regInfo = new registerInfo();
  regExist: registerInfo [] = [];
  prompt: string [] = [];
  buttonFlag: boolean = false;

  constructor(
    private _regService: RegisterService,
    private _route: Router
    ) { }

  ngOnInit() {
    this.getUser()
  }
  async getUser(){
    this.regExist = await this._regService.getAllUser();
  }

  async validateInputs(){
    await this.checkIfPasswordIsSame();
    this.prompt = [];
    let fName = 'First Name';
    let lName = 'Last Name';
    let uname = 'Username';
    let pword = 'Password';

    if ((this.firstName == '' || this.firstName == undefined) || (this.lastName == '' || this.lastName == undefined) 
    || (this.username == '' || this.username == undefined) || (this.password == '' || this.password == undefined) ){
      if(this.firstName == '' || this.firstName == undefined)
        this.prompt.push(fName + " is required");  
      if(this.lastName == '' || this.lastName == undefined)
        this.prompt.push(lName + " is required");
      if(this.username == '' || this.username == undefined)
        this.prompt.push(uname + " is required");
      if(this.password == '' || this.password == undefined)
        this.prompt.push(pword + " is required"); 
      this.buttonFlag = true;
    }
    else{
      let val = this.checkIfUsernameExist()
      if((await val).length > 0){
        this.prompt.push("Username already exist");
      }
      else{
        this.buttonFlag = false;
        await this.saveRegistration();
      }
    }
  }

  async saveRegistration(){
    let retVal = await this.checkIfUsernameExist();
    this.regInfo.firstName = this.firstName;
    this.regInfo.lastName = this.lastName;
    this.regInfo.username = this.username;
    this.regInfo.password = this.password;
    await this._regService.saveRegistration(this.regInfo);
    this.prompt.push("Registration complete")
    setTimeout(() => {
      this._route.navigateByUrl("login")
    }, 3000);
  }

  async checkIfPasswordIsSame(){
    this.prompt = [];
    if(this.password !== this.repPass){
      this.prompt.push("Your password must be the same");
      this.buttonFlag = true;
    }
    else
      this.buttonFlag = false;
      
  }

  async checkIfUsernameExist(){
    let value = this.regExist.filter( item => item.username == this.username );
    return value;
  }
  


}
