/**
 * resource paths
 */

define(function(){
    var resource = {};
    var _PUBLIC_ = "../resources/img/";
    resource.src = {
        blackhole : _PUBLIC_+"blackhole.png",
        bubble : _PUBLIC_ + "bubble.png",

        /** player **/
        playerHead : userImg ? userImg : _PUBLIC_ + "test.user.head.png",

        /** enemy **/
        enemy_1 : _PUBLIC_ + "enemy_1.png",
        enemy_2 : _PUBLIC_ + "enemy_2.png",
        enemy_3 : _PUBLIC_ + "enemy_3.png",
        enemy_4 : _PUBLIC_ + "enemy_4.png",
        enemy_5 : _PUBLIC_ + "enemy_5.png",
        enemy_6 : _PUBLIC_ + "enemy_6.png",
        enemy_7 : _PUBLIC_ + "enemy_7.png",
        enemy_8 : _PUBLIC_ + "enemy_8.png",
        enemy_9 : _PUBLIC_ + "enemy_9.png",
        enemy_10 : _PUBLIC_ + "enemy_10.png",

        /** computer_player **/
        computerPlayer_1 : _PUBLIC_ + "computerplayer_1.png",
        computerPlayer_2 : _PUBLIC_ + "computerplayer_2.png",
        computerPlayer_3 : _PUBLIC_ + "computerplayer_3.png",
        computerPlayer_4 : _PUBLIC_ + "computerplayer_4.png",
        computerPlayer_5 : _PUBLIC_ + "computerplayer_5.png",

        gameBg : _PUBLIC_ + "game.bg.png",
        getTicket : _PUBLIC_ + "get.ticket.jpg",
        handArrow : _PUBLIC_ + "hand.arrow.png",
        hand : _PUBLIC_ + "hand.png",
        layerSuccess : _PUBLIC_ + "layer.success.png",
        level_1 : _PUBLIC_ + "level_1.png",
        level_2 : _PUBLIC_ + "level_2.png",
        level_3 : _PUBLIC_ + "level_3.png",
        level_4 : _PUBLIC_ + "level_4.png",
        level_5 : _PUBLIC_ + "level_5.png",
        level_6 : _PUBLIC_ + "level_6.png",
        menuBg : _PUBLIC_ + "menu.bg.jpg",
        menuBtn : _PUBLIC_ + "menu.btn.arrow.png",
        menuCircle : _PUBLIC_ + "menu.circle.png",
        menuTitle : _PUBLIC_ + "menu.title.png",
        okey : _PUBLIC_ + "okey.png"

    }

    resource.Classification = function(){
        var x;
        var arr = [];
        resource.enemy = [];
        resource.computerPlayer = [];
        resource.allImage = [];

        for(x in resource.src){
            switch(x.split("_")[0]) {
                case "enemy" :
                   resource.enemy.push(resource.src[x]);
                break;
                case "computerPlayer" :
                   resource.computerPlayer.push(resource.src[x]);
                break;
            };
            resource.allImage.push(resource.src[x]);
        };
    };

    resource.Classification();

    return resource;
});