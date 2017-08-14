import { Injectable } from "@angular/core";
import * as connectivity from "connectivity";
import * as permissions from "nativescript-permissions";
import * as Toast from "nativescript-toast";

  declare var android: any
  var connectWith: string;
  let isConnected=false;
export function connectionType(){

  permissions.requestPermission(android.Manifest.permission.ACCESS_NETWORK_STATE, "I need these permissions because I'm cool")
         .then(() => {

             switch (connectivity.getConnectionType()) {
                 case connectivity.connectionType.none:
                     this.connectWith = "None";
                     const toast=Toast.makeText("There is no connection");
                     toast.show();
                     isConnected=false;
                     break;
                 case connectivity.connectionType.wifi:
                 isConnected=true;
                 break;
                 case connectivity.connectionType.mobile:
                 isConnected=true;
                 break;
                 default:
                 isConnected=false;
                 break;
             }
         })
         .catch(() => {
         });
return isConnected;
}
