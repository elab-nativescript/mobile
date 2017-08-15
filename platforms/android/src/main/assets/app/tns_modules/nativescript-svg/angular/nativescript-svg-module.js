"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_svg_directives_1 = require("./nativescript-svg-directives");
var NativeScriptSvgModule = (function () {
    function NativeScriptSvgModule() {
    }
    return NativeScriptSvgModule;
}());
NativeScriptSvgModule = __decorate([
    core_1.NgModule({
        declarations: [nativescript_svg_directives_1.DIRECTIVES],
        exports: [nativescript_svg_directives_1.DIRECTIVES],
    })
], NativeScriptSvgModule);
exports.NativeScriptSvgModule = NativeScriptSvgModule;
element_registry_1.registerElement("SVGImage", function () { return require("../").SVGImage; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LXN2Zy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuYXRpdmVzY3JpcHQtc3ZnLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywwRUFBd0U7QUFFeEUsNkVBQTJEO0FBTTNELElBQWEscUJBQXFCO0lBQWxDO0lBQXFDLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFBdEMsSUFBc0M7QUFBekIscUJBQXFCO0lBSmpDLGVBQVEsQ0FBQztRQUNOLFlBQVksRUFBRSxDQUFDLHdDQUFVLENBQUM7UUFDMUIsT0FBTyxFQUFFLENBQUMsd0NBQVUsQ0FBQztLQUN4QixDQUFDO0dBQ1cscUJBQXFCLENBQUk7QUFBekIsc0RBQXFCO0FBRWxDLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUF2QixDQUF1QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuXG5pbXBvcnQgeyBESVJFQ1RJVkVTIH0gZnJvbSBcIi4vbmF0aXZlc2NyaXB0LXN2Zy1kaXJlY3RpdmVzXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFU10sXG4gICAgZXhwb3J0czogW0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVTY3JpcHRTdmdNb2R1bGUgeyB9XG5cbnJlZ2lzdGVyRWxlbWVudChcIlNWR0ltYWdlXCIsICgpID0+IHJlcXVpcmUoXCIuLi9cIikuU1ZHSW1hZ2UpO1xuIl19