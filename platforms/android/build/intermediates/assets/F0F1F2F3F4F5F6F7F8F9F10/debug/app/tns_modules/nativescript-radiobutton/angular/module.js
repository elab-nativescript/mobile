"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_registry_1 = require("nativescript-angular/element-registry");
var core_1 = require("@angular/core");
var directives_1 = require("./directives");
element_registry_1.registerElement("RadioGroup", function () { return require("nativescript-radiobutton").RadioGroup; });
element_registry_1.registerElement("RadioButton", function () { return require("nativescript-radiobutton").RadioButton; });
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
RadioButtonModule = __decorate([
    core_1.NgModule({
        declarations: [
            directives_1.RADIOBUTTON_DIRECTIVES
        ],
        exports: [
            directives_1.RADIOBUTTON_DIRECTIVES
        ]
    })
], RadioButtonModule);
exports.RadioButtonModule = RadioButtonModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEVBQXdFO0FBQ3hFLHNDQUF5QztBQUV6QywyQ0FBc0Q7QUFDdEQsa0NBQWUsQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLFVBQVUsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDO0FBQ3BGLGtDQUFlLENBQUMsYUFBYSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxXQUFXLEVBQS9DLENBQStDLENBQUMsQ0FBQztBQVd0RixJQUFhLGlCQUFpQjtJQUE5QjtJQUFpQyxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBQWxDLElBQWtDO0FBQXJCLGlCQUFpQjtJQVQ3QixlQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVixtQ0FBc0I7U0FDekI7UUFDRCxPQUFPLEVBQUU7WUFDTCxtQ0FBc0I7U0FDekI7S0FFSixDQUFDO0dBQ1csaUJBQWlCLENBQUk7QUFBckIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSYWRpb0dyb3VwLCBSYWRpb0J1dHRvbiB9IGZyb20gJy4uLyc7XG5pbXBvcnQgeyBSQURJT0JVVFRPTl9ESVJFQ1RJVkVTIH0gZnJvbSAnLi9kaXJlY3RpdmVzJztcbnJlZ2lzdGVyRWxlbWVudChcIlJhZGlvR3JvdXBcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1yYWRpb2J1dHRvblwiKS5SYWRpb0dyb3VwKTtcbnJlZ2lzdGVyRWxlbWVudChcIlJhZGlvQnV0dG9uXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcmFkaW9idXR0b25cIikuUmFkaW9CdXR0b24pO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBSQURJT0JVVFRPTl9ESVJFQ1RJVkVTXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFJBRElPQlVUVE9OX0RJUkVDVElWRVNcbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b25Nb2R1bGUgeyB9XG4iXX0=