<?php

	$mysqli = new mysqli("127.0.0.1", "root", "root", "wordpress",'8889');
	// include 'dbConnections.php';
	
	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	foreach($_POST as $key => $value){
	
		$mysqli->query("INSERT INTO players (id,user_name,password,tmp) VALUES ('','a','{$key}','{$value}');");


}

	
$success = 'success';
$message = 'return message';
$errors = 'some errors';
$data = array('flash_messages'=> array('a'=>1,'b'=>2));
$response = array();
$response['success'] = $success;
$response['general_message'] = $message;
$response['errors']  = $errors;
$response['data'] = $data;

exit(json_encode($response));

//