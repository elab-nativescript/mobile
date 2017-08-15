"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var timer_1 = require("tns-core-modules/timer");
var common_1 = require("./common");
var CommonConfetti = com.github.jinatonic.confetti.CommonConfetti;
var ConfettiView = (function (_super) {
    __extends(ConfettiView, _super);
    function ConfettiView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._intensity = 0.5;
        _this._active = false;
        _this._autoStart = true;
        _this._fullScreen = false;
        _this._colors = ['#f9583c', '#dd355b'];
        return _this;
    }
    ConfettiView.prototype.initNativeView = function () {
        var _this = this;
        timer_1.setTimeout(function () {
            var intArray = Array.create('int', _this._colors.length);
            for (var i = 0; i < _this._colors.length; i++) {
                intArray[i] = new color_1.Color(_this._colors[i]).android;
            }
            _this._confetti = CommonConfetti.rainingConfetti(_this.container, intArray);
            if (_this._autoStart) {
                _this.startConfetti();
            }
        }, 1000);
    };
    ConfettiView.prototype.destroyNativeView = function () {
        this.stopConfetti();
        this._container = null;
        this._confetti = null;
    };
    ConfettiView.prototype.startConfetti = function () {
        if (this._confetti) {
            this._confetti.infinite();
        }
    };
    ConfettiView.prototype.stopConfetti = function () {
        if (this._confetti) {
            this._confetti.getConfettiManager().terminate();
        }
    };
    Object.defineProperty(ConfettiView.prototype, "container", {
        get: function () {
            return this._container || this.parent.android;
        },
        set: function (value) {
            this._container = value.android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiView.prototype, "colors", {
        set: function (value) {
            this._colors = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiView.prototype, "intensity", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiView.prototype, "fullScreen", {
        get: function () { return false; },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiView.prototype, "autoStart", {
        get: function () { return false; },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfettiView.prototype, "confetti", {
        get: function () { return this._confetti; },
        enumerable: true,
        configurable: true
    });
    return ConfettiView;
}(common_1.ConfettiViewBase));
exports.ConfettiView = ConfettiView;
