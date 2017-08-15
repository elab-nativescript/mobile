import { Component,OnInit,NgModule,ViewChild} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {Page} from "ui/page";
import { Image } from "ui/image";
import * as ImageSource from "image-source";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import * as colorModule from "tns-core-modules/color";
import { restcountries } from "../../shared/restcountries/restcountries";
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
elementRegistryModule.registerElement("Carousel",()=>require("nativescript-carousel").Carousel)
elementRegistryModule.registerElement("CarouselItem",()=>require("nativescript-carousel").CarouselItem)
import { View } from 'ui/core/view';
import { OuthService } from "../../shared/outh/outh";

var loader = new LoadingIndicator();
var Color = colorModule.Color;

class Country {
    constructor(public name: string,public currency ,public currency_symbol ,public currencyRate) { }
}

let Countries = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF",
"BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC",
"CUP","CVE","CZK","DJF","DKK","DOP","DZD","EEK","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD",
"GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES",
"KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD",
"MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK"
,"PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD",
"SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","UYU","UZS","VEF","VND","VUV",
"WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];



@Component({
  selector:'landing',
  templateUrl:'./pages/landing/landing.components.html',
  styleUrls:['pages/landing/landing.components.css'],
  providers:[OuthService,restcountries]

})

export class landingComponents implements OnInit{
  private drawer: SideDrawerType;
  private email: String;
  private username:String;
  public countries: Array<Country>;
  constructor(private page:Page,private OuthService:OuthService,private restCountries:restcountries){
    this.countries = [];

       for (let i = 0; i < Countries.length; i++) {

          this.restCountries.getBycurreny(Countries[i]).subscribe((res)=>{
            for(let country of res){
              let currencie_symbol;
              for(let currencie of country.currencies ){
                currencie_symbol=currencie.symbol;
              }
              this.countries.push(new Country(country.name,Countries[i],currencie_symbol,""));

            }
          });
       }
       this.restCountries.getCurrencyRate().subscribe((res)=>{
         for(let exchange in res.quotes){
           let ex=exchange.split("USD");
           let same=this.countries.filter(Country=>Country.currency===ex[1]);
           if(same){
             for(let i=0;i<same.length;i++)
             same[i].currencyRate=res.quotes[exchange];
             }
         }
       });


  }

  @ViewChild(RadSideDrawerComponent)
   public drawerComponent: RadSideDrawerComponent;


   public onItemTap(args) {
          console.log("Item Tapped at cell index: " + args.index);
      }

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
