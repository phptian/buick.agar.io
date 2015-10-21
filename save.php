<?php
header("Content-type:text/html;charset=utf-8");
require_once 'vendor/db.class.php';
DB::$host = 'localhost';
DB::$user = 'p1882_buick';
DB::$password = '.,123456';
DB::$dbName = 'p1882_buick';
DB::$encoding = 'utf8';
$input = $_POST;

if($input['action'] == 'saveUser'){
    $input['create_at'] = date('Y-m-d H:i:s',time());
    $account = DB::queryFirstRow("SELECT * FROM accounts WHERE openid=%s", $input['openid']);
    if($account){
    }else{
        DB::insert('accounts',$input);
    }
}
