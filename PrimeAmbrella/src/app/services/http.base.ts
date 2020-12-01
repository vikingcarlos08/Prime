import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
  		private http: HttpClient
  	) {
      
    }

  	public toGet<T>(URL: string, params?: any) : Observable<any>{
      let httpHeader = new HttpHeaders({ 'Content-type' : 'application/json' });
      let queryParams = new HttpParams({fromObject: params })
      let methodCall = this.http.get(URL, { headers: httpHeader, params: queryParams || {} })
      
  		return methodCall;
  	}

    public toPost<T>(URL: string, payload: any , params?: object) : Observable<any>{
      let httpHeader = new HttpHeaders({ 'Content-type' : 'application/json' });
      let queryParams = new HttpParams(params)
      let _payload: any[];
      if(Array.isArray(payload)){
        _payload = payload;
      }
      else {
        _payload = [payload];
      }


      let methodCall = this.http.post(URL, _payload || {} 
      , { headers: httpHeader, params: queryParams })

      return methodCall;
    }

}	
