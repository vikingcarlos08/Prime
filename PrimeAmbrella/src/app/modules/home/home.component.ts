import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../services/register.service";
import { registerInfo } from "../../services/model/register.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeInfo: registerInfo [] = [];
  homeForm = new registerInfo();

  constructor(
    private regService: RegisterService,
    private router: ActivatedRoute
  ) { 
    router.queryParamMap.subscribe( param => {
      if(param.has("id")){
        this.homeForm.id = parseInt(param.get("id"));
      }
    })

  }

  
  ngOnInit() {
    this.getUser();
    
  }

  async getUser(){
    this.homeForm = await this.regService.getUser(this.homeForm.id);
    console.log(this.homeForm)
  }

}
