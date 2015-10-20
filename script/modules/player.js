/**
 * Player Class
 *
 * user or computer
 */

define(["gameConfig","transit","resource","tools"],function(cfg,transit,resource,tools){
  var Player = function(){
      this.screen = $(window);

      this.playerTimer = null;
  };
  Player.prototype = {
    create : function(opt){
      var _this = this;
          _this.clipX = opt.clipX;
          _this.clipY = opt.clipY;

      var cell = $('<div></div>');
          cell.css({
              x : opt.translateX,
              y : opt.translateY,
              left : opt.left || (_this.screen.width()-opt.size)/2-_this.clipX,
              top : opt.top || (_this.screen.height()-opt.size)/2-_this.clipY,
              width : opt.size,
              height : opt.size,
              backgroundImage : "url("+opt.headImage+")",
              backgroundSize : "100% 100%",
              backgroundPosition : "center center",
              backgroundRepeat : "no-repeat"
          });

          cell.attr("id",opt.id);
          cell.addClass(opt.className);
          cell.addClass('role-player');
      _this.render = cell;
    },
    eatBeans : function(par,opt,over){
      var _this = opt.ethis;
      var food = 0;
      var Computer = 0;
      var tL,tT,tId;
      var targetPoints= [];
      var user = _this.user;
      var uL = _this.x;
      var uT = _this.y;
      var uS = user.width()*user.css("scale");

      if($("#info").length<1){
        $("body").append("<div id='info'><span class='food'></span><span class='computer'></span><span class='time'></span></div>");
      }

      $(".game-map div").not(user).each(function(i,c){

        tL = parseInt($(this).css("translate").split(",")[0]);
        tT = parseInt($(this).css("translate").split(",")[1]);
        tS = $(this).css("scale")*$(this).width();

        if( Math.sqrt((uL-tL)*(uL-tL)-(uT-tT)*(uT-tT)) < user.width()/2 && uS>tS){
          $(this).remove();
          console.log($(this).attr("id").split("_")[0])
          if($(this).attr("id").split("_")[0] == "food"){
            user.css({ scale: '+='+cfg.aiNutrition});
            food++;
            $("#info .food").text(food);
          }else{
            user.css({ scale: '+='+cfg.foodNutrition});
            Computer++;
            $("#info .computer").text(Computer);
          }

        }else {
          if(Math.sqrt((uL-tL)*(uL-tL)-(uT-tT)*(uT-tT)) < user.width()/2 && $(this).attr("id").split("_")[0] == "black"){
            user.fadeOut();
            over(par,foot,Computer)
            clearInterval(_this.playerTimer)
          }
        }
      });

    },
    controlMove : function(opt){
      var _this = this;

      _this.mapMove = true;
      _this.x = 0;
      _this.y = 0;
      _this.map = opt.map;
      _this.user = opt.user;
      _this.mapWidth = opt.mapWidth;
      _this.mapHeight = opt.mapHeight;
      var dirX = 1;
      var dirY = 1;

      $("#gameAreaWrapper").on("touchstart",function(e){
          var touch = e.originalEvent.targetTouches[0];
          var TargetX = parseInt(touch.pageX) ;
          var TargetY = parseInt(touch.pageY);
          var x1 = TargetX - _this.clipX, y1 = TargetY-_this.clipY;
          var x2 = (_this.screen.width()-cfg.userPlayerSize)/2-_this.clipX, y2 =  (_this.screen.height()-cfg.userPlayerSize)/2-_this.clipY;
              dirX = (x1 - x2)/(x1 + x2)*50;
              dirY = (y1 - y2)/(y1 + y2)*50;

          _this.movePlayer(dirX,dirY,_this.arrPoints);

      });

    },
    movePlayer : function(dirX,dirY,arrPoints){
      var speed = cfg.userPlayerSpeed;
      var _this = this;

      clearInterval(_this.playerTimer)
      this.playerTimer = setInterval(function(){

        _this.x = _this.x+speed*dirX;
        _this.y = _this.y+speed*dirY;

        if(_this.x/_this.mapWidth>0.5){
          _this.x = _this.mapWidth*0.5-cfg.userPlayerSize/2;
        }
        if(_this.x/_this.mapWidth<-0.5){
          _this.x = _this.mapWidth*-0.5+cfg.userPlayerSize/2;
        }

        if(_this.y/_this.mapHeight>0.68){
          _this.y = _this.mapHeight*0.68-cfg.userPlayerSize/2;
        }
        if(_this.y/_this.mapHeight<-0.32){
          _this.y = _this.mapHeight*-0.32+cfg.userPlayerSize/2;
        }
        //transition
        _this.user.transition({ "x":_this.x,"y":_this.y },200,'linear');
        if(_this.mapMove){
          _this.map.transition({ "x":-_this.x,"y":-_this.y },200,'linear');
        }


      },200);
    },
    movePlayer2 : function(dirX,dirY){
      var speed = cfg.userPlayerSpeed/10;
      var _this = this;

      clearInterval(_this.playerTimer)
      this.playerTimer = setInterval(function(){

        _this.x = _this.x+speed*dirX;
        _this.y = _this.y+speed*dirY;

        if(_this.x/_this.mapWidth>0.5){
          dirX = -dirX;
        }
        if(_this.x/_this.mapWidth<-0.5){
          dirX = -dirX;
        }

        if(_this.y/_this.mapHeight>0.68){
          dirY = -dirY;
        }
        if(_this.y/_this.mapHeight<-0.32){
          dirY = -dirY;
        }
        //transition
        _this.user.transition({ "x":_this.x,"y":_this.y },200,'linear');
        if(_this.mapMove){
          _this.map.transition({ "x":-_this.x,"y":-_this.y },200,'linear');
        }

      },200);
    },
    autoMove : function(opt){
      var _this = this;

      _this.mapMove = false;
      _this.x = opt.startX-cfg.userPlayerSize;
      _this.y = opt.startY-cfg.userPlayerSize;
      _this.map = opt.map;
      _this.user = opt.user;
      _this.mapWidth = opt.mapWidth;
      _this.mapHeight = opt.mapHeight;
      var dirX = 1;
      var dirY = 1;


      var TargetX = tools.random(-_this.mapWidth/2,_this.mapWidth/2);
      var TargetY = tools.random(-_this.mapHeight/2,_this.mapHeight/2);

      var x1 = TargetX - _this.clipX, y1 = TargetY-_this.clipY;
      var x2 = (_this.screen.width()-cfg.userPlayerSize)/2-_this.clipX, y2 =  (_this.screen.height()-cfg.userPlayerSize)/2-_this.clipY;
          dirX = (x1 - x2)/(x1 + x2)*50;
          dirY = (y1 - y2)/(y1 + y2)*50;
      var dirLimit = 50;

          if(dirX<-dirLimit){
            dirX = dirLimit;
          }else if(dirX>dirLimit){
            dirX = dirLimit;
          }

          if(dirY<-dirLimit){
            dirY = dirLimit;
          }else if(dirY>dirLimit){
            dirY = dirLimit;
          }

      _this.movePlayer2(dirX,dirY);

    },
    CalculateFinalPoint : function(point1,point2){
          var x1 = point1.x;
          var y1 = point1.y;
          var x2 = point2.x;
          var y2 = point2.y;
          var a;
          var b;
          var dir = {};
          var finalPoint = {};

          b = y1-x2*y2/(1+x1);
          a = (y2 - b)/x2;

          if(x1<x2){
            dir.hor = "left";
          }else if(x1>x2){
            dir.hor = "right";
          }else{
            dir.hor = "hor";
          }

          if(y1<y2){
            dir.ver = "top";
          }else if(y1>y2){
            dir.ver = "dowm";
          }else{
            dir.ver = "ver";
          }

           var point1 = {
              dir : "left",
              x : 0,
              y : b
           };
           var point2 = {
              dir : "top",
              x : -b/a,
              y : 0
           };
           var point3 = {
              dir : "right",
              x : this.mapWidth,
              y : a*this.mapWidth + b
           };
           var point4 = {
              dir : "down",
              x : (this.mapHeight-b)/a,
              y : this.mapHeight
           };

           var allPoint = [point1,point2,point3,point4]

          if(b < this.mapHeight && b>0){
              //左边有交点
              console.log("左边有交点");
          }

          if(-b/a>=0 && -b/a<=this.mapWidth){
              //上边有交点
              console.log("上边有交点");
          }
          if((a*this.mapWidth +b) < this.mapWidth && (a*this.mapWidth +b)>0){
            // 右边有交点
            console.log("右边有交点");
          }
          if( (this.mapHeight-b)/a >=0 && (this.mapHeight-b)/a<=this.mapHeight){
            // 下边有交点
            console.log("下边有交点");
          }
           console.log(b)

    }
  }

  return Player;
});