<?php
date_default_timezone_set('America/Los_Angeles');
$apiVhost= 1161;
$url = 'http://api.filemobile.com/services/json';
$key = '57ec96e81db0b6cb1dc11464c681d135';
$voted = false;
$postvar = hash('md5', 'Ski columbia' . date('dj'));

$domain = '.'.$_SERVER['SERVER_NAME'];

if (!isset($_COOKIE['voted'])) {
	setcookie("voted", 1, time() + (3600 * 24), '/', $domain);
	$_SESSION['voted'] = 1;
}

if (isset($_COOKIE['voted']) && $_COOKIE['voted'] == $postvar) {
	$voted = true;
}


?>