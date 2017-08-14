import { Component,OnInit ,ViewChild ,ElementRef,ChangeDetectorRef,NgModule, NO_ERRORS_SCHEMA , ViewContainerRef } from "@angular/core";
import {Page} from "ui/page";
import {Router} from "@angular/router";
import {View} from "ui/core/view";
import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";
import * as colorModule from "tns-core-modules/color";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import * as application from 'application';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import { OuthService } from "../../shared/outh/outh";
import * as Toast from "nativescript-toast";
import {AnimationCurve} from "ui/enums";
import {KeyframeAnimation} from "ui/animation/keyframe-animation";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { DockLayout } from 'ui/layouts/dock-layout';
var permissions = require( "nativescript-permissions" );
import * as camera from "nativescript-camera";
import * as ImageSource from "image-source";
import { Image } from "ui/image";
import { Button } from "ui/button";
import { MinLengthDirective, IsEmailDirective , IsMobileDirective} from "../../utils/inputValidation";
var icModule = require("nativescript-imagecropper");
var Color = colorModule.Color;
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { setPasswordComponents } from '../modals/setPW/setpassword.components';
import * as dialogs from "ui/dialogs";
let imagepicker = require("nativescript-imagepicker");
import {LoadingIndicator} from "nativescript-loading-indicator";


var loader = new LoadingIndicator();

declare var android: any;

require( "nativescript-localstorage" );
@Component({
  selector: "signup",
  templateUrl:"./pages/signup/signup.component.html",
  styleUrls: ["pages/signup/signup.components.css"],
  providers: [MinLengthDirective ,IsEmailDirective, IsMobileDirective,setPasswordComponents,OuthService],
})



export class signupComponent  implements OnInit{
  @ViewChild("email") email: ElementRef;
  @ViewChild("fullname") fName:ElementRef;
  @ViewChild("mobnumber") mobileNumber:ElementRef;
  @ViewChild("password") password:ElementRef;

 public account;
 constructor(private page: Page,private oauth:OuthService,private viewRef: ViewContainerRef,private modal:ModalDialogService,private router:Router, private MinLengthDirective:MinLengthDirective,private IsEmailDirective:IsEmailDirective,private mobile:IsMobileDirective, private fonticon: TNSFontIconService,private _changeDetectionRef: ChangeDetectorRef) {
 this.account={
     fullname:"",
     email:"",
     mobile:"",
     profile_pic:"",
     password:""
 }
}

goback(){
  this.router.navigate(["/"]);
}
startCameraTap(){
  camera.requestPermissions();
  camera.takePicture({  keepAspectRatio: true, saveToGallery: true }).then(imageAsset => {
        let imgviwer=<Image>this.page.getViewById("imageviwer");
        let imgpicker=<Button>this.page.getViewById("imgpicker");
        imgpicker.visibility="collapse";
        imgviwer.style.width=130;
        imgviwer.style.height=130;
        imgviwer.visibility="visible";
        imgviwer.src=imageAsset;

        let myImageSource=new ImageSource.ImageSource();
        ImageSource.fromAsset(imageAsset).then(res => {
               myImageSource= res;
               var base64 = myImageSource.toBase64String("jpeg", 100);
               this.account.profile_pic=base64;
           })
    }).catch((err) => {
        console.log("Error -> " + err.message);
    });
}
   onSelectSingleTap() {
       let context = imagepicker.create({
           mode: "single"
       });

       this.startSelection(context,this.account);
   }

   startSelection(context,account) {
        var base64="";
       context
           .authorize()
           .then(() => {
               return context.present();
           })
           .then((selection) => {
               console.log("Selection done:");
               let imgviwer=<Image>this.page.getViewById("imageviwer");
               let imgpicker=<Button>this.page.getViewById("imgpicker");

               selection.forEach(function (selected) {
                  imgviwer.src=selected.fileUri;
                  selected.getImage().then(res=>{
                     base64 = res.toBase64String("jpeg", 100);
                     account.profile_pic=base64;
                  });
               });

               imgpicker.visibility="collapse";
               imgviwer.style.width=130;
               imgviwer.style.height=130;
               imgviwer.visibility="visible";
               this._changeDetectionRef.detectChanges();
           }).catch(function (e) {
               console.log(e);
           });

   }


showDialog(){
  dialogs.action({
    message: "Image Source",
    cancelButtonText: "Cancel text",
    actions: ["Camera", "Gallery"]
}).then(result => {
    console.log("Dialog result: " + result);
    if(result == "Camera"){
      this.startCameraTap();
    }else if(result == "Gallery"){
      this.onSelectSingleTap();
    }
});
}


setTextFieldColors() {
   let emailTextField = <TextField>this.email.nativeElement;
   let fullnameTextField=<TextField>this.fName.nativeElement;
   let mobilenumberTextField=<TextField>this.mobileNumber.nativeElement;
   let passwordTextField=<TextField>this.password.nativeElement;
   emailTextField.fontSize=18;
   let hintColor=new Color("#ffffff");
   setHintColor({ view: emailTextField, color: hintColor });
   setHintColor({ view: fullnameTextField, color: hintColor });
   setHintColor({ view: mobilenumberTextField, color: hintColor });
   setHintColor({view: passwordTextField, color:hintColor});
 }

 ngOnInit() {
     setTimeout(()=>{this. setTextFieldColors();},2);
     this.page.actionBarHidden=true;
     this.page.style.backgroundImage= "~/pages/signup/imgs/background.jpg";
     this.page.style.backgroundRepeat="no-repeat";
     this.page.style.backgroundSize="100% 100%";
      let docklayout=<DockLayout>this.page.getViewById('docklayout_rightb');
      docklayout.borderRightWidth=8;
      docklayout.borderTopRightRadius=200;
      docklayout.borderBottomRightRadius=200;

      permissions.requestPermission([android.Manifest.permission.READ_SMS,android.Manifest.permission.READ_EXTERNAL_STORAGE,android.Manifest.permission.WRITE_EXTERNAL_STORAGE,android.Manifest.permission.CAMERA], "I need these permissions please");

 }
 signup(account){
   var option = {
    message: 'please wait...'
    };

  this.oauth.signup(account,loader,option).subscribe((data)=>{
  //check if user has been created or if the is an error
  if(data.successfulTransaction){
    this.modal.showModal(setPasswordComponents,{
      context:{msg:localStorage.getItem("user_uuid")},
      fullscreen: true,
      viewContainerRef: this.viewRef,
    }).then((result)=>{
     if(result){
       let username=localStorage.getItem("email");
       let password=localStorage.getItem("password");
       let user={email:"",password:""};
       user.email=username;
       user.password=password;
       console.log("signup "+JSON.stringify(user))
        this.oauth.login(user).subscribe();

     }
    }).catch((err)=>{console.log(err)});
  }
 });
 }



}
