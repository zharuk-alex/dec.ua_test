<?php
if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['comment'])){

    // Переменные с формы
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];


    // Параметры для подключения
    // $db_host = "";
    // $db_user = ""; // Логин БД
    // $db_password = ""; // Пароль БД
    // $db_table = ""; // Имя Таблицы БД

    // Подключение к базе данных
    // $db = mysql_connect($db_host,$db_user,$db_password) OR DIE("Не могу создать соединение ");

    // Выборка базы
    // mysql_select_db("mydb",$db);

    // $result = mysql_query ("INSERT INTO ".$db_table." (name,phone,email,comment) VALUES ('$name','$phone','$email','$comment')");

    $result = 'true'
    if ($result){
      $data = "is_submit";
    }else{
      $data = "is_unsubmit";
    }
    header('Content-Type: application/json');
    echo json_encode($data);
}
?>
