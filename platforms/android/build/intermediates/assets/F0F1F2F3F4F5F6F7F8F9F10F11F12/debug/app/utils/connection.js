"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectivity = require("connectivity");
var permissions = require("nativescript-permissions");
var Toast = require("nativescript-toast");
var connectWith;
var isConnected = false;
function connectionType() {
    var _this = this;
    permissions.requestPermission(android.Manifest.permission.ACCESS_NETWORK_STATE, "I need these permissions because I'm cool")
        .then(function () {
        switch (connectivity.getConnectionType()) {
            case connectivity.connectionType.none:
                _this.connectWith = "None";
                var toast = Toast.makeText("There is no connection");
                toast.show();
                isConnected = false;
                break;
            case connectivity.connectionType.wifi:
                isConnected = true;
                break;
            case connectivity.connectionType.mobile:
                isConnected = true;
                break;
            default:
                isConnected = false;
                break;
        }
    })
        .catch(function () {
    });
    return isConnected;
}
exports.connectionType = connectionType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkM7QUFDN0Msc0RBQXdEO0FBQ3hELDBDQUE0QztBQUcxQyxJQUFJLFdBQW1CLENBQUM7QUFDeEIsSUFBSSxXQUFXLEdBQUMsS0FBSyxDQUFDO0FBQ3hCO0lBQUEsaUJBMEJDO0lBeEJDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSwyQ0FBMkMsQ0FBQztTQUNwSCxJQUFJLENBQUM7UUFFRixNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUMxQixJQUFNLEtBQUssR0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDYixXQUFXLEdBQUMsS0FBSyxDQUFDO2dCQUNsQixLQUFLLENBQUM7WUFDVixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSTtnQkFDckMsV0FBVyxHQUFDLElBQUksQ0FBQztnQkFDakIsS0FBSyxDQUFDO1lBQ04sS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ3ZDLFdBQVcsR0FBQyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztZQUNOO2dCQUNBLFdBQVcsR0FBQyxLQUFLLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQztRQUNWLENBQUM7SUFDTCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNaLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDbkIsQ0FBQztBQTFCRCx3Q0EwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xyXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0XCI7XHJcblxyXG4gIGRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueVxyXG4gIHZhciBjb25uZWN0V2l0aDogc3RyaW5nO1xyXG4gIGxldCBpc0Nvbm5lY3RlZD1mYWxzZTtcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3Rpb25UeXBlKCl7XHJcblxyXG4gIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5BQ0NFU1NfTkVUV09SS19TVEFURSwgXCJJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnMgYmVjYXVzZSBJJ20gY29vbFwiKVxyXG4gICAgICAgICAudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgc3dpdGNoIChjb25uZWN0aXZpdHkuZ2V0Q29ubmVjdGlvblR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFdpdGggPSBcIk5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9hc3Q9VG9hc3QubWFrZVRleHQoXCJUaGVyZSBpcyBubyBjb25uZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICB0b2FzdC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIGlzQ29ubmVjdGVkPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS53aWZpOlxyXG4gICAgICAgICAgICAgICAgIGlzQ29ubmVjdGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgIGlzQ29ubmVjdGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICBpc0Nvbm5lY3RlZD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfSlcclxuICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgfSk7XHJcbnJldHVybiBpc0Nvbm5lY3RlZDtcclxufVxyXG4iXX0=