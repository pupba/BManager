<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type,
     Access-Control-Allow-Headers, Authorization, X-Requested-With");

    //메모리 제한 해제
    ini_set('memory_limit',-1);

    // php 5.2 이하 json_encode 한글 깨짐 고치는 함수
    function han ($s) { return reset(json_decode('{"s":"'.$s.'"}')); }
    function to_han ($str) { return preg_replace('/(\\\u[a-f0-9]+)+/e','han("$0")',$str); }

    // 매니저 정보 불러오기
    function manager($connect){
        $query = "select * from manager_info_management";
        $result = mysqli_query($connect,$query);
        $re = array();
        $i = 0;
        while($row = mysqli_fetch_array($result)){
            $re[$i] = array("no"=>$row['m_no'],"name"=>$row['m_name'],
            "depart"=>$row['m_depart'],"wallet"=>$row['m_wallet_address']);
            $i+=1;
        }
        $jtable = to_han(json_encode($re));
        echo $jtable;
    }

    // 유저 정보 불러오기
    function user($connect){
        $query = "select * from User_info_management";
        $result = mysqli_query($connect,$query);
        $re = array();
        $i = 0;
        while($row = mysqli_fetch_array($result)){
            $re[$i] = array("no"=>$row['u_no'],"name"=>$row['u_name'],
            "depart"=>$row['u_depart'],"wallet"=>$row['u_wallet_address']);
            $i+=1;
        }
        $jtable = to_han(json_encode($re));
        echo $jtable;
    }

    // 이용자 정보 삽입
    function add($connect,$data){
        $query = "insert into ";
        if($data["kind"] === "관리자"){
            $query.="manage_info_management(m_name,m_depart,m_wallet_address) value (";
        }
        else{
            $query.="User_info_management(u_name,u_depart,u_wallet_address) value (";
        }
        $query.="'".$data["name"]."',";
        $query.="'".$data["depart"]."',";
        $query.="'".$data["wallet"]."'";
        $query.=")";
        if(mysqli_query($connect,$query)){
            echo "성공";
        }
        else{
            echo "실패";
        }
    }

    // 이용자 정보 삭제
    function delet($connect,$data){
        $query1 = "delete from manage_info_management where m_wallet_address = '$data'";
        $query2 = "delete from User_info_management where u_wallet_address = '$data'";
        if(mysqli_query($connect,$query1)){
            echo "성공1";
        } 
        else{
            echo "실패1";
        }
        if(mysqli_query($connect,$query2)){
            echo "성공2";
        }
        else{
            echo "실패2";
        }
    }

    // MySQL 연결
    function MySQLConnect(){
        $host = '';
        $user = '';
        $pw = '';
        $db = '';
        $connect = mysqli_connect($host,$user,$pw,$db);
        return $connect;
    }

    // DB 연결 
    $connect = MySQLConnect();
    if (!$connect) {
        die("연결실패...".mysqli_connect_error());
    }

    // POST 값 가져오기
    $data = json_decode(file_get_contents("php://input"),true);

    // 값 처리
    switch($data['kind']){
        case "manager" : manager($connect); break;
        case "user" : user($connect); break;
        case "add" : add($connect,$data["info"]); break;
        case "delete" : delet($connect,$data["wallet"]); break;
    }
?>