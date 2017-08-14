"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var hint_util_1 = require("../../utils/hint-util");
var colorModule = require("tns-core-modules/color");
var outh_1 = require("../../shared/outh/outh");
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
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
require("nativescript-localstorage");
var signupComponent = (function () {
    function signupComponent(page, oauth, viewRef, modal, router, MinLengthDirective, IsEmailDirective, mobile, fonticon, _changeDetectionRef) {
        this.page = page;
        this.oauth = oauth;
        this.viewRef = viewRef;
        this.modal = modal;
        this.router = router;
        this.MinLengthDirective = MinLengthDirective;
        this.IsEmailDirective = IsEmailDirective;
        this.mobile = mobile;
        this.fonticon = fonticon;
        this._changeDetectionRef = _changeDetectionRef;
        this.account = {
            fullname: "",
            email: "",
            mobile: "",
            profile_pic: "",
            password: ""
        };
    }
    signupComponent.prototype.goback = function () {
        this.router.navigate(["/"]);
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
        this.oauth.signup(account, loader, option).subscribe(function (data) {
            //check if user has been created or if the is an error
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
        providers: [inputValidation_1.MinLengthDirective, inputValidation_1.IsEmailDirective, inputValidation_1.IsMobileDirective, setpassword_components_1.setPasswordComponents, outh_1.OuthService],
    }),
    __metadata("design:paramtypes", [page_1.Page, outh_1.OuthService, core_1.ViewContainerRef, dialogs_1.ModalDialogService, router_1.Router, inputValidation_1.MinLengthDirective, inputValidation_1.IsEmailDirective, inputValidation_1.IsMobileDirective, nativescript_ng2_fonticon_1.TNSFontIconService, core_1.ChangeDetectorRef])
], signupComponent);
exports.signupComponent = signupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0k7QUFDeEksZ0NBQTZCO0FBQzdCLDBDQUF1QztBQUV2QyxtREFBcUQ7QUFFckQsb0RBQXNEO0FBSXRELCtDQUFxRDtBQUlyRCx1RUFBK0Q7QUFFL0QsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFFLDBCQUEwQixDQUFFLENBQUM7QUFDeEQsNENBQThDO0FBQzlDLDBDQUE0QztBQUc1QywrREFBc0c7QUFDdEcsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDcEQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUM5QixtRUFBaUc7QUFDakcsaUZBQStFO0FBQy9FLG9DQUFzQztBQUN0QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxpRkFBZ0U7QUFHaEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBSXBDLE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBVXZDLElBQWEsZUFBZTtJQU8zQix5QkFBb0IsSUFBVSxFQUFTLEtBQWlCLEVBQVMsT0FBeUIsRUFBUyxLQUF3QixFQUFTLE1BQWEsRUFBVSxrQkFBcUMsRUFBUyxnQkFBaUMsRUFBUyxNQUF3QixFQUFVLFFBQTRCLEVBQVMsbUJBQXNDO1FBQTVVLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQU87UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFTLFdBQU0sR0FBTixN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Q0FBQyxVQUFVLENBQUM7OEJBQVUsaUJBQVU7aURBQUM7QUFKaEMsZUFBZTtJQVQzQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFDLHNDQUFzQztRQUNsRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztRQUNqRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBa0IsRUFBRSxrQ0FBZ0IsRUFBRSxtQ0FBaUIsRUFBQyw4Q0FBcUIsRUFBQyxrQkFBVyxDQUFDO0tBQ3ZHLENBQUM7cUNBV3lCLFdBQUksRUFBZSxrQkFBVyxFQUFrQix1QkFBZ0IsRUFBZSw0QkFBa0IsRUFBZ0IsZUFBTSxFQUE2QixvQ0FBa0IsRUFBMEIsa0NBQWdCLEVBQWdCLG1DQUFpQixFQUFvQiw4Q0FBa0IsRUFBOEIsd0JBQWlCO0dBUHBWLGVBQWUsQ0EwSjNCO0FBMUpZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LE9uSW5pdCAsVmlld0NoaWxkICxFbGVtZW50UmVmLENoYW5nZURldGVjdG9yUmVmLE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BICwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtWaWV3fSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHNldEhpbnRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9oaW50LXV0aWxcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0ICogYXMgY29sb3JNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICdhcHBsaWNhdGlvbic7XHJcbmltcG9ydCB7VE5TRm9udEljb24sIGZvbnRpY29ufSBmcm9tICduYXRpdmVzY3JpcHQtZm9udGljb24nO1xyXG5pbXBvcnQgeyBPdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb3V0aC9vdXRoXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuaW1wb3J0IHtBbmltYXRpb25DdXJ2ZX0gZnJvbSBcInVpL2VudW1zXCI7XHJcbmltcG9ydCB7S2V5ZnJhbWVBbmltYXRpb259IGZyb20gXCJ1aS9hbmltYXRpb24va2V5ZnJhbWUtYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IFROU0ZvbnRJY29uU2VydmljZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZzItZm9udGljb24nO1xyXG5pbXBvcnQgeyBEb2NrTGF5b3V0IH0gZnJvbSAndWkvbGF5b3V0cy9kb2NrLWxheW91dCc7XHJcbnZhciBwZXJtaXNzaW9ucyA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCIgKTtcclxuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XHJcbmltcG9ydCAqIGFzIEltYWdlU291cmNlIGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBNaW5MZW5ndGhEaXJlY3RpdmUsIElzRW1haWxEaXJlY3RpdmUgLCBJc01vYmlsZURpcmVjdGl2ZX0gZnJvbSBcIi4uLy4uL3V0aWxzL2lucHV0VmFsaWRhdGlvblwiO1xyXG52YXIgaWNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWltYWdlY3JvcHBlclwiKTtcclxudmFyIENvbG9yID0gY29sb3JNb2R1bGUuQ29sb3I7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcclxuaW1wb3J0IHsgc2V0UGFzc3dvcmRDb21wb25lbnRzIH0gZnJvbSAnLi4vbW9kYWxzL3NldFBXL3NldHBhc3N3b3JkLmNvbXBvbmVudHMnO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmxldCBpbWFnZXBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIik7XHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5cclxuXHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5cclxuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xyXG5cclxucmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwic2lnbnVwXCIsXHJcbiAgdGVtcGxhdGVVcmw6XCIuL3BhZ2VzL3NpZ251cC9zaWdudXAuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcInBhZ2VzL3NpZ251cC9zaWdudXAuY29tcG9uZW50cy5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbTWluTGVuZ3RoRGlyZWN0aXZlICxJc0VtYWlsRGlyZWN0aXZlLCBJc01vYmlsZURpcmVjdGl2ZSxzZXRQYXNzd29yZENvbXBvbmVudHMsT3V0aFNlcnZpY2VdLFxyXG59KVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3Mgc2lnbnVwQ29tcG9uZW50ICBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICBAVmlld0NoaWxkKFwiZW1haWxcIikgZW1haWw6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImZ1bGxuYW1lXCIpIGZOYW1lOkVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIm1vYm51bWJlclwiKSBtb2JpbGVOdW1iZXI6RWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6RWxlbWVudFJlZjtcclxuXHJcbiBwdWJsaWMgYWNjb3VudDtcclxuIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIG9hdXRoOk91dGhTZXJ2aWNlLHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZixwcml2YXRlIG1vZGFsOk1vZGFsRGlhbG9nU2VydmljZSxwcml2YXRlIHJvdXRlcjpSb3V0ZXIsIHByaXZhdGUgTWluTGVuZ3RoRGlyZWN0aXZlOk1pbkxlbmd0aERpcmVjdGl2ZSxwcml2YXRlIElzRW1haWxEaXJlY3RpdmU6SXNFbWFpbERpcmVjdGl2ZSxwcml2YXRlIG1vYmlsZTpJc01vYmlsZURpcmVjdGl2ZSwgcHJpdmF0ZSBmb250aWNvbjogVE5TRm9udEljb25TZXJ2aWNlLHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuIHRoaXMuYWNjb3VudD17XHJcbiAgICAgZnVsbG5hbWU6XCJcIixcclxuICAgICBlbWFpbDpcIlwiLFxyXG4gICAgIG1vYmlsZTpcIlwiLFxyXG4gICAgIHByb2ZpbGVfcGljOlwiXCIsXHJcbiAgICAgcGFzc3dvcmQ6XCJcIlxyXG4gfVxyXG59XHJcblxyXG5nb2JhY2soKXtcclxuICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvXCJdKTtcclxufVxyXG5zdGFydENhbWVyYVRhcCgpe1xyXG4gIGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcclxuICBjYW1lcmEudGFrZVBpY3R1cmUoeyAga2VlcEFzcGVjdFJhdGlvOiB0cnVlLCBzYXZlVG9HYWxsZXJ5OiB0cnVlIH0pLnRoZW4oaW1hZ2VBc3NldCA9PiB7XHJcbiAgICAgICAgbGV0IGltZ3Zpd2VyPTxJbWFnZT50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJpbWFnZXZpd2VyXCIpO1xyXG4gICAgICAgIGxldCBpbWdwaWNrZXI9PEJ1dHRvbj50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJpbWdwaWNrZXJcIik7XHJcbiAgICAgICAgaW1ncGlja2VyLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIGltZ3Zpd2VyLnN0eWxlLndpZHRoPTEzMDtcclxuICAgICAgICBpbWd2aXdlci5zdHlsZS5oZWlnaHQ9MTMwO1xyXG4gICAgICAgIGltZ3Zpd2VyLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgaW1ndml3ZXIuc3JjPWltYWdlQXNzZXQ7XHJcblxyXG4gICAgICAgIGxldCBteUltYWdlU291cmNlPW5ldyBJbWFnZVNvdXJjZS5JbWFnZVNvdXJjZSgpO1xyXG4gICAgICAgIEltYWdlU291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgIG15SW1hZ2VTb3VyY2U9IHJlcztcclxuICAgICAgICAgICAgICAgdmFyIGJhc2U2NCA9IG15SW1hZ2VTb3VyY2UudG9CYXNlNjRTdHJpbmcoXCJqcGVnXCIsIDEwMCk7XHJcbiAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudC5wcm9maWxlX3BpYz1iYXNlNjQ7XHJcbiAgICAgICAgICAgfSlcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0+IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbn1cclxuICAgb25TZWxlY3RTaW5nbGVUYXAoKSB7XHJcbiAgICAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIlxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgdGhpcy5zdGFydFNlbGVjdGlvbihjb250ZXh0LHRoaXMuYWNjb3VudCk7XHJcbiAgIH1cclxuXHJcbiAgIHN0YXJ0U2VsZWN0aW9uKGNvbnRleHQsYWNjb3VudCkge1xyXG4gICAgICAgIHZhciBiYXNlNjQ9XCJcIjtcclxuICAgICAgIGNvbnRleHRcclxuICAgICAgICAgICAuYXV0aG9yaXplKClcclxuICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIC50aGVuKChzZWxlY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3Rpb24gZG9uZTpcIik7XHJcbiAgICAgICAgICAgICAgIGxldCBpbWd2aXdlcj08SW1hZ2U+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwiaW1hZ2V2aXdlclwiKTtcclxuICAgICAgICAgICAgICAgbGV0IGltZ3BpY2tlcj08QnV0dG9uPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImltZ3BpY2tlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICBpbWd2aXdlci5zcmM9c2VsZWN0ZWQuZmlsZVVyaTtcclxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuZ2V0SW1hZ2UoKS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBiYXNlNjQgPSByZXMudG9CYXNlNjRTdHJpbmcoXCJqcGVnXCIsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIGFjY291bnQucHJvZmlsZV9waWM9YmFzZTY0O1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICBpbWdwaWNrZXIudmlzaWJpbGl0eT1cImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgICAgIGltZ3Zpd2VyLnN0eWxlLndpZHRoPTEzMDtcclxuICAgICAgICAgICAgICAgaW1ndml3ZXIuc3R5bGUuaGVpZ2h0PTEzMDtcclxuICAgICAgICAgICAgICAgaW1ndml3ZXIudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgIH1cclxuXHJcblxyXG5zaG93RGlhbG9nKCl7XHJcbiAgZGlhbG9ncy5hY3Rpb24oe1xyXG4gICAgbWVzc2FnZTogXCJJbWFnZSBTb3VyY2VcIixcclxuICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsIHRleHRcIixcclxuICAgIGFjdGlvbnM6IFtcIkNhbWVyYVwiLCBcIkdhbGxlcnlcIl1cclxufSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XHJcbiAgICBpZihyZXN1bHQgPT0gXCJDYW1lcmFcIil7XHJcbiAgICAgIHRoaXMuc3RhcnRDYW1lcmFUYXAoKTtcclxuICAgIH1lbHNlIGlmKHJlc3VsdCA9PSBcIkdhbGxlcnlcIil7XHJcbiAgICAgIHRoaXMub25TZWxlY3RTaW5nbGVUYXAoKTtcclxuICAgIH1cclxufSk7XHJcbn1cclxuXHJcblxyXG5zZXRUZXh0RmllbGRDb2xvcnMoKSB7XHJcbiAgIGxldCBlbWFpbFRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5lbWFpbC5uYXRpdmVFbGVtZW50O1xyXG4gICBsZXQgZnVsbG5hbWVUZXh0RmllbGQ9PFRleHRGaWVsZD50aGlzLmZOYW1lLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgIGxldCBtb2JpbGVudW1iZXJUZXh0RmllbGQ9PFRleHRGaWVsZD50aGlzLm1vYmlsZU51bWJlci5uYXRpdmVFbGVtZW50O1xyXG4gICBsZXQgcGFzc3dvcmRUZXh0RmllbGQ9PFRleHRGaWVsZD50aGlzLnBhc3N3b3JkLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgIGVtYWlsVGV4dEZpZWxkLmZvbnRTaXplPTE4O1xyXG4gICBsZXQgaGludENvbG9yPW5ldyBDb2xvcihcIiNmZmZmZmZcIik7XHJcbiAgIHNldEhpbnRDb2xvcih7IHZpZXc6IGVtYWlsVGV4dEZpZWxkLCBjb2xvcjogaGludENvbG9yIH0pO1xyXG4gICBzZXRIaW50Q29sb3IoeyB2aWV3OiBmdWxsbmFtZVRleHRGaWVsZCwgY29sb3I6IGhpbnRDb2xvciB9KTtcclxuICAgc2V0SGludENvbG9yKHsgdmlldzogbW9iaWxlbnVtYmVyVGV4dEZpZWxkLCBjb2xvcjogaGludENvbG9yIH0pO1xyXG4gICBzZXRIaW50Q29sb3Ioe3ZpZXc6IHBhc3N3b3JkVGV4dEZpZWxkLCBjb2xvcjpoaW50Q29sb3J9KTtcclxuIH1cclxuXHJcbiBuZ09uSW5pdCgpIHtcclxuICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy4gc2V0VGV4dEZpZWxkQ29sb3JzKCk7fSwyKTtcclxuICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuPXRydWU7XHJcbiAgICAgdGhpcy5wYWdlLnN0eWxlLmJhY2tncm91bmRJbWFnZT0gXCJ+L3BhZ2VzL3NpZ251cC9pbWdzL2JhY2tncm91bmQuanBnXCI7XHJcbiAgICAgdGhpcy5wYWdlLnN0eWxlLmJhY2tncm91bmRSZXBlYXQ9XCJuby1yZXBlYXRcIjtcclxuICAgICB0aGlzLnBhZ2Uuc3R5bGUuYmFja2dyb3VuZFNpemU9XCIxMDAlIDEwMCVcIjtcclxuICAgICAgbGV0IGRvY2tsYXlvdXQ9PERvY2tMYXlvdXQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdkb2NrbGF5b3V0X3JpZ2h0YicpO1xyXG4gICAgICBkb2NrbGF5b3V0LmJvcmRlclJpZ2h0V2lkdGg9ODtcclxuICAgICAgZG9ja2xheW91dC5ib3JkZXJUb3BSaWdodFJhZGl1cz0yMDA7XHJcbiAgICAgIGRvY2tsYXlvdXQuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM9MjAwO1xyXG5cclxuICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oW2FuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX1NNUyxhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uUkVBRF9FWFRFUk5BTF9TVE9SQUdFLGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5XUklURV9FWFRFUk5BTF9TVE9SQUdFLGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkFdLCBcIkkgbmVlZCB0aGVzZSBwZXJtaXNzaW9ucyBwbGVhc2VcIik7XHJcblxyXG4gfVxyXG4gc2lnbnVwKGFjY291bnQpe1xyXG4gICB2YXIgb3B0aW9uID0ge1xyXG4gICAgbWVzc2FnZTogJ3BsZWFzZSB3YWl0Li4uJ1xyXG4gICAgfTtcclxuXHJcbiAgdGhpcy5vYXV0aC5zaWdudXAoYWNjb3VudCxsb2FkZXIsb3B0aW9uKS5zdWJzY3JpYmUoKGRhdGEpPT57XHJcbiAgLy9jaGVjayBpZiB1c2VyIGhhcyBiZWVuIGNyZWF0ZWQgb3IgaWYgdGhlIGlzIGFuIGVycm9yXHJcbiAgaWYoZGF0YS5zdWNjZXNzZnVsVHJhbnNhY3Rpb24pe1xyXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoc2V0UGFzc3dvcmRDb21wb25lbnRzLHtcclxuICAgICAgY29udGV4dDp7bXNnOmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl91dWlkXCIpfSxcclxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3UmVmLFxyXG4gICAgfSkudGhlbigocmVzdWx0KT0+e1xyXG4gICAgIGlmKHJlc3VsdCl7XHJcbiAgICAgICBsZXQgdXNlcm5hbWU9bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlbWFpbFwiKTtcclxuICAgICAgIGxldCBwYXNzd29yZD1sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInBhc3N3b3JkXCIpO1xyXG4gICAgICAgbGV0IHVzZXI9e2VtYWlsOlwiXCIscGFzc3dvcmQ6XCJcIn07XHJcbiAgICAgICB1c2VyLmVtYWlsPXVzZXJuYW1lO1xyXG4gICAgICAgdXNlci5wYXNzd29yZD1wYXNzd29yZDtcclxuICAgICAgIGNvbnNvbGUubG9nKFwic2lnbnVwIFwiK0pTT04uc3RyaW5naWZ5KHVzZXIpKVxyXG4gICAgICAgIHRoaXMub2F1dGgubG9naW4odXNlcikuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgIH1cclxuICAgIH0pLmNhdGNoKChlcnIpPT57Y29uc29sZS5sb2coZXJyKX0pO1xyXG4gIH1cclxuIH0pO1xyXG4gfVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==