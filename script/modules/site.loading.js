/*
 * Created with Sublime Text 2.
 * User: Harris.Liu
 * Date: 2014-11-03
 * Time: 15:44:52
 * Contact: ifme.in@gmail.com
 */

define(['jquery'],function ($){
    var wrLoading = function(objname, imgarray, fn) {
        this.callback = fn;
        this.objname = objname;
        this.imgarray = imgarray;
        this.init();
        (imgarray && imgarray.length > 0) ? this.getImgNext() : this.onlyshow();
    }

    wrLoading.prototype = {
        loaded: 0,
        retried: 0,
        curCaseId: 0,
        init: function() {
            this.obj = $(this.objname).show();
            if (this.obj.find('.percent').length > 0)
                this.percent = this.obj.find('.percent');
        },
        show: function() {
            this.obj.fadeIn(300);
        },
        hide: function(fn) {
            this.obj.fadeOut(800); fn();
        },
        onlyshow: function() {
            var This = this;
            this.show();
            setTimeout(function() {
                This.hide(This.callback);
            }, 300);
        },
        getImgNext: function() {
            var This = this;
            var MovePoint = function() {
                This.loaded++;
                if (This.obj.find('.hot_line').length > 0) {
                    var n = Math.ceil(This.loaded / This.imgarray.length * 100);
                    This.obj.find('.hot_line').css({width: n + '%'});
                    This.obj.find('.hot_number').html('<span>'+n+'%</span>');
                }
                This.retried = 0;
                setTimeout(function() {This.getImgNext() }, 1)
            }
            if (This.loaded >= This.imgarray.length) {
                // if (This.obj.find('.percent').length > 0)
                //     This.percent.html('- 100% -');
                setTimeout(function() { This.hide(This.callback); }, 100);
                This.loaded = 0;
                This.retried = 0;
                return;
            }
            var oImg = new Image();
            oImg.onload = function() {
                MovePoint();
            };
            oImg.onerror = function() {
                This.retried++;
                if (This.retried < 3) {
                    This.getImgNext()
                } else {
                    MovePoint();
                }
            };
            oImg.src = This.imgarray[This.loaded];
        }
    }

    return wrLoading;

});
