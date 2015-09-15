<?php if( isset($_GET['utm_source']) ) { 
	setcookie('utm_source',$_GET['utm_source'],time()+86400*365,'/');
	setcookie('utm_campaign',$_GET['utm_campaign'],time()+86400*365,'/');
	setcookie('utm_content',$_GET['utm_content'],time()+86400*365,'/');	
}  ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Форма заказа</title>
		<link rel="stylesheet" href="css/css.css"/>
		<meta charset="utf-8">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js" type="text/javascript"></script>
	</head>
<body style="max-width: 960px;">
		<div id="callDIV_1">
			<!-- Форма -->
			<form action="../mail.php" id="callFORM_2" target="_blank" method="post" name="feedback1">
				<input id="callINPUT_3" name="city" type="hidden" value="">
				<input name="price" type="hidden" value="3980">
				<div id="callDIV_4">
					<div id="callDIV_5">
						<input id="callINPUT_6" name="tel" placeholder="Ваш телефон" required="1" type="tel">
					</div>
					<button id="callBUTTON_17" type="submit"></button> <!--button class="btn btn-theme" type="submit">Заказать</button-->
				</div><!-- / Поля формы -->
				
			</form><!-- / Форма -->
		</div>

<script src="/dist/js/jquery.validate.min.js" type="text/javascript"></script>
<!--script src="/dist/js/countdown.min.js" type="text/javascript"></script>
<script src="/dist/js/jquery.fancybox.js" type="text/javascript"></script>
<script src="/dist/js/jquery.cookie.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/dist/js/main.js"></script-->
</body>
</html>