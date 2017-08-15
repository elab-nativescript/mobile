"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var hint_util_1 = require("../../utils/hint-util");
var colorModule = require("tns-core-modules/color");
var outh_1 = require("../../shared/outh/outh");
var restcountries_1 = require("../../shared/restcountries/restcountries");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var permissions = require("nativescript-permissions");
var camera = require("nativescript-camera");
var ImageSource = require("image-source");
var inputValidation_1 = require("../../utils/inputValidation");
var icModule = require("nativescript-imagecropper");
var Color = colorModule.Color;
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var setpassword_components_1 = require("../modals/setPW/setpassword.components");
var dialogs = require("ui/dialogs");
var imagepicker = require("nativescript-imagepicker");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var country_code;
require("nativescript-localstorage");
var signupComponent = (function () {
    function signupComponent(page, oauth, restCountries, viewRef, modal, router, MinLengthDirective, IsEmailDirective, mobile, fonticon, _changeDetectionRef) {
        var _this = this;
        this.page = page;
        this.oauth = oauth;
        this.restCountries = restCountries;
        this.viewRef = viewRef;
        this.modal = modal;
        this.router = router;
        this.MinLengthDirective = MinLengthDirective;
        this.IsEmailDirective = IsEmailDirective;
        this.mobile = mobile;
        this.fonticon = fonticon;
        this._changeDetectionRef = _changeDetectionRef;
        country_code = "";
        this.countries = [];
        this.account = {
            fullname: "",
            email: "",
            mobile: "",
            profile_pic: "",
            password: ""
        };
        try {
            this.restCountries.getAllcountries().subscribe(function (res) {
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var country = res_1[_i];
                    for (var _a = 0, _b = country.callingCodes; _a < _b.length; _a++) {
                        var code = _b[_a];
                        _this.countries.push({ value: code, display: "  " + country.alpha3Code + " +" + code });
                    }
                }
                _this.selectedIndex = 1;
                _this.items = new nativescript_drop_down_1.ValueList(_this.countries);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    signupComponent.prototype.goback = function () {
        this.router.navigate(["/"]);
    };
    signupComponent.prototype.onchange = function (args) {
        this.page.getViewById("dropdown").style.color = new Color("#ffffff");
        country_code = "+" + this.items.getValue(args.newIndex);
    };
    signupComponent.prototype.onopen = function () {
        this.page.getViewById("dropdown").style.color = new Color("#22baa0");
        console.log("Drop Down opened.");
    };
    signupComponent.prototype.startCameraTap = function () {
        var _this = this;
        camera.requestPermissions();
        camera.takePicture({ keepAspectRatio: true, saveToGallery: true }).then(function (imageAsset) {
            var imgviwer = _this.page.getViewById("imageviwer");
            var imgpicker = _this.page.getViewById("imgpicker");
            imgpicker.visibility = "collapse";
            imgviwer.style.width = 130;
            imgviwer.style.height = 130;
            imgviwer.visibility = "visible";
            imgviwer.src = imageAsset;
            var myImageSource = new ImageSource.ImageSource();
            ImageSource.fromAsset(imageAsset).then(function (res) {
                myImageSource = res;
                var base64 = myImageSource.toBase64String("jpeg", 100);
                _this.account.profile_pic = base64;
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    signupComponent.prototype.onSelectSingleTap = function () {
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context, this.account);
    };
    signupComponent.prototype.startSelection = function (context, account) {
        var _this = this;
        var base64 = "";
        context
            .authorize()
            .then(function () {
            return context.present();
        })
            .then(function (selection) {
            console.log("Selection done:");
            var imgviwer = _this.page.getViewById("imageviwer");
            var imgpicker = _this.page.getViewById("imgpicker");
            selection.forEach(function (selected) {
                imgviwer.src = selected.fileUri;
                selected.getImage().then(function (res) {
                    base64 = res.toBase64String("jpeg", 100);
                    account.profile_pic = base64;
                });
            });
            imgpicker.visibility = "collapse";
            imgviwer.style.width = 130;
            imgviwer.style.height = 130;
            imgviwer.visibility = "visible";
            _this._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    };
    signupComponent.prototype.showDialog = function () {
        var _this = this;
        dialogs.action({
            message: "Image Source",
            cancelButtonText: "Cancel text",
            actions: ["Camera", "Gallery"]
        }).then(function (result) {
            console.log("Dialog result: " + result);
            if (result == "Camera") {
                _this.startCameraTap();
            }
            else if (result == "Gallery") {
                _this.onSelectSingleTap();
            }
        });
    };
    signupComponent.prototype.setTextFieldColors = function () {
        var emailTextField = this.email.nativeElement;
        var fullnameTextField = this.fName.nativeElement;
        var mobilenumberTextField = this.mobileNumber.nativeElement;
        var passwordTextField = this.password.nativeElement;
        emailTextField.fontSize = 18;
        var hintColor = new Color("#ffffff");
        hint_util_1.setHintColor({ view: emailTextField, color: hintColor });
        hint_util_1.setHintColor({ view: fullnameTextField, color: hintColor });
        hint_util_1.setHintColor({ view: mobilenumberTextField, color: hintColor });
        hint_util_1.setHintColor({ view: passwordTextField, color: hintColor });
    };
    signupComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.setTextFieldColors(); }, 2);
        this.page.actionBarHidden = true;
        this.page.style.backgroundImage = "~/pages/signup/imgs/background.jpg";
        this.page.style.backgroundRepeat = "no-repeat";
        this.page.style.backgroundSize = "100% 100%";
        var docklayout = this.page.getViewById('docklayout_rightb');
        docklayout.borderRightWidth = 8;
        docklayout.borderTopRightRadius = 200;
        docklayout.borderBottomRightRadius = 200;
        permissions.requestPermission([android.Manifest.permission.READ_SMS, android.Manifest.permission.READ_EXTERNAL_STORAGE, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.CAMERA], "I need these permissions please");
    };
    signupComponent.prototype.signup = function (account) {
        var _this = this;
        var option = {
            message: 'please wait...'
        };
        this.account.mobile = country_code + this.account.mobile;
        this.oauth.signup(account, loader, option).subscribe(function (data) {
            if (data.successfulTransaction) {
                _this.modal.showModal(setpassword_components_1.setPasswordComponents, {
                    context: { msg: localStorage.getItem("user_uuid") },
                    fullscreen: true,
                    viewContainerRef: _this.viewRef,
                }).then(function (result) {
                    if (result) {
                        var username = localStorage.getItem("email");
                        var password = localStorage.getItem("password");
                        var user = { email: "", password: "" };
                        user.email = username;
                        user.password = password;
                        console.log("signup " + JSON.stringify(user));
                        _this.oauth.login(user).subscribe();
                    }
                }).catch(function (err) { console.log(err); });
            }
        });
    };
    return signupComponent;
}());
__decorate([
    core_1.ViewChild("email"),
    __metadata("design:type", core_1.ElementRef)
], signupComponent.prototype, "email", void 0);
__decorate([
    core_1.ViewChild("fullname"),
    __metadata("design:type", core_1.ElementRef)
], signupComponent.prototype, "fName", void 0);
__decorate([
    core_1.ViewChild("mobnumber"),
    __metadata("design:type", core_1.ElementRef)
], signupComponent.prototype, "mobileNumber", void 0);
__decorate([
    core_1.ViewChild("password"),
    __metadata("design:type", core_1.ElementRef)
], signupComponent.prototype, "password", void 0);
signupComponent = __decorate([
    core_1.Component({
        selector: "signup",
        templateUrl: "./pages/signup/signup.component.html",
        styleUrls: ["pages/signup/signup.components.css"],
        providers: [inputValidation_1.MinLengthDirective, inputValidation_1.IsEmailDirective, inputValidation_1.IsMobileDirective, setpassword_components_1.setPasswordComponents, outh_1.OuthService, restcountries_1.restcountries],
    }),
    __metadata("design:paramtypes", [page_1.Page, outh_1.OuthService, restcountries_1.restcountries, core_1.ViewContainerRef, dialogs_1.ModalDialogService, router_1.Router, inputValidation_1.MinLengthDirective, inputValidation_1.IsEmailDirective, inputValidation_1.IsMobileDirective, nativescript_ng2_fonticon_1.TNSFontIconService, core_1.ChangeDetectorRef])
], signupComponent);
exports.signupComponent = signupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0k7QUFDeEksZ0NBQTZCO0FBQzdCLDBDQUF1QztBQUV2QyxtREFBcUQ7QUFFckQsb0RBQXNEO0FBSXRELCtDQUFxRDtBQUNyRCwwRUFBd0U7QUFJeEUsdUVBQStEO0FBRS9ELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBRSwwQkFBMEIsQ0FBRSxDQUFDO0FBQ3hELDRDQUE4QztBQUM5QywwQ0FBNEM7QUFHNUMsK0RBQXNHO0FBQ3RHLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3BELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDOUIsbUVBQWlHO0FBQ2pHLGlGQUErRTtBQUMvRSxvQ0FBc0M7QUFDdEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsaUZBQWdFO0FBRWhFLGlFQUFtRDtBQUNuRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFHcEMsSUFBSSxZQUFZLENBQUM7QUFDakIsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFVdkMsSUFBYSxlQUFlO0lBVTNCLHlCQUFvQixJQUFVLEVBQVMsS0FBaUIsRUFBUyxhQUEyQixFQUFTLE9BQXlCLEVBQVMsS0FBd0IsRUFBUyxNQUFhLEVBQVUsa0JBQXFDLEVBQVMsZ0JBQWlDLEVBQVMsTUFBd0IsRUFBVSxRQUE0QixFQUFTLG1CQUFzQztRQUFwWSxpQkF3QkE7UUF4Qm9CLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVMs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QUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNILENBQUM7SUFJRixzQkFBQztBQUFELENBQUMsQUEzTEQsSUEyTEM7QUExTHFCO0lBQW5CLGdCQUFTLENBQUMsT0FBTyxDQUFDOzhCQUFRLGlCQUFVOzhDQUFDO0FBQ2Y7SUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7OEJBQU8saUJBQVU7OENBQUM7QUFDaEI7SUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7OEJBQWMsaUJBQVU7cURBQUM7QUFDekI7SUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7OEJBQVUsaUJBQVU7aURBQUM7QUFKaEMsZUFBZTtJQVQzQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFDLHNDQUFzQztRQUNsRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztRQUNqRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBa0IsRUFBRSxrQ0FBZ0IsRUFBRSxtQ0FBaUIsRUFBQyw4Q0FBcUIsRUFBQyxrQkFBVyxFQUFDLDZCQUFhLENBQUM7S0FDckgsQ0FBQztxQ0FjeUIsV0FBSSxFQUFlLGtCQUFXLEVBQXVCLDZCQUFhLEVBQWtCLHVCQUFnQixFQUFlLDRCQUFrQixFQUFnQixlQUFNLEVBQTZCLG9DQUFrQixFQUEwQixrQ0FBZ0IsRUFBZ0IsbUNBQWlCLEVBQW9CLDhDQUFrQixFQUE4Qix3QkFBaUI7R0FWeFgsZUFBZSxDQTJMM0I7QUEzTFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0ICxWaWV3Q2hpbGQgLEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1ZpZXd9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgc2V0SGludENvbG9yIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2hpbnQtdXRpbFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyBjb2xvck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gJ2FwcGxpY2F0aW9uJztcclxuaW1wb3J0IHtUTlNGb250SWNvbiwgZm9udGljb259IGZyb20gJ25hdGl2ZXNjcmlwdC1mb250aWNvbic7XHJcbmltcG9ydCB7IE91dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vdXRoL291dGhcIjtcclxuaW1wb3J0IHsgcmVzdGNvdW50cmllcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvcmVzdGNvdW50cmllcy9yZXN0Y291bnRyaWVzXCJcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvbkN1cnZlfSBmcm9tIFwidWkvZW51bXNcIjtcclxuaW1wb3J0IHtLZXlmcmFtZUFuaW1hdGlvbn0gZnJvbSBcInVpL2FuaW1hdGlvbi9rZXlmcmFtZS1hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVE5TRm9udEljb25TZXJ2aWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XHJcbmltcG9ydCB7IERvY2tMYXlvdXQgfSBmcm9tICd1aS9sYXlvdXRzL2RvY2stbGF5b3V0JztcclxudmFyIHBlcm1pc3Npb25zID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtcGVybWlzc2lvbnNcIiApO1xyXG5pbXBvcnQgKiBhcyBjYW1lcmEgZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcclxuaW1wb3J0ICogYXMgSW1hZ2VTb3VyY2UgZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IE1pbkxlbmd0aERpcmVjdGl2ZSwgSXNFbWFpbERpcmVjdGl2ZSAsIElzTW9iaWxlRGlyZWN0aXZlfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5wdXRWYWxpZGF0aW9uXCI7XHJcbnZhciBpY01vZHVsZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtaW1hZ2Vjcm9wcGVyXCIpO1xyXG52YXIgQ29sb3IgPSBjb2xvck1vZHVsZS5Db2xvcjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3MnO1xyXG5pbXBvcnQgeyBzZXRQYXNzd29yZENvbXBvbmVudHMgfSBmcm9tICcuLi9tb2RhbHMvc2V0UFcvc2V0cGFzc3dvcmQuY29tcG9uZW50cyc7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxubGV0IGltYWdlcGlja2VyID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiKTtcclxuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgVmFsdWVMaXN0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcblxyXG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnk7XHJcbmxldCBjb3VudHJ5X2NvZGU7XHJcbnJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcInNpZ251cFwiLFxyXG4gIHRlbXBsYXRlVXJsOlwiLi9wYWdlcy9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9zaWdudXAvc2lnbnVwLmNvbXBvbmVudHMuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW01pbkxlbmd0aERpcmVjdGl2ZSAsSXNFbWFpbERpcmVjdGl2ZSwgSXNNb2JpbGVEaXJlY3RpdmUsc2V0UGFzc3dvcmRDb21wb25lbnRzLE91dGhTZXJ2aWNlLHJlc3Rjb3VudHJpZXNdLFxyXG59KVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3Mgc2lnbnVwQ29tcG9uZW50ICBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICBAVmlld0NoaWxkKFwiZW1haWxcIikgZW1haWw6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImZ1bGxuYW1lXCIpIGZOYW1lOkVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIm1vYm51bWJlclwiKSBtb2JpbGVOdW1iZXI6RWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6RWxlbWVudFJlZjtcclxuICBwdWJsaWMgc2VsZWN0ZWRJbmRleDtcclxuICBwdWJsaWMgaXRlbXM7XHJcbiAgcHVibGljIGNvdW50cmllcztcclxuICBwdWJsaWMgYWNjb3VudDtcclxuXHJcbiBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UscHJpdmF0ZSBvYXV0aDpPdXRoU2VydmljZSxwcml2YXRlIHJlc3RDb3VudHJpZXM6cmVzdGNvdW50cmllcyxwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYscHJpdmF0ZSBtb2RhbDpNb2RhbERpYWxvZ1NlcnZpY2UscHJpdmF0ZSByb3V0ZXI6Um91dGVyLCBwcml2YXRlIE1pbkxlbmd0aERpcmVjdGl2ZTpNaW5MZW5ndGhEaXJlY3RpdmUscHJpdmF0ZSBJc0VtYWlsRGlyZWN0aXZlOklzRW1haWxEaXJlY3RpdmUscHJpdmF0ZSBtb2JpbGU6SXNNb2JpbGVEaXJlY3RpdmUsIHByaXZhdGUgZm9udGljb246IFROU0ZvbnRJY29uU2VydmljZSxwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgY291bnRyeV9jb2RlPVwiXCI7XHJcbiAgICAgdGhpcy5jb3VudHJpZXM9W107XHJcbiAgICAgdGhpcy5hY2NvdW50PXtcclxuICAgICAgICAgZnVsbG5hbWU6XCJcIixcclxuICAgICAgICAgZW1haWw6XCJcIixcclxuICAgICAgICAgbW9iaWxlOlwiXCIsXHJcbiAgICAgICAgIHByb2ZpbGVfcGljOlwiXCIsXHJcbiAgICAgICAgIHBhc3N3b3JkOlwiXCJcclxuICAgICB9XHJcbiAgICAgXHJcbiAgICAgIHRyeXtcclxuICAgICAgICB0aGlzLnJlc3RDb3VudHJpZXMuZ2V0QWxsY291bnRyaWVzKCkuc3Vic2NyaWJlKChyZXMpPT57XHJcbiAgICAgICAgICBmb3IobGV0IGNvdW50cnkgb2YgcmVzKXtcclxuICAgICAgICAgICAgZm9yKGxldCBjb2RlIG9mIGNvdW50cnkuY2FsbGluZ0NvZGVzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzLnB1c2goe3ZhbHVlOmNvZGUgLCBkaXNwbGF5OlwiICBcIitjb3VudHJ5LmFscGhhM0NvZGUrXCIgK1wiK2NvZGV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4PTE7XHJcbiAgICAgICAgICB0aGlzLml0ZW1zPW5ldyBWYWx1ZUxpc3QodGhpcy5jb3VudHJpZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmdvYmFjaygpe1xyXG4gIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xyXG59XHJcblxyXG5wdWJsaWMgb25jaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJkcm9wZG93blwiKS5zdHlsZS5jb2xvcj1uZXcgQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG4gICAgIGNvdW50cnlfY29kZT1cIitcIit0aGlzLml0ZW1zLmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gfVxyXG5cclxuIHB1YmxpYyBvbm9wZW4oKSB7XHJcbiAgICAgdGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiZHJvcGRvd25cIikuc3R5bGUuY29sb3I9bmV3IENvbG9yKFwiIzIyYmFhMFwiKTtcclxuICAgICBjb25zb2xlLmxvZyhcIkRyb3AgRG93biBvcGVuZWQuXCIpO1xyXG4gfVxyXG5cclxuc3RhcnRDYW1lcmFUYXAoKXtcclxuICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XHJcbiAgY2FtZXJhLnRha2VQaWN0dXJlKHsgIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSwgc2F2ZVRvR2FsbGVyeTogdHJ1ZSB9KS50aGVuKGltYWdlQXNzZXQgPT4ge1xyXG4gICAgICAgIGxldCBpbWd2aXdlcj08SW1hZ2U+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiaW1hZ2V2aXdlclwiKTtcclxuICAgICAgICBsZXQgaW1ncGlja2VyPTxCdXR0b24+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiaW1ncGlja2VyXCIpO1xyXG4gICAgICAgIGltZ3BpY2tlci52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjtcclxuICAgICAgICBpbWd2aXdlci5zdHlsZS53aWR0aD0xMzA7XHJcbiAgICAgICAgaW1ndml3ZXIuc3R5bGUuaGVpZ2h0PTEzMDtcclxuICAgICAgICBpbWd2aXdlci52aXNpYmlsaXR5PVwidmlzaWJsZVwiO1xyXG4gICAgICAgIGltZ3Zpd2VyLnNyYz1pbWFnZUFzc2V0O1xyXG5cclxuICAgICAgICBsZXQgbXlJbWFnZVNvdXJjZT1uZXcgSW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2UoKTtcclxuICAgICAgICBJbWFnZVNvdXJjZS5mcm9tQXNzZXQoaW1hZ2VBc3NldCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICBteUltYWdlU291cmNlPSByZXM7XHJcbiAgICAgICAgICAgICAgIHZhciBiYXNlNjQgPSBteUltYWdlU291cmNlLnRvQmFzZTY0U3RyaW5nKFwianBlZ1wiLCAxMDApO1xyXG4gICAgICAgICAgICAgICB0aGlzLmFjY291bnQucHJvZmlsZV9waWM9YmFzZTY0O1xyXG4gICAgICAgICAgIH0pXHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtPiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgIH0pO1xyXG59XHJcbiAgIG9uU2VsZWN0U2luZ2xlVGFwKCkge1xyXG4gICAgICAgbGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xyXG4gICAgICAgICAgIG1vZGU6IFwic2luZ2xlXCJcclxuICAgICAgIH0pO1xyXG5cclxuICAgICAgIHRoaXMuc3RhcnRTZWxlY3Rpb24oY29udGV4dCx0aGlzLmFjY291bnQpO1xyXG4gICB9XHJcblxyXG4gICBzdGFydFNlbGVjdGlvbihjb250ZXh0LGFjY291bnQpIHtcclxuICAgICAgICB2YXIgYmFzZTY0PVwiXCI7XHJcbiAgICAgICBjb250ZXh0XHJcbiAgICAgICAgICAgLmF1dGhvcml6ZSgpXHJcbiAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XHJcbiAgICAgICAgICAgfSlcclxuICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0aW9uIGRvbmU6XCIpO1xyXG4gICAgICAgICAgICAgICBsZXQgaW1ndml3ZXI9PEltYWdlPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImltYWdldml3ZXJcIik7XHJcbiAgICAgICAgICAgICAgIGxldCBpbWdwaWNrZXI9PEJ1dHRvbj50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJpbWdwaWNrZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgaW1ndml3ZXIuc3JjPXNlbGVjdGVkLmZpbGVVcmk7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmdldEltYWdlKCkudGhlbihyZXM9PntcclxuICAgICAgICAgICAgICAgICAgICAgYmFzZTY0ID0gcmVzLnRvQmFzZTY0U3RyaW5nKFwianBlZ1wiLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICBhY2NvdW50LnByb2ZpbGVfcGljPWJhc2U2NDtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgaW1ncGlja2VyLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG4gICAgICAgICAgICAgICBpbWd2aXdlci5zdHlsZS53aWR0aD0xMzA7XHJcbiAgICAgICAgICAgICAgIGltZ3Zpd2VyLnN0eWxlLmhlaWdodD0xMzA7XHJcbiAgICAgICAgICAgICAgIGltZ3Zpd2VyLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICB9XHJcblxyXG5cclxuc2hvd0RpYWxvZygpe1xyXG4gIGRpYWxvZ3MuYWN0aW9uKHtcclxuICAgIG1lc3NhZ2U6IFwiSW1hZ2UgU291cmNlXCIsXHJcbiAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbCB0ZXh0XCIsXHJcbiAgICBhY3Rpb25zOiBbXCJDYW1lcmFcIiwgXCJHYWxsZXJ5XCJdXHJcbn0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xyXG4gICAgaWYocmVzdWx0ID09IFwiQ2FtZXJhXCIpe1xyXG4gICAgICB0aGlzLnN0YXJ0Q2FtZXJhVGFwKCk7XHJcbiAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJHYWxsZXJ5XCIpe1xyXG4gICAgICB0aGlzLm9uU2VsZWN0U2luZ2xlVGFwKCk7XHJcbiAgICB9XHJcbn0pO1xyXG59XHJcblxyXG5cclxuc2V0VGV4dEZpZWxkQ29sb3JzKCkge1xyXG4gICBsZXQgZW1haWxUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZW1haWwubmF0aXZlRWxlbWVudDtcclxuICAgbGV0IGZ1bGxuYW1lVGV4dEZpZWxkPTxUZXh0RmllbGQ+dGhpcy5mTmFtZS5uYXRpdmVFbGVtZW50O1xyXG4gICBsZXQgbW9iaWxlbnVtYmVyVGV4dEZpZWxkPTxUZXh0RmllbGQ+dGhpcy5tb2JpbGVOdW1iZXIubmF0aXZlRWxlbWVudDtcclxuICAgbGV0IHBhc3N3b3JkVGV4dEZpZWxkPTxUZXh0RmllbGQ+dGhpcy5wYXNzd29yZC5uYXRpdmVFbGVtZW50O1xyXG4gICBlbWFpbFRleHRGaWVsZC5mb250U2l6ZT0xODtcclxuICAgbGV0IGhpbnRDb2xvcj1uZXcgQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG4gICBzZXRIaW50Q29sb3IoeyB2aWV3OiBlbWFpbFRleHRGaWVsZCwgY29sb3I6IGhpbnRDb2xvciB9KTtcclxuICAgc2V0SGludENvbG9yKHsgdmlldzogZnVsbG5hbWVUZXh0RmllbGQsIGNvbG9yOiBoaW50Q29sb3IgfSk7XHJcbiAgIHNldEhpbnRDb2xvcih7IHZpZXc6IG1vYmlsZW51bWJlclRleHRGaWVsZCwgY29sb3I6IGhpbnRDb2xvciB9KTtcclxuICAgc2V0SGludENvbG9yKHt2aWV3OiBwYXNzd29yZFRleHRGaWVsZCwgY29sb3I6aGludENvbG9yfSk7XHJcbiB9XHJcblxyXG4gbmdPbkluaXQoKSB7XHJcbiAgICAgc2V0VGltZW91dCgoKT0+e3RoaXMuIHNldFRleHRGaWVsZENvbG9ycygpO30sMik7XHJcbiAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbj10cnVlO1xyXG4gICAgIHRoaXMucGFnZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9IFwifi9wYWdlcy9zaWdudXAvaW1ncy9iYWNrZ3JvdW5kLmpwZ1wiO1xyXG4gICAgIHRoaXMucGFnZS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0PVwibm8tcmVwZWF0XCI7XHJcbiAgICAgdGhpcy5wYWdlLnN0eWxlLmJhY2tncm91bmRTaXplPVwiMTAwJSAxMDAlXCI7XHJcbiAgICAgIGxldCBkb2NrbGF5b3V0PTxEb2NrTGF5b3V0PnRoaXMucGFnZS5nZXRWaWV3QnlJZCgnZG9ja2xheW91dF9yaWdodGInKTtcclxuICAgICAgZG9ja2xheW91dC5ib3JkZXJSaWdodFdpZHRoPTg7XHJcbiAgICAgIGRvY2tsYXlvdXQuYm9yZGVyVG9wUmlnaHRSYWRpdXM9MjAwO1xyXG4gICAgICBkb2NrbGF5b3V0LmJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzPTIwMDtcclxuXHJcbiAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKFthbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uUkVBRF9TTVMsYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfRVhURVJOQUxfU1RPUkFHRSxhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfRVhURVJOQUxfU1RPUkFHRSxhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQ0FNRVJBXSwgXCJJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnMgcGxlYXNlXCIpO1xyXG5cclxuXHJcblxyXG4gfVxyXG4gc2lnbnVwKGFjY291bnQpe1xyXG4gICB2YXIgb3B0aW9uID0ge1xyXG4gICAgbWVzc2FnZTogJ3BsZWFzZSB3YWl0Li4uJ1xyXG4gICAgfTtcclxuICB0aGlzLmFjY291bnQubW9iaWxlPWNvdW50cnlfY29kZSt0aGlzLmFjY291bnQubW9iaWxlO1xyXG4gIHRoaXMub2F1dGguc2lnbnVwKGFjY291bnQsbG9hZGVyLG9wdGlvbikuc3Vic2NyaWJlKChkYXRhKT0+e1xyXG4gIGlmKGRhdGEuc3VjY2Vzc2Z1bFRyYW5zYWN0aW9uKXtcclxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKHNldFBhc3N3b3JkQ29tcG9uZW50cyx7XHJcbiAgICAgIGNvbnRleHQ6e21zZzpsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfdXVpZFwiKX0sXHJcbiAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld1JlZixcclxuICAgIH0pLnRoZW4oKHJlc3VsdCk9PntcclxuICAgICBpZihyZXN1bHQpe1xyXG4gICAgICAgbGV0IHVzZXJuYW1lPWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZW1haWxcIik7XHJcbiAgICAgICBsZXQgcGFzc3dvcmQ9bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwYXNzd29yZFwiKTtcclxuICAgICAgIGxldCB1c2VyPXtlbWFpbDpcIlwiLHBhc3N3b3JkOlwiXCJ9O1xyXG4gICAgICAgdXNlci5lbWFpbD11c2VybmFtZTtcclxuICAgICAgIHVzZXIucGFzc3dvcmQ9cGFzc3dvcmQ7XHJcbiAgICAgICBjb25zb2xlLmxvZyhcInNpZ251cCBcIitKU09OLnN0cmluZ2lmeSh1c2VyKSlcclxuICAgICAgICB0aGlzLm9hdXRoLmxvZ2luKHVzZXIpLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyKT0+e2NvbnNvbGUubG9nKGVycil9KTtcclxuICB9XHJcbiB9KTtcclxuIH1cclxuXHJcblxyXG5cclxufVxyXG4iXX0=