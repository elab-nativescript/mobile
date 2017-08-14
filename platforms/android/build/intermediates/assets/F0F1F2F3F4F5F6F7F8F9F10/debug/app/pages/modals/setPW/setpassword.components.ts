import { Component,OnInit,NgModule} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import {Page} from "ui/page";
import * as colorModule from "tns-core-modules/color";
import { OuthService } from "../../../shared/outh/outh";
import { TextField } from "ui/text-field";
import {LoadingIndicator} from "nativescript-loading-indicator";
import * as inbox from "nativescript-sms-inbox";
var timer = require("timer");
var loader = new LoadingIndicator();

var Color=colorModule.Color;
@Component ({
selector:'setPassword',
templateUrl:'./pages/modals/setPW/setpassword.components.html',
styleUrls: ['pages/modals/setPW/setpassword.components.css'],
providers: [OuthService],
})

export class setPasswordComponents implements OnInit{
  public  isValid=false;
  public intervalId;
  constructor(private page: Page,private router:RouterExtensions,private params:ModalDialogParams,private OuthService:OuthService){

    this.intervalId=timer.setInterval(()=>{
      inbox.getInboxesFromNumber("Verify",{ max: 1 }).then((res)=>{
            if(res.data[0].message){
              console.log(JSON.stringify(res.data[0].message));
              this.varify(res.data[0].message);
            }
      },(err) => {
         console.log('Error read sms : ' + err);
     }).catch((err)=>{console.log(" error "+err)});

   },8000);

   timer.setTimeout(()=>{
       timer.clearInterval(this.intervalId);
   },10000);
   
  }

  ngOnInit(){

    this.page.backgroundColor=new Color("transparent");


  }

  public onChange(vcode){
    if(vcode.length===8){
      this.varify(vcode);
    }
  }


  public varify(vcode){
    var option = {
     message: 'please wait'
     };
    this.OuthService.varification(vcode,loader,option).subscribe((data)=>{
     if(data.successfulTransaction){
       this.isValid=true;
       this.close();

     }
    });
   }

   public BGvarify(vcode){
     this.OuthService.BGvarification(vcode).subscribe((data)=>{
      if(data.successfulTransaction){
        this.isValid=true;
        this.close();
      }
     });
    }

  public sendVcode(){
    var option = {
     message: 'please wait'
     };
    this.OuthService.sendVcode(loader,option).subscribe((data)=>{
     console.log(JSON.stringify(data))
    });
  }

  getLastVMessages() {
      inbox.getInboxesFromNumber("Verify",{ max: 1 }).then((res)=>{
            console.log(JSON.stringify(res.data[0].message));
            this.varify(res.data[0].message);
      },(err) => {
         console.log('Error read sms : ' + err);
     }).catch((err)=>{console.log(" error "+err)});
  }


  public close(){
    timer.clearInterval(this.intervalId);
    this.params.closeCallback(this.isValid);
  }
}
