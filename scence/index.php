<?php
  include 'wxauth.php';
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  $baseUrl = $protocol.$_SERVER['HTTP_HOST'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>进取的女神</title>
  <link rel="stylesheet" href="../less/spinners.css"/>
  <link rel="stylesheet" href="../less/main.css" />
  <link rel="stylesheet" href="../less/menu.ball.css" />
  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  <script type="text/javascript">

  var userImg = "<?php echo $_COOKIE['headimgurl']?>";

  var phoneWidth = parseInt(window.screen.width);
  var phoneScale = phoneWidth / 640;
  var ua = navigator.userAgent;
  if (/Android (\d+\.\d+)/.test(ua)) {
      var version = parseFloat(RegExp.$1);
      if (version > 2.3) {
          document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
      } else {
          document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
      }
  } else {
      document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
  }
  </script>
  <?php
    require_once 'js.php';
    $jssdk = new jssdk();
?>
<script type="text/javascript">
    wx.config({
        debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxff2dca758220e172',// 必填，公众号的唯一标识
        timestamp:"<?php echo $jssdk->timestamp;?>",// 必填，生成签名的时间戳
        nonceStr: "<?php echo $jssdk->nonceStr;?>",// 必填，生成签名的随机串
        signature: "<?php echo $jssdk->get_signature();?>",// 必填，签名，见附录1
        jsApiList: [
                    'openLocation',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
           var title = "进取的女神";
           var desc = "进取的女神";
           var link = "<?php echo $baseUrl;?>";
           var imgUrl = "<?php echo $baseUrl;?>/resources/img/200x200.jpg";
           //分享到朋友
           wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //alert("ok");
                },
                cancel: function () {
                    //alert('取消分享朋友')
                }
            });
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
             wx.onMenuShareTimeline({
                title: desc, // 分享标题
                //desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
               trigger: function (res) {
                 //alert('用户点击分享到朋友圈');
               },
               success: function (res) {
               },
               cancel: function (res) {
                 //alert('已取消');
               },
               fail: function (res) {
                 alert(JSON.stringify(res));
               }
             });
           // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
             wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
               trigger: function (res) {
                 //alert('用户点击分享到QQ');
               },
               complete: function (res) {
                 //alert(JSON.stringify(res));
               },
               success: function (res) {
                 //alert('已分享');
               },
               cancel: function (res) {
                 //alert('已取消');
               },
               fail: function (res) {
                 alert(JSON.stringify(res));
               }
             });
           // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
             wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
               trigger: function (res) {
                 //alert('用户点击分享到微博');
               },
               complete: function (res) {
                 //alert(JSON.stringify(res));
               },
               success: function (res) {
                 //alert('已分享');
               },
               cancel: function (res) {
                 //alert('已取消');
               },
               fail: function (res) {
                 alert(JSON.stringify(res));
               }
             });
    });
</script>
</head>
<body>
<div class="loading" style="1display:none">
   <div class="cell">
      <div class="card">
         <span class="timer-loader">Loading&#8230;</span>
      </div>
      <div class="logo-center" style="1display:none;">
          <div class="percent" style="background:none;">
              <div class="hot_line"></div>
              <div class="hot_number">0%</div>
          </div>
      </div>
   </div>
</div>

  <!-- 游戏主场景 -->
  <div id="gameAreaWrapper" style="display:none;">
    <div class="game-time">0秒</div>
    <div class="game-map h">

<!--       <div class="role-emeny type-1 color-1 h"></div>
      <div class="role-emeny type-2 color-2 h"></div>
      <div class="role-emeny type-3 color-3 h"></div>
      <div class="role-emeny type-4 color-4 h"></div>
      <div class="role-emeny type-5 color-5 h"></div>
      <div class="role-emeny type-6 color-6 h"></div>
      <div class="role-emeny type-7 color-7 h"></div>
      <div class="role-emeny type-8 color-8 h"></div>
      <div class="role-emeny type-9 color-9 h"></div>
      <div class="role-emeny type-10 color-10 h"></div>

      <di class="black-hole h"></di> -->

      <!-- <div id="role-player" style="background:url(../resources/img/test.user.head.png) no-repeat center center;background-size:100 100%;"></div> -->
    </div>
  </div>
  <!-- 游戏菜单 -->
  <div id="startMenuWrapper" style="1display:none;">
    <div class="menu-balls">
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <div class="menu-circle">
      <div class="circle-area">
        <img src="../resources/img/test.user.head.png" class="menu-user-head" />
        <img src="../resources/img/menu.circle.png" class="circle-bg" alt="">
      </div>
    </div>
    <div class="menu-main">
      <div><img src="../resources/img/menu.title.png" alt=""></div>
      <a id="play" href="javascript:;">开启艺术之旅</a>
      <p class="menu-aside">体验现代舞女神世界</p>
    </div>
  </div>
  <!-- 游戏规则 -->
  <div class="layer h" id="tips">
    <div class="layer-con">
      <div class="player-hand">
        <div class="bubble">
          <table>
            <tr>
              <td><span class="num">1</span></td>
              <td><span class="words">手指移动“微信头像”，吞噬学习现代舞舞姿剪影增大体积获得更多分数。</span></td>
            </tr>
            <tr>
              <td><span class="num">2</span></td>
              <td><span class="words">吞噬“舞团”图标将获得2秒的移动加速效果</span></td>
            </tr>
            <tr>
              <td><span class="num">3</span></td>
              <td><span class="words">在游戏过程中被“黑洞”吞噬游戏结束。200秒游戏时间过后游戏结束。</span></td>
            </tr>
          </table>
        </div>
        <div id="role-player" style="background:url(../resources/img/test.user.head.png) no-repeat center center;background-size:100 100%;"></div>
        <img src="../resources/img/hand.arrow.png" class="hand-arrow" />
        <div class="btn-group">
          <a href="javascript:;" id="okey-letsgo"><span>我知道了</span></a>
        </div>
      </div>
      <div class="game-rule">
        <p>图标的行进速度与体积成反比（即体积越大，速度越慢）</p>
        <p>-每吞并1个普通图标：体积增大1%</p>
        <p>-每吞并1个电脑玩家图标：体积增大至二者总和</p>
        <p>-吞并特殊图标：玩家图标移动速度加快2秒</p>
      </div>
    </div>
  </div>
  <!-- 游戏完成 -->
  <div class="layer h" id="success">
    <div class="role-emeny type-1 color-5 s"></div>
    <div class="role-emeny type-5 color-3 s"></div>
    <div class="role-emeny type-7 color-2 s"></div>
    <div class="layer-con">
      <div class="role-emeny type-6 color-6 s"></div>
      <h5>恭喜您</h5>
      <h6>在“进取的女神”中夺得称号！</h6>
      <table class="success-main">
        <tr>
          <td>
            <img src="../resources/img/level_1.png" class="badge" />
          </td>
          <td>
            <table class="results">
              <tr>
                <td class="res-tit"><span>游戏时长</span></td>
                <td class="res-code"><span>0秒</span></td>
              </tr>
              <tr>
                <td class="res-tit"><span>进取精神</span></td>
                <td class="res-code"><span>0点</span></td>
              </tr>
              <tr>
                <td class="res-tit"><span>舞蹈技能</span></td>
                <td class="res-code"><span>0点</span></td>
              </tr>
              <tr>
                <td class="res-tit"><span>额外奖励</span></td>
                <td class="res-code"><span>0点</span></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div class="success-btn">
        <div class="btn-group">
          <a href="index.html" id="again">再次挑战</a>
          <a href="javascript:;" id="shareNow">分享至朋友圈</a>
        </div>
        <div class="btn-group">
          <a href="javascript:;" id="get-ticket">获取别克大师系列门票</a>
        </div>
      </div>
    </div>
  </div>
  <!-- 分享朋友圈 -->
  <div class="layer h" id="share">
    <div class="role-emeny type-8 color-7 s"></div>
    <div class="role-emeny type-10 color-9 s"></div>
    <div class="role-emeny type-1 color-2 s"></div>
    <div class="layer-con">
      <div class="tips">
        <table>
          <tr>
            <td>
              <p>点击右上角，分享到朋友圈</p>
              <p>邀请你的好友一起</p>
              <p>体验现代舞女神世界</p>
            </td>
            <td>
              <!-- <img src="../resources/img/hand.png" class="share-hand" alt=""> -->
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <!-- 如何获取门票 -->
  <div class="layer h" id="getTicket">
    <a href="javascript:;" class="back-btn"></a>
  </div>

<script src="../script/library/require.js" defer async="true" data-main="../script/modules/main.js"></script>

</body>
</html>