<?php

function vpost($url,$data=null){ // 模拟提交数据函数
    $curl = curl_init(); // 启动一个CURL会话
    curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); // 对认证证书来源的检查
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE); // 从证书中检查SSL加密算法是否存在
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)'); // 模拟用户使用的浏览器
    // curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
    // curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
    curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
    curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
    curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
    $tmpInfo = curl_exec($curl); // 执行操作
    if (curl_errno($curl)) {
       echo 'Errno'.curl_error($curl);//捕抓异常
    }
    curl_close($curl); // 关闭CURL会话
    return $tmpInfo; // 返回数据
}
function geturl(){
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
   return $url;
}


$appid='wxff2dca758220e172';
$secret="4ee97c815833b23d6192ad1490f7af35";
$url='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$serverurl = 'http://'.$_SERVER['HTTP_HOST'];
$haveAdd = 0;

if(!isset($_COOKIE['openid']) && $_COOKIE['openid']<10){
    if(!isset($_GET['code'])){
        $jumpUrl=urlencode($url);
        $getCodeUrl="https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri={$jumpUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        header('Location:'.$getCodeUrl);
    }else{

        $code=$_GET['code'];
        $getToken="https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$secret}&code={$code}&grant_type=authorization_code";
        $json_token= vpost($getToken);
        $arr_token=json_decode($json_token,true);
        $userinfo= vpost("https://api.weixin.qq.com/sns/userinfo?access_token={$arr_token['access_token']}&openid={$arr_token['openid']}&lang=zh_CN");

        $user= json_decode($userinfo,true);
        $data['action'] = 'saveUser';
        $data['openid'] = $user['openid'];
        $data['nickname'] = $user['nickname'];
        $data['sex'] = $user['sex'];
        $data['province'] = $user['province'];
        $data['city'] = $user['city'];
        $data['country'] = $user['country'];
        $data['headimgurl'] = $user['headimgurl'];
        $data['ip'] = $_SERVER["REMOTE_ADDR"];
        $bj= vpost("{$serverurl}/save.php",$data);

        $ctime=360000;
        setcookie('openid',$user['openid'],time()+$ctime,'/');
        setcookie('nickname',$user['nickname'],time()+$ctime,'/');
        setcookie('sex',$user['sex'],time()+$ctime,'/');
        setcookie('headimgurl',$user['headimgurl'],time()+$ctime,'/');
        setcookie('status',$result['status'],time()+$ctime,'/');
        setcookie('id',$result['id'],time()+$ctime,'/');
        setcookie('addtime',$time,time()+$ctime,'/');

    }
}


    $headimgUrl = $_COOKIE['headimgurl'];//用户头像
?>
