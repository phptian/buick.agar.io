/**
 * 游戏配置
 */
define(["resource"],function(res){
    var gameConfig = {};

    gameConfig = {

        // 时间设置
        gameTime : 100, //游戏时间120秒
        timeScore : 1, //时间奖励1秒1分

        // 地图设置
        mapSize : 4, //地图尺寸为15倍视窗

        // 主角设置
        userPlayerSize : 108, //初始主角小球大小
        userPlayerHeader : res.src.playerHead, //设置主角头像,如有修改请前往resource.js
        userPlayerSpeed : 20,  //初始主角速度

        // AI设置
        aiAmount : 10,  //初始AI数量
        aiNutrition : 0.04,  //吃了之后体积增加10%
        aiScore : 30, //吃AI分数

        // 食物设置
        foodAmount : 100, //初始食物数量
        foodSize : 50,   //初始食物大小
        addfood : 3,    //每1秒增加食物数量
        foodNutrition : 0.004,  //吃了之后体积增加2%
        foodScore : 10,  //吃食物后分数

        // 黑洞设置
        blackholdSize : 300, // 黑洞大小
        BlackholdTimpClip : 5, // 每30秒生成一个黑洞

        // 奖励等级设置
        level_1 : 100,  //不超过100分 初学者
        level_2 : 200,  //不超过200分 中级舞者
        level_3 : 300,  //不超过300分 高级舞者
        level_4 : 400,  //不超过400分 舞团成员
        level_5 : 500,  //不超过500分 舞团领舞
        level_6 : 600,  //不超过600分 舞团艺术总监
    };

    return gameConfig;
});