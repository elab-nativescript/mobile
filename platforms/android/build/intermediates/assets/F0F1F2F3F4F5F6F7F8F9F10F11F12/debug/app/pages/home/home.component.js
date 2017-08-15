"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var hint_util_1 = require("../../utils/hint-util");
var colorModule = require("tns-core-modules/color");
var outh_1 = require("../../shared/outh/outh");
var keyframe_animation_1 = require("ui/animation/keyframe-animation");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var Color = colorModule.Color;
var homeComponent = (function () {
    function homeComponent(page, router, OuthService, fonticon, RouterExtensions) {
        this.page = page;
        this.router = router;
        this.OuthService = OuthService;
        this.fonticon = fonticon;
        this.RouterExtensions = RouterExtensions;
        this.usr = {
            name: "",
            password: ""
        };
        this.usr = { name: "", password: "" };
    }
    homeComponent.prototype.setTextFieldColors = function () {
        var emailTextField = this.email.nativeElement;
        var passwordTextField = this.password.nativeElement;
        emailTextField.fontSize = 20;
        passwordTextField.fontSize = 20;
        var hintColor = new Color("#ffffff");
        hint_util_1.setHintColor({ view: emailTextField, color: hintColor });
        hint_util_1.setHintColor({ view: passwordTextField, color: hintColor });
    };
    homeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.setTextFieldColors(); }, 1);
        this.page.actionBarHidden = true;
        this.page.style.backgroundImage = "~/pages/home/imgs/background.jpg";
        this.page.style.backgroundRepeat = "no-repeat";
        this.page.style.backgroundSize = "100% 100%";
        //check if the user already have been logedin
        try {
            var user_token = localStorage.getItem("access_token")['token'];
            var user_uuid = localStorage.getItem("user_profile")['uuid'];
            if (user_token && user_uuid) {
                this.OuthService.loadUser(user_uuid, user_token).subscribe(function (res) {
                    if (res.successfulTransaction === true) {
                        _this.RouterExtensions.navigate(["/landing"], { clearHistory: true });
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    homeComponent.prototype.sigin = function () {
        this.OuthService.login(this.usr)
            .subscribe(function () { return console.log("test"); });
    };
    homeComponent.prototype.signup = function () {
        this.router.navigate(["/signup"]);
    };
    homeComponent.prototype.textfield_validation = function () {
        var email_tf = this.page.getViewById("email");
        var password_tf = this.page.getViewById("password");
        if (email_tf.text == "") {
            var animationInfo = this.page.getKeyframeAnimationWithName("notvalid");
            animationInfo.duration = 200;
            var animation = keyframe_animation_1.KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
            animation.play(email_tf).then(function () {
                console.log("Played with code!");
            });
        }
        else if (password_tf.text == "") {
            var animationInfo = this.page.getKeyframeAnimationWithName("notvalid");
            animationInfo.duration = 200;
            var animation = keyframe_animation_1.KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
            animation.play(password_tf).then(function () {
                console.log("Played with code!");
            });
        }
    };
    return homeComponent;
}());
__decorate([
    core_1.ViewChild("email"),
    __metadata("design:type", core_1.ElementRef)
], homeComponent.prototype, "email", void 0);
__decorate([
    core_1.ViewChild("password"),
    __metadata("design:type", core_1.ElementRef)
], homeComponent.prototype, "password", void 0);
homeComponent = __decorate([
    core_1.Component({
        selector: "home",
        providers: [outh_1.OuthService],
        templateUrl: "./pages/home/home.component.html",
        styleUrls: ["pages/home/home-common.css"],
    }),
    __metadata("design:paramtypes", [page_1.Page, router_1.Router, outh_1.OuthService, nativescript_ng2_fonticon_1.TNSFontIconService, router_2.RouterExtensions])
], homeComponent);
exports.homeComponent = homeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RTtBQUN2RSxnQ0FBNkI7QUFDN0IsMENBQXVDO0FBQ3ZDLHNEQUE2RDtBQUc3RCxtREFBcUQ7QUFFckQsb0RBQXNEO0FBSXRELCtDQUFxRDtBQUdyRCxzRUFBa0U7QUFDbEUsdUVBQStEO0FBRS9ELGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFFcEMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztBQVE5QixJQUFhLGFBQWE7SUFRekIsdUJBQW9CLElBQVUsRUFBUyxNQUFjLEVBQVMsV0FBdUIsRUFBUyxRQUE0QixFQUFTLGdCQUFpQztRQUFoSixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBTDVKLFFBQUcsR0FBRztZQUNaLElBQUksRUFBQyxFQUFFO1lBQ1AsUUFBUSxFQUFDLEVBQUU7U0FDWixDQUFDO1FBR0MsSUFBSSxDQUFDLEdBQUcsR0FBQyxFQUFHLElBQUksRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBRyxDQUFDO0lBQ3BDLENBQUM7SUFJRCwwQ0FBa0IsR0FBbEI7UUFDRyxJQUFJLGNBQWMsR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUN6RCxJQUFJLGlCQUFpQixHQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQy9ELGNBQWMsQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDO1FBQzNCLGlCQUFpQixDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxTQUFT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QUFDO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLGFBQWEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQzdCLElBQUksU0FBUyxHQUFHLHNDQUFpQixDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUlKLG9CQUFDO0FBQUQsQ0FBQyxBQWhGRCxJQWdGQztBQS9FcUI7SUFBbkIsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7OEJBQVEsaUJBQVU7NENBQUM7QUFDZjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBVyxpQkFBVTsrQ0FBQztBQUZqQyxhQUFhO0lBUHpCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsTUFBTTtRQUNoQixTQUFTLEVBQUUsQ0FBQyxrQkFBVyxDQUFFO1FBQ3pCLFdBQVcsRUFBQyxrQ0FBa0M7UUFDOUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7S0FDMUMsQ0FBQztxQ0FVeUIsV0FBSSxFQUFpQixlQUFNLEVBQXFCLGtCQUFXLEVBQW1CLDhDQUFrQixFQUEwQix5QkFBZ0I7R0FSeEosYUFBYSxDQWdGekI7QUFoRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0ICxWaWV3Q2hpbGQgLEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7Vmlld30gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9JbWFnZVwiO1xyXG5pbXBvcnQgeyBzZXRIaW50Q29sb3IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaGludC11dGlsXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIGNvbG9yTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAnYXBwbGljYXRpb24nO1xyXG5pbXBvcnQge1ROU0ZvbnRJY29uLCBmb250aWNvbn0gZnJvbSAnbmF0aXZlc2NyaXB0LWZvbnRpY29uJztcclxuaW1wb3J0IHsgT3V0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL291dGgvb3V0aFwiO1xyXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uQ3VydmV9IGZyb20gXCJ1aS9lbnVtc1wiO1xyXG5pbXBvcnQge0tleWZyYW1lQW5pbWF0aW9ufSBmcm9tIFwidWkvYW5pbWF0aW9uL2tleWZyYW1lLWFuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmcyLWZvbnRpY29uJztcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuXHJcbnZhciBDb2xvciA9IGNvbG9yTW9kdWxlLkNvbG9yO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJob21lXCIsXHJcbiAgcHJvdmlkZXJzOiBbT3V0aFNlcnZpY2UgXSxcclxuICB0ZW1wbGF0ZVVybDpcIi4vcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9ob21lL2hvbWUtY29tbW9uLmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBob21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gIEBWaWV3Q2hpbGQoXCJlbWFpbFwiKSBlbWFpbDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6IEVsZW1lbnRSZWY7XHJcbiBwdWJsaWMgIHVzciA9IHtcclxuICAgbmFtZTpcIlwiLFxyXG4gICBwYXNzd29yZDpcIlwiXHJcbiB9O1xyXG4gIHByaXZhdGUgY29uZmV0dGlWaWV3OiBhbnk7XHJcbiBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UscHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIE91dGhTZXJ2aWNlOk91dGhTZXJ2aWNlLHByaXZhdGUgZm9udGljb246IFROU0ZvbnRJY29uU2VydmljZSxwcml2YXRlIFJvdXRlckV4dGVuc2lvbnM6Um91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgdGhpcy51c3I9eyAgbmFtZTpcIlwiLHBhc3N3b3JkOlwiXCIgIH07XHJcbiAgIH1cclxuXHJcblxyXG5cclxuICAgc2V0VGV4dEZpZWxkQ29sb3JzKCkge1xyXG4gICAgICBsZXQgZW1haWxUZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZW1haWwubmF0aXZlRWxlbWVudDtcclxuICAgICAgbGV0IHBhc3N3b3JkVGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLnBhc3N3b3JkLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGVtYWlsVGV4dEZpZWxkLmZvbnRTaXplPTIwO1xyXG4gICAgICBwYXNzd29yZFRleHRGaWVsZC5mb250U2l6ZT0yMDtcclxuICAgICAgbGV0IGhpbnRDb2xvcj1uZXcgQ29sb3IoXCIjZmZmZmZmXCIpO1xyXG4gICAgICBzZXRIaW50Q29sb3IoeyB2aWV3OiBlbWFpbFRleHRGaWVsZCwgY29sb3I6IGhpbnRDb2xvciB9KTtcclxuICAgICAgc2V0SGludENvbG9yKHsgdmlldzogcGFzc3dvcmRUZXh0RmllbGQsIGNvbG9yOiBoaW50Q29sb3IgfSk7XHJcbiAgICB9XHJcbiAgIG5nT25Jbml0KCkge1xyXG4gICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLiBzZXRUZXh0RmllbGRDb2xvcnMoKTt9LDEpO1xyXG4gICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgIHRoaXMucGFnZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9IFwifi9wYWdlcy9ob21lL2ltZ3MvYmFja2dyb3VuZC5qcGdcIjtcclxuICAgICB0aGlzLnBhZ2Uuc3R5bGUuYmFja2dyb3VuZFJlcGVhdD1cIm5vLXJlcGVhdFwiO1xyXG4gICAgIHRoaXMucGFnZS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT1cIjEwMCUgMTAwJVwiO1xyXG5cclxuXHJcbiAgICAgLy9jaGVjayBpZiB0aGUgdXNlciBhbHJlYWR5IGhhdmUgYmVlbiBsb2dlZGluXHJcbiAgICAgdHJ5e1xyXG4gICAgICAgbGV0IHVzZXJfdG9rZW49bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY2Nlc3NfdG9rZW5cIilbJ3Rva2VuJ107XHJcbiAgICAgICBsZXQgdXNlcl91dWlkPWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9wcm9maWxlXCIpWyd1dWlkJ107XHJcbiAgICAgICAgICAgaWYodXNlcl90b2tlbiYmdXNlcl91dWlkKXtcclxuICAgICAgICAgICAgICB0aGlzLk91dGhTZXJ2aWNlLmxvYWRVc2VyKHVzZXJfdXVpZCx1c2VyX3Rva2VuKS5zdWJzY3JpYmUoKHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzZnVsVHJhbnNhY3Rpb249PT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5Sb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sYW5kaW5nXCJdLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgIHNpZ2luKCl7XHJcbiAgICAgdGhpcy5PdXRoU2VydmljZS5sb2dpbih0aGlzLnVzcilcclxuICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAoKSA9PiBjb25zb2xlLmxvZyhcInRlc3RcIikpO1xyXG4gICB9XHJcbiAgIHNpZ251cCgpe1xyXG4gICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zaWdudXBcIl0pO1xyXG4gICB9XHJcblxyXG4gICB0ZXh0ZmllbGRfdmFsaWRhdGlvbigpe1xyXG4gICAgIGxldCBlbWFpbF90Zj10aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8VGV4dEZpZWxkPihcImVtYWlsXCIpO1xyXG4gICAgIGxldCBwYXNzd29yZF90Zj10aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8VGV4dEZpZWxkPihcInBhc3N3b3JkXCIpO1xyXG4gICAgIGlmKGVtYWlsX3RmLnRleHQ9PVwiXCIpe1xyXG4gICAgICAgIGxldCBhbmltYXRpb25JbmZvID0gdGhpcy5wYWdlLmdldEtleWZyYW1lQW5pbWF0aW9uV2l0aE5hbWUoXCJub3R2YWxpZFwiKTtcclxuICAgICAgICBhbmltYXRpb25JbmZvLmR1cmF0aW9uID0gMjAwO1xyXG4gICAgICAgIGxldCBhbmltYXRpb24gPSBLZXlmcmFtZUFuaW1hdGlvbi5rZXlmcmFtZUFuaW1hdGlvbkZyb21JbmZvKGFuaW1hdGlvbkluZm8pO1xyXG4gICAgICAgIGFuaW1hdGlvbi5wbGF5KGVtYWlsX3RmKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZWQgd2l0aCBjb2RlIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICB9ZWxzZSBpZihwYXNzd29yZF90Zi50ZXh0PT1cIlwiKXtcclxuICAgICAgIGxldCBhbmltYXRpb25JbmZvID0gdGhpcy5wYWdlLmdldEtleWZyYW1lQW5pbWF0aW9uV2l0aE5hbWUoXCJub3R2YWxpZFwiKTtcclxuICAgICAgIGFuaW1hdGlvbkluZm8uZHVyYXRpb24gPSAyMDA7XHJcbiAgICAgICBsZXQgYW5pbWF0aW9uID0gS2V5ZnJhbWVBbmltYXRpb24ua2V5ZnJhbWVBbmltYXRpb25Gcm9tSW5mbyhhbmltYXRpb25JbmZvKTtcclxuICAgICAgIGFuaW1hdGlvbi5wbGF5KHBhc3N3b3JkX3RmKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllZCB3aXRoIGNvZGUhXCIpO1xyXG4gICAgICAgfSk7XHJcbiAgICAgfVxyXG4gICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19