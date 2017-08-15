"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var restcountries = (function () {
    function restcountries(http) {
        this.http = http;
    }
    //get all countries
    restcountries.prototype.getAllcountries = function () {
        loader.show({ message: "please wait..." });
        var headers = new http_1.Headers();
        var apiUrl = "https://restcountries.eu/rest/v2/all";
        return this.http.get(apiUrl).map(function (res) {
            loader.hide();
            return res.json();
        });
    };
    restcountries.prototype.getBycurreny = function (cur) {
        loader.show({ message: "please wait..." });
        var headers = new http_1.Headers();
        var apiUrl = "https://restcountries.eu/rest/v2/currency/" + cur;
        return this.http.get(apiUrl).map(function (res) {
            loader.hide();
            return res.json();
        });
    };
    restcountries.prototype.getCurrencyRate = function () {
        loader.show({ message: "please wait..." });
        var headers = new http_1.Headers();
        var apiUrl = "http://www.apilayer.net/api/live?access_key=77de225989f08d68c492e43778a2d68f";
        return this.http.get(apiUrl).map(function (res) {
            loader.hide();
            return res.json();
        });
    };
    return restcountries;
}());
restcountries = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], restcountries);
exports.restcountries = restcountries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGNvdW50cmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc3Rjb3VudHJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBRXhELGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsaUZBQWdFO0FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQUVwQyxJQUFhLGFBQWE7SUFDeEIsdUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUcsQ0FBQztJQUNsQyxtQkFBbUI7SUFDbkIsdUNBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksT0FBTyxHQUFDLElBQUksY0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUMsc0NBQXNDLENBQUM7UUFFbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDbEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUdMLENBQUM7SUFDRCxvQ0FBWSxHQUFaLFVBQWEsR0FBRztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksT0FBTyxHQUFDLElBQUksY0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUMsNENBQTRDLEdBQUMsR0FBRyxDQUFDO1FBRTVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksT0FBTyxHQUFDLElBQUksY0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUMsOEVBQThFLENBQUM7UUFFMUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDbEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSCxvQkFBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0M7QUFyQ1ksYUFBYTtJQUR6QixpQkFBVSxFQUFFO3FDQUVlLFdBQUk7R0FEbkIsYUFBYSxDQXFDekI7QUFyQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgcmVzdGNvdW50cmllc3tcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XHJcbiAgLy9nZXQgYWxsIGNvdW50cmllc1xyXG4gIGdldEFsbGNvdW50cmllcygpe1xyXG4gICAgbG9hZGVyLnNob3coe21lc3NhZ2U6XCJwbGVhc2Ugd2FpdC4uLlwifSlcclxuICAgIGxldCBoZWFkZXJzPW5ldyBIZWFkZXJzKCk7XHJcbiAgICBsZXQgYXBpVXJsPVwiaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvYWxsXCI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYXBpVXJsKS5tYXAocmVzPT57XHJcbiAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICB9XHJcbiAgZ2V0QnljdXJyZW55KGN1cil7XHJcbiAgICBsb2FkZXIuc2hvdyh7bWVzc2FnZTpcInBsZWFzZSB3YWl0Li4uXCJ9KVxyXG4gICAgbGV0IGhlYWRlcnM9bmV3IEhlYWRlcnMoKTtcclxuICAgIGxldCBhcGlVcmw9XCJodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9jdXJyZW5jeS9cIitjdXI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYXBpVXJsKS5tYXAocmVzPT57XHJcbiAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW5jeVJhdGUoKXtcclxuICAgIGxvYWRlci5zaG93KHttZXNzYWdlOlwicGxlYXNlIHdhaXQuLi5cIn0pXHJcbiAgICBsZXQgaGVhZGVycz1uZXcgSGVhZGVycygpO1xyXG4gICAgbGV0IGFwaVVybD1cImh0dHA6Ly93d3cuYXBpbGF5ZXIubmV0L2FwaS9saXZlP2FjY2Vzc19rZXk9NzdkZTIyNTk4OWYwOGQ2OGM0OTJlNDM3NzhhMmQ2OGZcIjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChhcGlVcmwpLm1hcChyZXM9PntcclxuICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==