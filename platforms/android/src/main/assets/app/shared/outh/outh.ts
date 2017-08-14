import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as Toast from "nativescript-toast";
import { Config } from "../config";
import * as connectionType from "../../utils/connection";
import {RouterExtensions} from "nativescript-angular/router";
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();

require( "nativescript-localstorage" );


@Injectable()
export class OuthService {
  constructor(private http: Http,private router:RouterExtensions ) {}
  loadUser(uuid,access_token){

    loader.show({message:"please wait..."})
    let headers=new Headers();
    headers.append("orgname",Config.orgname);
    headers.append("appname",Config.appname);
    headers.append("token",access_token);
    let apiUrl=<String>Config.apiUrl+"/find/users/"+uuid;

    return this.http.get(apiUrl,{headers:headers}).map(res=>{
      loader.hide();
      if(res.json().successfulTransaction===false){
        console.log("error find user ="+JSON.stringify(res.json()))
        return res.json();

      }
      return res.json();
    });


  }
  signup(user,loader,loaderOptions){
    loader.show(loaderOptions);

    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("orgname",Config.orgname);
    headers.append("appname",Config.appname);
    headers.append("clientid",Config.clientid);
    headers.append("clientsecret",Config.clientsecret);

    return this.http.post(
      Config.apiUrl+"/createuser",
      JSON.stringify({
        username:user.fullname,
        name:user.fullname,
        email:user.email,
        mobile:user.mobile,
        password:user.password,
        picture:user.profile_pic,
        usertype:"enduser"
      }),
      {headers:headers}
    ).map(response=>{
      loader.hide();
      response.json();


      if(response.json().successfulTransaction==false){
       if(response.json().result.error_description){
         this.showToast(response.json().result.error_description);
       }else{
          this.showToast(response.json().result);
       }


      }else{
        localStorage.setItem("email",user.email);
        localStorage.setItem("password",user.password);
        localStorage.setItem("user_uuid",response.json().data);
      }
      return response.json();
    }).do(response=>{
      console.log("RESULT: ", JSON.stringify(response))
    }).catch(this.handleErrors);
  }


  BGvarification(vcode){
    let user_uuid=localStorage.getItem('user_uuid');
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("orgname",Config.orgname);
    headers.append("appname",Config.appname);
    headers.append("clientid",Config.clientid);
    headers.append("clientsecret",Config.clientsecret);

    return this.http.post(
      Config.apiUrl+"/varify",
      JSON.stringify({
        uuid:user_uuid,
        vcode:vcode
      }),
      {headers:headers}
    ).map(response=>{
      response.json();
      if(response.json().successfulTransaction==false){
      }
      return response.json();
    }).do(data=>{console.log(data)}).catch(this.handleErrors);

  }


  varification(vcode,loader,loaderOptions){
    loader.show(loaderOptions);
    let user_uuid=localStorage.getItem('user_uuid');
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("orgname",Config.orgname);
    headers.append("appname",Config.appname);
    headers.append("clientid",Config.clientid);
    headers.append("clientsecret",Config.clientsecret);

    return this.http.post(
      Config.apiUrl+"/varify",
      JSON.stringify({
        uuid:user_uuid,
        vcode:vcode
      }),
      {headers:headers}
    ).map(response=>{
      loader.hide();
      response.json();
      if(response.json().successfulTransaction==false){
        if(response.json().result.error_description){
          this.showToast(response.json().result.error_description);
        }else{
           this.showToast(response.json().result);
        }
      }
      return response.json();
    }).do(data=>{console.log(data)}).catch(this.handleErrors);

  }


  sendVcode(loader,loaderOptions){
    loader.show(loaderOptions);
    let user_uuid=localStorage.getItem('user_uuid');
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("orgname",Config.orgname);
    headers.append("appname",Config.appname);
    headers.append("clientid",Config.clientid);
    headers.append("clientsecret",Config.clientsecret);

    return this.http.post(
      Config.apiUrl+"/sendvarification",
      JSON.stringify({
        uuid:user_uuid
      }),
      {headers:headers}
    ).map(response=>{
      loader.hide();
      response.json();
      if(response.json().successfulTransaction==false){
        if(response.json().result.error_description){
          this.showToast(response.json().result.error_description);
        }else{
           this.showToast(response.json().result);
        }
      }
    }).do(data=>{}).catch(this.handleErrors);

  }



  login(user) {
          loader.show({message:"please wait..."});
          let headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("orgname",Config.orgname);
          headers.append("appname",Config.appname);
          return this.http.post(
            Config.apiUrl + "/login",
            JSON.stringify({
              username: user.email,
              password: user.password,
            }),
            { headers: headers }
          )
          .map(response => {
            if(response.json().successfulTransaction==false){
              console.log("error "+response.json().result.error_description);
              this.showToast(response.json().result.error_description);
              loader.hide();
              return;
            }

            console.log("login "+JSON.stringify(response.json()))
            try{
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              localStorage.removeItem("user_uuid");
            }catch(e){
              console.log(e)
            }
            localStorage.setItem("access_token",response.json()._client);
            localStorage.setItem("user_profile",response.json()._data);

            this.router.navigate(["/landing"],{ clearHistory:true});
          }).do(data=>{
            loader.hide();
          })
          .catch(this.handleErrors);

}


  handleErrors(error: Response) {
    connectionType.connectionType();
    console.log("outh error "+JSON.stringify(error.json()));
    return Observable.throw(error);
  }

showToast(txt){
  const toast=Toast.makeText(txt);
  toast.show();
}

}
