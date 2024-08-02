<?php
    $name = $_POST["name"];
    $email1  = $_POST["email1"];
    $email2  = $_POST["email2"];
    $pass = $_POST["pass"];

    $email = $email1."@".$email2;
    $regist_day = date("Y-m-d (H:i)");  // 현재의 '년-월-일-시-분'을 저장
              
    $con = mysqli_connect("localhost", "root", "", "taskblog");

	$sql = "insert into users(name, email, password, regist_day) ";
	$sql .= "values('$name', '$email', '$pass' ,'$regist_day')";

	mysqli_query($con, $sql);  // $sql 에 저장된 명령 실행
    mysqli_close($con);     

    echo "
	      <script>
	          location.href = 'login.html';
	      </script>
	  ";
?>

   
