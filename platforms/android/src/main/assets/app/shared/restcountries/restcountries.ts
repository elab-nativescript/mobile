import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();
@Injectable()
export class restcountries{
  constructor(private http: Http) {}
  //get all countries
  getAllcountries(){
    loader.show({message:"please wait..."})
    let headers=new Headers();
    let apiUrl="https://restcountries.eu/rest/v2/all";

    return this.http.get(apiUrl).map(res=>{
      loader.hide();
      return res.json();
    });


  }
  getBycurreny(cur){
    loader.show({message:"please wait..."})
    let headers=new Headers();
    let apiUrl="https://restcountries.eu/rest/v2/currency/"+cur;

    return this.http.get(apiUrl).map(res=>{
      loader.hide();
      return res.json();
    });
  }

  getCurrencyRate(){
    loader.show({message:"please wait..."})
    let headers=new Headers();
    let apiUrl="http://www.apilayer.net/api/live?access_key=77de225989f08d68c492e43778a2d68f";

    return this.http.get(apiUrl).map(res=>{
      loader.hide();
      return res.json();
    });
  }

}
