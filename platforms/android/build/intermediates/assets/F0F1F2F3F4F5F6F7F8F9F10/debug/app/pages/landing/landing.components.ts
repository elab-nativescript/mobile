import { Component,OnInit,NgModule,ViewChild} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {Page} from "ui/page";
import { Image } from "ui/image";
import * as ImageSource from "image-source";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import * as colorModule from "tns-core-modules/color";
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { View } from 'ui/core/view';
import { OuthService } from "../../shared/outh/outh";

var loader = new LoadingIndicator();
var Color = colorModule.Color;

@Component({
  selector:'landing',
  templateUrl:'./pages/landing/landing.components.html',
  styleUrls:['pages/landing/landing.components.css'],
  providers:[OuthService]

})

export class landingComponents implements OnInit{
  private drawer: SideDrawerType;
  private email: String;
  private username:String;
  constructor(private page:Page,private OuthService:OuthService){

  }

  @ViewChild(RadSideDrawerComponent)
   public drawerComponent: RadSideDrawerComponent;

ngOnInit(){
  this.page.actionBarHidden=true;
  let user_profile=localStorage.getItem('user_profile');
  let user_name=user_profile['name'];
  let user_profile_pic=user_profile['picture'];
  let profile_img=<Image>this.page.getViewById('profile_pic');
  profile_img.stretch="aspectFill";
  profile_img.src="data:image/png;base64,"+user_profile_pic;
  this.email=user_profile['email'];
  this.username=user_profile['username'];

  }



  public onMenuTapped(value: any) {
        console.log(value);
        this.drawer.closeDrawer();
    }
}
