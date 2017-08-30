<?php

include_once('vendor/idiorm.php');

if (($_SERVER['HTTP_HOST'] == 'skibumscholarship.com') || ($_SERVER['HTTP_HOST'] == 'www.skibumscholarship.com') ) {
	ORM::configure('mysql:host=localhost;dbname=site01_skibum');
	ORM::configure('username', 'site01_skibum');
	ORM::configure('password', 'HXlLxz3P');
	ORM::configure('logging', true);
} else {
	ORM::configure('mysql:host=localhost;dbname=skibum;port=8889');
	ORM::configure('username', 'skibum');
	ORM::configure('password', 'ezUU2pbHDyQSfPte');
	ORM::configure('logging', true);
}

/* getQuestions - retrieves all question models from the database as an array
 * @return array of questions or 0 if error or none found 
 */
function getQuestions() { 
	try {
		$questions = ORM::for_table('questions')->find_many();
		if (!count($questions)) { 
			return 0;
		}
		$theQuestions = array();
		foreach ($questions as $question) { 
			$theQuestion = array();
			$theQuestion['id'] = $question->id;
			$theQuestion['text'] = $question->text;
			$theQuestion['answer1'] = $question->answer1;
			$theQuestion['answer2'] = $question->answer2;
			$theQuestions[] = $theQuestion;
		}
		return $theQuestions;
	} catch (Exception $e) { 
		return 0;
	}
}

/* getQuestion - retrieves a question model by primary key 
 * @param int $id - the primary key of the question
 * @return array of questions or 0 if not found 
 */
function getQuestion($id) { 
	try {
		$question = ORM::for_table('questions')->where('id', $id)->find_one();
		if (!$question) { 
			return 0;
		} else {
			$theQuestion = array();
			$theQuestion['id'] = $question->id;
			$theQuestion['text'] = $question->text;
			$theQuestion['answer1'] = $question->answer1;
			$theQuestion['answer2'] = $question->answer2;
			$theQuestion['vote_answer1'] = $question->vote_answer1;
			$theQuestion['vote_answer2'] = $question->vote_answer2;
			return $theQuestion;
		}
	} catch (Exception $e) { 
		return 0;
	}
}

/* setVote - increments the integer for vote_answer1 or vote_answer2 of a question, retrieved by primary key
 * @param int $id - the primary key of a question
 * @param int $vote - must be 1 or 2 if they are voting for answer 1 or answer 2, respecitvely
 * @return question as an array, retrieve by $id
 */
function setVote($id, $vote) { 
	try { 
		if (($vote != 1) && ($vote != 2)) { 
			error_log('vote must be 1 or 2');
			return 0;
		} else { 
			$question = ORM::for_table('questions')->where('id', $id)->find_one();
			if ($vote == 1) { 
				$question->vote_answer1 += 1;
			} else { 
				$question->vote_answer2 += 1;
			}
			$question->save();
			return 1;
		}
	} catch (Exception $e) { 
		error_log($e->getMessage());
		return 0;
	}
}