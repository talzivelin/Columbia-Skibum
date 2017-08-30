<?php

/*

$_POST[hash('md5', 'Ski columbia' . date('d'))] 
$_POST[video_id]

*/

require_once('includes/config-video.php');

$error = array();

// initially, we set voted cookie to 1. we require that cookie to make the vote - testing for cookie. we change it to the video id when they vote
if (!isset($_COOKIE['voted'])) {
	if (setcookie("voted", 1, time()+(3600 * 24), '/', $domain)) {
		// we were able to start a session, so it isn't because of technical whatevers
		$error[] = 'Someone is trying to vote without a cookie initialized, possibly deleted their cookies: ' . $_SERVER['REMOTE_ADDR'];
	} else {
		$error[] = 'Cookies have been disabled: ' . $_SERVER['REMOTE_ADDR'];
	}
}

// we require a hash using the current date to be posted to verify - simple but gives us a flag for which day it is, so we can mark a new date by calendar date instead of 24 hrs.
if (isset($_POST['video_id']) && !isset($_POST[$postvar])) {
	$error[] = 'Someone is trying to game the system by posting the decoy param video_id without the hashed param of the day: ' . $_SERVER['REMOTE_ADDR'];
}

// they already have the date hash cookie, possibly selectively deleted the "voted" cookie.
if (isset($_COOKIE[$postvar])) {
	$error[] = 'Someone is trying to vote more than once today: ' . $_SERVER['REMOTE_ADDR'];
}

if (count($error)) {
	// var_dump($error);
	error_log(json_encode($error));
	header('HTTP/1.1 412 Preconditions or authorizations failed');
	$response = json_encode(array('status'=>'error','message'=>'There\'s been an error.  Please try voting tomorrow or contact an admin.'));
	echo $response;
	die();
}

$video_id = (isset($_POST[$postvar])) ? $_POST[$postvar] : null ;
// $video_id = 13147103;

if (isset($video_id)) {
	$request = "$url?mid=$video_id&method=media.vote&vote=1&vhost=$apiVhost&APIKEY=$key&filters%5Bfiletype%5D=2&_=1381810256988";
	$json_data = file_get_contents($request);
	$data = json_decode($json_data);

	if (isset($data) && $data->status) {
		error_log('Successful Vote for '.$video_id.' : ' . $_SERVER['REMOTE_ADDR'] . ' on ' . date('F j, Y, g:i a'));
		
		// set our cookie for our day of the month
		setcookie($postvar, $postvar, time()+(3600 * 24), '/', $domain);
		setcookie("voted", false, -1, '/', $domain);
		// now we set the voted id to current vote - this signals the javascript that a vote has taken place (cookie 'voted' !== 1)
		setcookie("voted", $postvar, time() + (3600 * 24), '/', $domain);
	}
	echo $json_data;
	die();
}

// $video = $data->result;
// 			this.sendRequest('media.vote', {'mid': id, 'vote': 1, 'recaptcha': {'challenge':3,'response':3} }, function(results) { 



?>