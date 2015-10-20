/**
 * 游戏开始
 * 创建场景及对象
 */
define(["gameConfig","player","transit","tools","resource"],function(cfg,Player,transit,tools,res){

    var Game = function(){
        this.ctx = [];
        this.map = null;
        this.clipX = 0;
        this.clipY = 0;
        this.user = null;
        this.foodCenterPoint = [];
        this.screen = $(window);
        this.addObj = [];
    };
    Game.prototype = {
        run : function(id){
            var _this = this;

            this.ctx = $("#"+id);
            this.map = this.ctx.find(".game-map");

            this.createMap();

            this.createComputerPlayers();
            this.createFood();
            this.createUserPlayer();

            _this.addFoodTimer = setInterval(function(){
              _this.createFood(cfg.addfood)
            },1000);

            _this.addFoodTimer = setInterval(function(){
              _this.addBlackhold();
            },cfg.BlackholdTimpClip*1000);

            var gameTime = parseInt(cfg.gameTime);
            $(".game-time").text(gameTime+"秒");
            _this.gt = setInterval(function(){
              gameTime -= 1;
              if($("#info .time").length>0){
                $("#info .time").text(cfg.gameTime-gameTime);
              }
              if(gameTime>0){
                $(".game-time").text(gameTime+"秒")
              }else{
                $(".game-time").text(gameTime+"秒")
                _this.gameOver(_this);
                clearInterval(gt);
              }

            },1000);
        },
        createMap : function(){
            var _this = this;
            // 创建地图
            this.mapWidth = _this.screen.width()*(cfg.mapSize<1?1:cfg.mapSize);
            this.mapHeight = _this.screen.height()*(cfg.mapSize<1?1:cfg.mapSize);
            this.clipX = -(this.mapWidth-this.screen.width())/2;
            this.clipY = -(this.mapWidth-this.screen.height())/2;

            this.map.css({
                width : this.mapWidth,
                height : this.mapHeight,
                left: _this.clipX,
                top : _this.clipY
            });
            this.map.show();
        },
        createUserPlayer : function(){
            // 创建主角
            var _this = this;
            var id = "ioPlayer";
            this.user = new Player();
            this.user.create({
                  headImage : cfg.userPlayerHeader,
                  id : id,
                  size : cfg.userPlayerSize,
                  clipX : _this.clipX,
                  clipY : _this.clipY,
                  className : "",
                  translateX : 0,
                  translateY : 0
            });
            this.map.append(this.user.render);

            // 添加移动控制
            this.user.controlMove({
              user : $("#"+id),
              map : _this.map,
              mapWidth : _this.mapWidth,
              mapHeight : this.mapHeight
            });

            // 吃豆子
            setInterval(function(){
              _this.user.eatBeans(_this,{
                arrPoints : _this.foodCenterPoint,
                ethis :  _this.user
              },function(par){
                _this.gameOver(par);
              });
            },10);
        },
        createComputerPlayers : function(){
          var _this = this;

          // 创建AI
          var AI = null;
          for(var i=0;i<cfg.aiAmount;i++){
            AI = new Player();
            var startX = tools.random(-_this.mapWidth/2,_this.mapWidth/2);
            var strartY = tools.random(-_this.mapHeight/2,_this.mapHeight/2);
            AI.create({
                headImage : tools.randomArry(res.computerPlayer),
                id : "ai_"+i,
                size : cfg.userPlayerSize,
                clipX : _this.clipX,
                clipY : _this.clipY,
                className : "role-emeny type-"+tools.random(1,10)+" color-"+tools.random(1,10)+" s",
                translateX : startX,
                translateY : strartY
            });
            $(AI.render).prependTo(this.map);

            // 自动运行
            AI.autoMove({
              user : $("#ai_"+i),
              map : _this.map,
              mapWidth : _this.mapWidth,
              mapHeight : _this.mapHeight,
              startX : startX,
              startY : startX,
            })
          }

        },
        createFood : function(amount){
          var _this = this;

          // 创建食物
          var food = null;
          for(var i=0;i< (amount || cfg.foodAmount);i++){

            var startX = tools.random(-_this.mapWidth,_this.mapWidth);
            var startY = tools.random(-_this.mapHeight,_this.mapHeight);
            var id = "food_"+i;
            food = new Player();
            food.create({
                headImage : tools.randomArry(res.enemy),
                id : id,
                size : cfg.foodSize,
                clipX : _this.clipX,
                clipY : _this.clipY,
                className : "role-emeny type-"+tools.random(1,10)+" color-"+tools.random(1,10)+" s",
                translateX : startX,
                translateY : startY
            });
            // _this.foodCenterPoint.push({id:id,x:startX+cfg.foodSize/2,y:startY-cfg.foodSize/2});
            $(food.render).prependTo(this.map);
          }
        },
        addBlackhold : function(){
          var _this = this;

          var startX = tools.random(-_this.mapWidth/2,_this.mapWidth/2);
          var startY = tools.random(-_this.mapHeight/2,_this.mapHeight/2);

          var blackhold = new Player();
          blackhold.create({
              headImage : res.src.blackhole,
              id : "black_hole",
              size : cfg.blackholdSize,
              clipX : _this.clipX,
              clipY : _this.clipY,
              className : "black-hole",
              translateX : startX,
              translateY : startY
          });

          this.map.append(blackhold.render);

        },
        gameOver : function(par){
          var _this = par;
          clearInterval(_this.addFoodTimer);
          var foodNum = $("#info .food").text() || 0;
          var computerNum = $("#info .computer").text() || 0;
          var time = $("#info .time").text() || 0;

          //游戏时长
          $(".results .res-code").eq(0).text(time+"秒");
          //进取精神
          $(".results .res-code").eq(1).text(computerNum*cfg.aiScore+"点");
          //舞蹈技能
          $(".results .res-code").eq(2).text(foodNum*cfg.foodScore+"点");
          //额外奖励
          $(".results .res-code").eq(3).text(time*cfg.timeScore+"点");

          var allScore = parseInt(computerNum*cfg.aiScore)+parseInt(foodNum*cfg.foodScore)+parseInt(time*cfg.timeScore);

          switch(allScore){
            case 100:
              $(".badge").attr("src",res.src.level_1);
            case 200:
              $(".badge").attr("src",res.src.level_2);
            case 300:
              $(".badge").attr("src",res.src.level_3);
            case 400:
              $(".badge").attr("src",res.src.level_4);
            case 500:
              $(".badge").attr("src",res.src.level_5);
            case 600:
              $(".badge").attr("src",res.src.level_6);
              break;
          }
          clearInterval(_this.gt);
          $("#success").show();
        }

    };

    return new Game;
});