<?php

session_start();

if (isset($_SESSION['radio_3698130'])) {
	$insideship = $_SESSION["radio_3698130"];
}
else {
	$insideship = 'clicked inside';
}

//echo "<script type='text/javascript'>console.log('$favcolor')</script>";



?>

<!DOCTYPE html>
<html>
<head>
		<title>MF Drone Warfare &#8211; siolsite</title>
	<link rel="stylesheet" type="text/css" href="http://localhost:8887/game/style/style.css">
<!-- 		<link rel="stylesheet" type="text/css" href="http://siolsite.com/style/style.css"> -->
	 <link rel="icon" type="image/png" href="images/favicon.ico">
	 <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

</head>
<body>

	<input type="hidden" id="insideship" value="<?php echo $insideship; ?>">

	<div id="loadingScreen">
		<div id = "lscont">
			<div class="ls" id="numImg" >0</div>
			<div class="ls"> of 8 </div>
			<div class="ls" id='perCom'></div>
		</div>
	</div>
	<div id='errScreen'>
	</div>


	<div id="container" class="container">
		<div id="accelCont">
			<div id="accel"></div>
			<div id="perf"></div>
		</div>
		<div id="tapaccel">
			<div id="addforce"></div>
			<div id="spacertapaccel"></div>
			<div id="minusforce"></div>
		</div>
		<div id='mobcon'></div>
	</div>

 <script src="//localhost:35729/livereload.js"></script>
<!-- <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script> -->


<script type="text/javascript" data-main="js/config.js" src="js/require.js"></script> 



<!-- 
<script type="text/javascript" data-main="http://localhost:8887/game/js_minified/config.js" src="http://localhost:8887/game/js_minified/require.js"></script>  -->

<!-- <script type="text/javascript" data-main="http://siolsite.com/js_minified/configv1.js" src="http://siolsite.com/js_minified/require.js"></script>  -->


</body>
</html>