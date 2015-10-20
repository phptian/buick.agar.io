/**
 * tools
 */
define(function(){
    var tools = function(){

    };

    tools.prototype = {
        random : function(Min,Max){
            var Range = Max - Min;
            var Rand = Math.random();
            return(Min + Math.round(Rand * Range));
        },
        randomArry : function(arr){
            var _this = this;
            return arr[_this.random(0,arr.length-1)];
        }
    }

    return new tools;
});