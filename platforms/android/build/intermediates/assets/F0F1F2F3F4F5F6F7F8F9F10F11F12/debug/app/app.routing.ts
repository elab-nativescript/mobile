
import { homeComponent } from "./pages/home/home.component";
import { signupComponent } from "./pages/signup/signup.component";
import { setPasswordComponents } from './pages/modals/setPW/setpassword.components';
import { landingComponents } from './pages/landing/landing.components'
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");


export const routes = [
  { path: "", component: homeComponent },
  { path: "signup", component: signupComponent},
  { path:"setpassword",component: setPasswordComponents},
  { path:"landing",component:landingComponents}
];

export const navigatableComponents = [
  homeComponent, signupComponent,setPasswordComponents,landingComponents
];
