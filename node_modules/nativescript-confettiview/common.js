"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_view_1 = require("tns-core-modules/ui/content-view");
var ConfettiViewBase = (function (_super) {
    __extends(ConfettiViewBase, _super);
    function ConfettiViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfettiViewBase.prototype.startConfetti = function () { };
    ConfettiViewBase.prototype.stopConfetti = function () { };
    Object.defineProperty(ConfettiViewBase.prototype, "colors", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiViewBase.prototype, "intensity", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiViewBase.prototype, "fullScreen", {
        get: function () { return false; },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiViewBase.prototype, "autoStart", {
        get: function () { return false; },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiViewBase.prototype, "confetti", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return ConfettiViewBase;
}(content_view_1.ContentView));
exports.ConfettiViewBase = ConfettiViewBase;
