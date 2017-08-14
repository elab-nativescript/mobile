"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MinLengthDirective = MinLengthDirective_1 = (function () {
    function MinLengthDirective() {
    }
    MinLengthDirective.prototype.validate = function (control) {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    };
    return MinLengthDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MinLengthDirective.prototype, "minlength", void 0);
MinLengthDirective = MinLengthDirective_1 = __decorate([
    core_1.Directive({
        selector: '[minlength]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MinLengthDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], MinLengthDirective);
exports.MinLengthDirective = MinLengthDirective;
var IsEmailDirective = IsEmailDirective_1 = (function () {
    function IsEmailDirective() {
    }
    IsEmailDirective.prototype.validate = function (control) {
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        var valid = emailRegEx.test(control.value);
        return control.value < 1 || valid ? null : { 'email': true };
    };
    return IsEmailDirective;
}());
IsEmailDirective = IsEmailDirective_1 = __decorate([
    core_1.Directive({
        selector: '[email]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IsEmailDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], IsEmailDirective);
exports.IsEmailDirective = IsEmailDirective;
var IsMobileDirective = IsMobileDirective_1 = (function () {
    function IsMobileDirective() {
    }
    IsMobileDirective.prototype.validate = function (control) {
        var mobileRegEx = /^((079)|(078)|(077)){1}[0-9]{7}/;
        var valid = mobileRegEx.test(control.value);
        return control.value < 1 || valid ? null : { 'mobile': true };
    };
    return IsMobileDirective;
}());
IsMobileDirective = IsMobileDirective_1 = __decorate([
    core_1.Directive({
        selector: '[mobile]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: IsMobileDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], IsMobileDirective);
exports.IsMobileDirective = IsMobileDirective;
var MinLengthDirective_1, IsEmailDirective_1, IsMobileDirective_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5wdXRWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELHdDQUEyRTtBQU0zRSxJQUFhLGtCQUFrQjtJQUkzQjtJQUFzQixDQUFDO0lBRWhCLHFDQUFRLEdBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNuRyxDQUFDO0lBRUwseUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVJZO0lBQVIsWUFBSyxFQUFFOztxREFBbUI7QUFGbEIsa0JBQWtCO0lBSjlCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxxQkFBYSxFQUFFLFdBQVcsRUFBRSxvQkFBa0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7S0FDdEYsQ0FBQzs7R0FDVyxrQkFBa0IsQ0FVOUI7QUFWWSxnREFBa0I7QUFnQi9CLElBQWEsZ0JBQWdCO0lBRXpCO0lBQXNCLENBQUM7SUFFaEIsbUNBQVEsR0FBZixVQUFnQixPQUF3QjtRQUNwQyxJQUFJLFVBQVUsR0FBRyx5SkFBeUosQ0FBQztRQUMzSyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLGdCQUFnQjtJQUo1QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQWEsRUFBRSxXQUFXLEVBQUUsa0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0tBQ3BGLENBQUM7O0dBQ1csZ0JBQWdCLENBVTVCO0FBVlksNENBQWdCO0FBZ0I3QixJQUFhLGlCQUFpQjtJQUUxQjtJQUFzQixDQUFDO0lBRWhCLG9DQUFRLEdBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsSUFBSSxXQUFXLEdBQUcsaUNBQWlDLENBQUM7UUFDcEQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVMLHdCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxpQkFBaUI7SUFKN0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHFCQUFhLEVBQUUsV0FBVyxFQUFFLG1CQUFpQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztLQUNyRixDQUFDOztHQUNXLGlCQUFpQixDQVU3QjtBQVZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW21pbmxlbmd0aF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBNaW5MZW5ndGhEaXJlY3RpdmUsIG11bHRpOiB0cnVlfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbkxlbmd0aERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgQElucHV0KCkgbWlubGVuZ3RoOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xyXG4gICAgICAgIHJldHVybiAhY29udHJvbC52YWx1ZSB8fCBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm1pbmxlbmd0aCA/IG51bGwgOiB7IFwibWlubGVuZ3RoXCI6IHRydWUgfTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbZW1haWxdJyxcclxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogSXNFbWFpbERpcmVjdGl2ZSwgbXVsdGk6IHRydWV9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXNFbWFpbERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xyXG4gICAgICAgIGxldCBlbWFpbFJlZ0V4ID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC9pO1xyXG4gICAgICAgIGxldCB2YWxpZCA9IGVtYWlsUmVnRXgudGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZSA8IDEgfHwgdmFsaWQgPyBudWxsIDogeydlbWFpbCc6IHRydWV9O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1ttb2JpbGVdJyxcclxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogSXNNb2JpbGVEaXJlY3RpdmUsIG11bHRpOiB0cnVlfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElzTW9iaWxlRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcbiAgICAgICAgbGV0IG1vYmlsZVJlZ0V4ID0gL14oKDA3OSl8KDA3OCl8KDA3NykpezF9WzAtOV17N30vO1xyXG4gICAgICAgIGxldCB2YWxpZCA9IG1vYmlsZVJlZ0V4LnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWUgPCAxIHx8IHZhbGlkID8gbnVsbCA6IHsnbW9iaWxlJzogdHJ1ZX07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==