"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var colorModule = require("tns-core-modules/color");
var outh_1 = require("../../../shared/outh/outh");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var inbox = require("nativescript-sms-inbox");
var timer = require("timer");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var Color = colorModule.Color;
var setPasswordComponents = (function () {
    function setPasswordComponents(page, router, params, OuthService) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.params = params;
        this.OuthService = OuthService;
        this.isValid = false;
        this.intervalId = timer.setInterval(function () {
            inbox.getInboxesFromNumber("Verify", { max: 1 }).then(function (res) {
                if (res.data[0].message) {
                    console.log(JSON.stringify(res.data[0].message));
                    _this.varify(res.data[0].message);
                }
            }, function (err) {
                console.log('Error read sms : ' + err);
            }).catch(function (err) { console.log(" error " + err); });
        }, 8000);
        timer.setTimeout(function () {
            timer.clearInterval(_this.intervalId);
        }, 10000);
    }
    setPasswordComponents.prototype.ngOnInit = function () {
        this.page.backgroundColor = new Color("transparent");
    };
    setPasswordComponents.prototype.onChange = function (vcode) {
        if (vcode.length === 8) {
            this.varify(vcode);
        }
    };
    setPasswordComponents.prototype.varify = function (vcode) {
        var _this = this;
        var option = {
            message: 'please wait'
        };
        this.OuthService.varification(vcode, loader, option).subscribe(function (data) {
            if (data.successfulTransaction) {
                _this.isValid = true;
                _this.close();
            }
        });
    };
    setPasswordComponents.prototype.BGvarify = function (vcode) {
        var _this = this;
        this.OuthService.BGvarification(vcode).subscribe(function (data) {
            if (data.successfulTransaction) {
                _this.isValid = true;
                _this.close();
            }
        });
    };
    setPasswordComponents.prototype.sendVcode = function () {
        var option = {
            message: 'please wait'
        };
        this.OuthService.sendVcode(loader, option).subscribe(function (data) {
            console.log(JSON.stringify(data));
        });
    };
    setPasswordComponents.prototype.getLastVMessages = function () {
        var _this = this;
        inbox.getInboxesFromNumber("Verify", { max: 1 }).then(function (res) {
            console.log(JSON.stringify(res.data[0].message));
            _this.varify(res.data[0].message);
        }, function (err) {
            console.log('Error read sms : ' + err);
        }).catch(function (err) { console.log(" error " + err); });
    };
    setPasswordComponents.prototype.close = function () {
        timer.clearInterval(this.intervalId);
        this.params.closeCallback(this.isValid);
    };
    return setPasswordComponents;
}());
setPasswordComponents = __decorate([
    core_1.Component({
        selector: 'setPassword',
        templateUrl: './pages/modals/setPW/setpassword.components.html',
        styleUrls: ['pages/modals/setPW/setpassword.components.css'],
        providers: [outh_1.OuthService],
    }),
    __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions, dialogs_1.ModalDialogParams, outh_1.OuthService])
], setPasswordComponents);
exports.setPasswordComponents = setPasswordComponents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0cGFzc3dvcmQuY29tcG9uZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHBhc3N3b3JkLmNvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBQy9ELG1FQUE0RTtBQUM1RSxnQ0FBNkI7QUFDN0Isb0RBQXNEO0FBQ3RELGtEQUF3RDtBQUV4RCxpRkFBZ0U7QUFDaEUsOENBQWdEO0FBQ2hELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFFcEMsSUFBSSxLQUFLLEdBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztBQVE1QixJQUFhLHFCQUFxQjtJQUdoQywrQkFBb0IsSUFBVSxFQUFTLE1BQXVCLEVBQVMsTUFBd0IsRUFBUyxXQUF1QjtRQUEvSCxpQkFrQkM7UUFsQm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFGdkgsWUFBTyxHQUFDLEtBQUssQ0FBQztRQUlwQixJQUFJLENBQUMsVUFBVSxHQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDaEMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQ25ELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDakQs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T0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFDLFVBQUMsR0FBRztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdNLHFDQUFLLEdBQVo7UUFDRSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQztBQWxGWSxxQkFBcUI7SUFQakMsZ0JBQVMsQ0FBRTtRQUNaLFFBQVEsRUFBQyxhQUFhO1FBQ3RCLFdBQVcsRUFBQyxrREFBa0Q7UUFDOUQsU0FBUyxFQUFFLENBQUMsK0NBQStDLENBQUM7UUFDNUQsU0FBUyxFQUFFLENBQUMsa0JBQVcsQ0FBQztLQUN2QixDQUFDO3FDQUswQixXQUFJLEVBQWdCLHlCQUFnQixFQUFnQiwyQkFBaUIsRUFBcUIsa0JBQVc7R0FIcEgscUJBQXFCLENBa0ZqQztBQWxGWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0LE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBjb2xvck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBPdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvb3V0aC9vdXRoXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQgKiBhcyBpbmJveCBmcm9tIFwibmF0aXZlc2NyaXB0LXNtcy1pbmJveFwiO1xyXG52YXIgdGltZXIgPSByZXF1aXJlKFwidGltZXJcIik7XHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5cclxudmFyIENvbG9yPWNvbG9yTW9kdWxlLkNvbG9yO1xyXG5AQ29tcG9uZW50ICh7XHJcbnNlbGVjdG9yOidzZXRQYXNzd29yZCcsXHJcbnRlbXBsYXRlVXJsOicuL3BhZ2VzL21vZGFscy9zZXRQVy9zZXRwYXNzd29yZC5jb21wb25lbnRzLmh0bWwnLFxyXG5zdHlsZVVybHM6IFsncGFnZXMvbW9kYWxzL3NldFBXL3NldHBhc3N3b3JkLmNvbXBvbmVudHMuY3NzJ10sXHJcbnByb3ZpZGVyczogW091dGhTZXJ2aWNlXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBzZXRQYXNzd29yZENvbXBvbmVudHMgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgcHVibGljICBpc1ZhbGlkPWZhbHNlO1xyXG4gIHB1YmxpYyBpbnRlcnZhbElkO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIHJvdXRlcjpSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgcGFyYW1zOk1vZGFsRGlhbG9nUGFyYW1zLHByaXZhdGUgT3V0aFNlcnZpY2U6T3V0aFNlcnZpY2Upe1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2YWxJZD10aW1lci5zZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICBpbmJveC5nZXRJbmJveGVzRnJvbU51bWJlcihcIlZlcmlmeVwiLHsgbWF4OiAxIH0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgaWYocmVzLmRhdGFbMF0ubWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzLmRhdGFbMF0ubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgIHRoaXMudmFyaWZ5KHJlcy5kYXRhWzBdLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgIH0sKGVycikgPT4ge1xyXG4gICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcmVhZCBzbXMgOiAnICsgZXJyKTtcclxuICAgICB9KS5jYXRjaCgoZXJyKT0+e2NvbnNvbGUubG9nKFwiIGVycm9yIFwiK2Vycil9KTtcclxuXHJcbiAgIH0sODAwMCk7XHJcblxyXG4gICB0aW1lci5zZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICB0aW1lci5jbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgIH0sMTAwMDApO1xyXG4gICBcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCl7XHJcblxyXG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRDb2xvcj1uZXcgQ29sb3IoXCJ0cmFuc3BhcmVudFwiKTtcclxuXHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlKHZjb2RlKXtcclxuICAgIGlmKHZjb2RlLmxlbmd0aD09PTgpe1xyXG4gICAgICB0aGlzLnZhcmlmeSh2Y29kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIHZhcmlmeSh2Y29kZSl7XHJcbiAgICB2YXIgb3B0aW9uID0ge1xyXG4gICAgIG1lc3NhZ2U6ICdwbGVhc2Ugd2FpdCdcclxuICAgICB9O1xyXG4gICAgdGhpcy5PdXRoU2VydmljZS52YXJpZmljYXRpb24odmNvZGUsbG9hZGVyLG9wdGlvbikuc3Vic2NyaWJlKChkYXRhKT0+e1xyXG4gICAgIGlmKGRhdGEuc3VjY2Vzc2Z1bFRyYW5zYWN0aW9uKXtcclxuICAgICAgIHRoaXMuaXNWYWxpZD10cnVlO1xyXG4gICAgICAgdGhpcy5jbG9zZSgpO1xyXG5cclxuICAgICB9XHJcbiAgICB9KTtcclxuICAgfVxyXG5cclxuICAgcHVibGljIEJHdmFyaWZ5KHZjb2RlKXtcclxuICAgICB0aGlzLk91dGhTZXJ2aWNlLkJHdmFyaWZpY2F0aW9uKHZjb2RlKS5zdWJzY3JpYmUoKGRhdGEpPT57XHJcbiAgICAgIGlmKGRhdGEuc3VjY2Vzc2Z1bFRyYW5zYWN0aW9uKXtcclxuICAgICAgICB0aGlzLmlzVmFsaWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgcHVibGljIHNlbmRWY29kZSgpe1xyXG4gICAgdmFyIG9wdGlvbiA9IHtcclxuICAgICBtZXNzYWdlOiAncGxlYXNlIHdhaXQnXHJcbiAgICAgfTtcclxuICAgIHRoaXMuT3V0aFNlcnZpY2Uuc2VuZFZjb2RlKGxvYWRlcixvcHRpb24pLnN1YnNjcmliZSgoZGF0YSk9PntcclxuICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdFZNZXNzYWdlcygpIHtcclxuICAgICAgaW5ib3guZ2V0SW5ib3hlc0Zyb21OdW1iZXIoXCJWZXJpZnlcIix7IG1heDogMSB9KS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhWzBdLm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy52YXJpZnkocmVzLmRhdGFbMF0ubWVzc2FnZSk7XHJcbiAgICAgIH0sKGVycikgPT4ge1xyXG4gICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcmVhZCBzbXMgOiAnICsgZXJyKTtcclxuICAgICB9KS5jYXRjaCgoZXJyKT0+e2NvbnNvbGUubG9nKFwiIGVycm9yIFwiK2Vycil9KTtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgY2xvc2UoKXtcclxuICAgIHRpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGhpcy5pc1ZhbGlkKTtcclxuICB9XHJcbn1cclxuIl19