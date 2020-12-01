import { Injectable } from '@angular/core';
import { registerInfo } from "./model/register.model";
import { HttpService } from "./http.base";
import { AppSettings } from "../appSettings/AppSettings";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpService) { }


  public getUser(id: Number = 0): Promise<registerInfo>{
    return this.http.toGet<registerInfo>(`${AppSettings.baseURL()}/user/getUser`, { id } ).toPromise();
  }

  public getAllUser(): Promise<registerInfo[]>{
    return this.http.toGet<registerInfo[]>(`${AppSettings.baseURL()}/user`).toPromise();
  }

  public saveRegistration(regInfo: registerInfo): Promise<number>{
    return this.http.toPost<number>(`${AppSettings.baseURL()}/user`, regInfo).toPromise();
  }

}
