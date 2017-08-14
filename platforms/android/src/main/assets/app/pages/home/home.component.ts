import { Component,OnInit ,ViewChild ,ElementRef} from "@angular/core";
import {Page} from "ui/page";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular/router";
import {View} from "ui/core/view";
import { Image } from "ui/Image";
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
import { Border } from "tns-core-modules/ui/border";
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();

var Color = colorModule.Color;
@Component({
  selector: "home",
  providers: [OuthService ],
  templateUrl:"./pages/home/home.component.html",
  styleUrls: ["pages/home/home-common.css"],
})

export class homeComponent implements OnInit{
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
 public  usr = {
   name:"",
   password:""
 };
  private confettiView: any;
 constructor(private page: Page,private router: Router,private OuthService:OuthService,private fonticon: TNSFontIconService,private RouterExtensions:RouterExtensions) {
    this.usr={  name:"",password:""  };
   }



   setTextFieldColors() {
      let emailTextField = <TextField>this.email.nativeElement;
      let passwordTextField = <TextField>this.password.nativeElement;
      emailTextField.fontSize=20;
      passwordTextField.fontSize=20;
      let hintColor=new Color("#ffffff");
      setHintColor({ view: emailTextField, color: hintColor });
      setHintColor({ view: passwordTextField, color: hintColor });
    }
   ngOnInit() {
     setTimeout(()=>{this. setTextFieldColors();},1);
     this.page.actionBarHidden = true;
     this.page.style.backgroundImage= "~/pages/home/imgs/background.jpg";
     this.page.style.backgroundRepeat="no-repeat";
     this.page.style.backgroundSize="100% 100%";


     //check if the user already have been logedin
     try{
       let user_token=localStorage.getItem("access_token")['token'];
       let user_uuid=localStorage.getItem("user_profile")['uuid'];
           if(user_token&&user_uuid){
              this.OuthService.loadUser(user_uuid,user_token).subscribe((res)=>{
                if(res.successfulTransaction===true){
                  this.RouterExtensions.navigate(["/landing"],{clearHistory:true});
                }
              });
           }

     }catch(e){
       console.log(e);
     }


    }
   sigin(){
     this.OuthService.login(this.usr)
       .subscribe(
       () => console.log("test"));
   }
   signup(){
     this.router.navigate(["/signup"]);
   }

   textfield_validation(){
     let email_tf=this.page.getViewById<TextField>("email");
     let password_tf=this.page.getViewById<TextField>("password");
     if(email_tf.text==""){
        let animationInfo = this.page.getKeyframeAnimationWithName("notvalid");
        animationInfo.duration = 200;
        let animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
        animation.play(email_tf).then(() => {
            console.log("Played with code!");
        });
     }else if(password_tf.text==""){
       let animationInfo = this.page.getKeyframeAnimationWithName("notvalid");
       animationInfo.duration = 200;
       let animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
       animation.play(password_tf).then(() => {
           console.log("Played with code!");
       });
     }
   }



}
