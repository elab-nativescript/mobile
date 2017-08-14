"use strict";
var view_1 = require("ui/core/view");
var Gif = (function (_super) {
    __extends(Gif, _super);
    function Gif() {
        return _super.call(this) || this;
    }
    return Gif;
}(view_1.View));
exports.Gif = Gif;
exports.srcProperty = new view_1.Property({
    name: "src", defaultValue: ""
});
exports.srcProperty.register(Gif);
exports.isLoadingProperty = new view_1.Property({
    name: "isLoading", defaultValue: false
});
exports.isLoadingProperty.register(Gif);
