/**
 * require js
 */
require.config({
　　paths: {
　　　　"jquery": "../library/jquery.min",
        "transit" : "../library/jquery.transit",
        "gameConfig": "../modules/game.config",
        "resource": "../modules/resource",
        "player": "../modules/player",
        "gameStart": "../modules/gamestart",
        "tools":"../modules/game.tools",
        "wrLoading":"../modules/site.loading"
　　}
});

require(['jquery','resource','wrLoading'],function ($,res,wrLoading){

  function loadCallBack(){
    require(['gameStart'],function(game){
      $("#play").click(function(){
        game.run("gameAreaWrapper");

        $("#startMenuWrapper").fadeOut();
        $("#gameAreaWrapper").fadeIn();
      })
    })
  };

  var loading = new wrLoading('.loading', res.src, loadCallBack);

  $("#shareNow").click(function(){
    $("#share").show();
    return false;
  });
  $("#share").click(function(){
    $(this).fadeOut();
  });
  $("#get-ticket").click(function(){
    $(".layer").hide();
    $("#getTicket").show();
  });
  $(".back-btn").click(function(){
    $(".layer").hide();
    $("#success").show();
  });
});