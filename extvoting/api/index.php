<?php
session_cache_limiter(false);
session_start();

date_default_timezone_set('America/Los_Angeles');

require 'lib/Slim/Slim.php';
require 'lib/database.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim(array(
	'debug' => true
));

/*
* HOME page
*/
$app->get('/questions', function() use ($app) { 

	if ($questions = getQuestions()) { 
		echo json_encode($questions);
	} else { 
		echo getJsonError('Could not get questions from database.');
	}

});

$app->get('/answer/:id/:vote', function($id, $vote) use ($app) { 
	if (setVote($id, $vote)) { 
		if ($question = getQuestion($id)) { 
			echo json_encode($question);
		} else { 
			echo getJsonError('Could not retrieve question ' . $id);
		}
	} else { 
		echo getJsonError('Could not send answer for question ' . $id);
	}
});

// RUN THE APP!
$app->run();


function getJsonError($err) { 
	$error = array('error' => $err);
	return json_encode($error);
}