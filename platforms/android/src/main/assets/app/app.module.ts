

import {  NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { MinLengthDirective, IsEmailDirective , IsMobileDirective} from "./utils/inputValidation";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    TNSFontIconModule.forRoot({
     'mdi': 'material-design-icons.css'
   }),

  ],

  declarations: [
    AppComponent,
    MinLengthDirective,
    IsEmailDirective,
    IsMobileDirective,
    SIDEDRAWER_DIRECTIVES,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
