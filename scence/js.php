<?php
require_once 'cache.php';
class jssdk {
    public $timestamp= '';
    public $nonceStr = 'Wm3WZYTPz0wz562W';
    public $appid = 'wxff2dca758220e172';
    public $appsecret = '4ee97c815833b23d6192ad1490f7af35';
    public function __construct(){
        $this->timestamp = time();
    }
    public function get_signature(){
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        //$url = $this->base_url.uri_string();
        //var_dump($url); //exit;
        $signature_tmp = 'jsapi_ticket='. $this->get_jsapi_ticket() .
        '&noncestr='. $this->nonceStr.
        '&timestamp='. $this->timestamp .
        '&url='.$url;
        //var_dump($this->get_jsapi_ticket());
        //exit;
        //exit;
        //var_dump($this->get_jsapi_ticket());
        return sha1(trim($signature_tmp));
    }

    /**
     * 模拟post 提交
     * @author: curryTian <tw_0304@163.com>
     * @return: 页面数据
     * @param $post_data提交数据,$url 提交url
     * @example e
     *
     *      $post_data['test'] = 'test';
     *      $url = "http://www.coderlife.cn";
     *      mypost($post_data,$url);
     *
     */
    function send_post($post_data,$url){
        // $url  = $url;
        $o = "";
        //var_dump($post_data);
        if(is_array($post_data)){
            foreach ($post_data as $k => $v) {
                $o .= "$k=" . urlencode($v) . "&";
            }
        }else{
            //$o =
            $o = urlencode($post_data);
        }
        $post_data = substr($o, 0, -1);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //为了支持cookie
        curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie.txt');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }

    //获取ToKEN
    public function get_token(){
        $cache=new Cache();
        $token = $cache->load('TOKEN');
        if(empty($token)){
            $result = json_decode($this->send_post('v=v','https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$this->appid.'&secret='.$this->appsecret));
            //S('TOKEN',$result->access_token,7200);
            //$this->cache->save('TOKEN', $result->access_token,7200);
            $cache->save('TOKEN', $result->access_token,7200);
        }
        //var_dump($result);
        //return $result;
        return $cache->load('TOKEN');
    }
    //获取 jsapi_ticket
    public function get_jsapi_ticket(){
        $cache=new Cache();
        $TICKET = $cache->load('TICKET');
        if(empty($TICKET)){
            $result = json_decode($this->send_post('v=v','https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$this->get_token().'&type=jsapi'));
            $cache->save('TICKET', $result->ticket,7200);
        }
        return $cache->load('TICKET');
    }
}
