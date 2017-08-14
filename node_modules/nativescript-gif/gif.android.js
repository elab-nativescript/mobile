"use strict";
var Common = require("./gif.common");
var fs = require("file-system");
var http = require("http");
var gif_common_1 = require("./gif.common");
global.moduleMerge(Common, exports);
var Gif = (function (_super) {
    __extends(Gif, _super);
    function Gif() {
        return _super.call(this) || this;
    }
    Gif.prototype.createNativeView = function () {
        this.nativeView = new pl.droidsonroids.gif.GifImageView(this._context);
        return this.nativeView;
    };
    Gif.prototype.stop = function () {
        if (this._drawable)
            this._drawable.stop();
    };
    Gif.prototype.start = function () {
        if (this._drawable)
            this._drawable.start();
    };
    Gif.prototype.isPlaying = function () {
        if (this._drawable) {
            var isPlaying = this._drawable.isRunning();
            return isPlaying;
        }
        else {
            return false;
        }
    };
    Gif.prototype.getFrameCount = function () {
        if (this._drawable)
            var frames = this._drawable.getNumberOfFrames();
        return frames;
    };
    Gif.prototype.reset = function () {
        this._drawable.reset();
    };
    Gif.prototype.getDuration = function () {
        if (this._drawable) {
            var duration = this._drawable.getDuration();
            return duration;
        }
        else {
            return 0;
        }
    };
    Gif.prototype.setSpeed = function (factor) {
        if (this._drawable)
            this._drawable.setSpeed(factor);
    };
    Gif.prototype.recycle = function () {
        if (this._drawable)
            this._drawable.recycle();
    };
    Gif.prototype[gif_common_1.srcProperty.setNative] = function (value) {
        var that = this;
        if (value) {
            value = value.trim();
            var isUrl = false;
            if (value.indexOf("://") !== -1) {
                if (value.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }
            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;
                if (value[1] === '/' && (value[0] === '.' || value[0] === '~')) {
                    value = value.substr(2);
                }
                if (value[0] !== '/') {
                    value = currentPath + '/' + value;
                }
                this._drawable = new pl.droidsonroids.gif.GifDrawable(value);
                this.nativeView.setImageDrawable(this._drawable);
            }
            else {
                http.request({ url: value, method: "GET" }).then(function (r) {
                    that._drawable = new pl.droidsonroids.gif.GifDrawable(r.content.raw.toByteArray());
                    that.nativeView.setImageDrawable(that._drawable);
                }, function (err) {
                    console.log(err);
                });
            }
        }
        else {
            console.log("No src property set for the Gif");
        }
    };
    return Gif;
}(Common.Gif));
exports.Gif = Gif;
