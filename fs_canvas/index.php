<?php

	if (!empty($_POST))
	{

		echo " post made". $_POST['name'];

	}
		


?>



<!DOCTYPE html>
<html>
<head>
	<title>full screen canvas</title>
</head>
<body>
	<div id="container" class="container" style="width:100%; height:100%"></div>

	<script src="//localhost:35729/livereload.js"></script>



<!-- 	<script type="text/javascript" data-main="target/config.js" src="target/require.js"></script> -->


<script   src="https://code.jquery.com/jquery-3.1.1.js"   integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="   crossorigin="anonymous"></script>

<script type="text/javascript" data-main="js/config.js" src="js/require.js"></script>


</body>
</html>