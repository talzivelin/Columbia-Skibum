var Poll = { 
	selector: $('body'),
	questions: new Array(),
	currentQuestionIndex: 0,
	init: function(selector) { 
		var self = this;
		self.selector = selector;
		self.getQuestions();
		self.selector.find('#answer1 span, #answer1 .checkbox').click(function() { 
			if (!self.selector.find('.answers').hasClass('voted')) { 
				self.vote(self.selector.find('.answers').attr('data-question_id'), 1);
			}
			
		});
		self.selector.find('#answer2 span, #answer2 .checkbox').click(function() { 
			if (!self.selector.find('.answers').hasClass('voted')) { 
				self.vote(self.selector.find('.answers').attr('data-question_id'), 2);
			}
		});
		self.selector.find('.nextQuestion').click(function() { 
			var numQuestions = self.questions.length;
			if (numQuestions == self.currentQuestionIndex + 1) { 
				self.showEndOfQuestions();
			} else { 
				self.loadQuestion(self.currentQuestionIndex + 1);
			}
		});

	},
	showEndOfQuestions: function() { 
		var self = this;
		self.selector.find('.noMoreQuestions').show();
		self.selector.find('.question, .answers, .nextQuestion').hide();
	},
	getQuestions: function() { 
		var self = this;
		$.ajax({ 
			url: '/api/questions',
			dataType: 'json',
			success: function(questions) { 
				self.questions = _.shuffle(questions);
				self.selector.find('.loading').hide();
				self.selector.find('.question, .answers').show();
				self.loadQuestion(0);
			},
			error: function(xhr, errString, errThrown) { 
				console.log('47 Poll:' + xhr.error);
			}
		});
	},
	loadQuestion: function(index) { 
		var self = this;
		self.currentQuestionIndex = index;
		var question = self.questions[index];
		var selector = self.selector;
		selector.find('.votes').hide();
		selector.find('.question').html('Q: &nbsp;' + question.text);
		selector.find('#answer1 span').html(question.answer1);
		selector.find('#answer2 span').html(question.answer2);
		selector.find('.answers').attr('data-question_id', question.id);
		self.selector.find('.nextQuestion').hide();
		self.selector.find('.answers').removeClass('voted');
		self.selector.find('.checkbox').removeClass('checked');
	},
	vote: function(question_id, vote) { 
		var self = this;
		self.selector.find('#answer' + vote + ' .checkbox').addClass('checked');
		$.ajax({
			url: '/api/answer/' + question_id + '/' + vote,
			dataType: 'json',
			success: function(question) { 
				self.loadVotes(question.vote_answer1, question.vote_answer2);
				self.selector.find('.nextQuestion').show();
				self.selector.find('.answers').addClass('voted');
				_gaq.push(['_trackEvent', 'Poll', 'Click', 'Poll interaction']);
			},
			error: function(xhr, errString, errThrown) { 
				alert('77 Poll:' + errString);
			}
		});
	},
	loadVotes: function(vote_answer1, vote_answer2) { 
		var self = this;
		var totalVotes = parseInt(vote_answer1) + parseInt(vote_answer2);
		var percent1 = Math.round((vote_answer1 / totalVotes) * 100);
		var percent2 = 100 - percent1;
		self.selector.find('.bar').removeClass('winner');
		self.selector.find('.votes span').removeClass('winner');
		self.selector.find('.answer .votes span').html('');
		self.selector.find('.answer .votes .bar').css({ width: 0 });
		if (percent1 >= 50) { 
			self.selector.find('#answer1 .votes .bar').addClass('winner');
			self.selector.find('#answer1 .votes span').addClass('winner');
		}
		self.selector.find('#answer1 .votes .bar').animate({ width: percent1 + '%' }, 500, function() { 
			self.selector.find('#answer1 .votes span').html(percent1 + '%');
		});
		
		if (percent2 >= 50) { 
			self.selector.find('#answer2 .votes .bar').addClass('winner');
			self.selector.find('#answer2 .votes span').addClass('winner');
		}
		self.selector.find('#answer2 .votes .bar').animate({ width: percent2 + '%' }, 500, function() { 
			self.selector.find('#answer2 .votes span').html(percent2 + '%');
		});
		
		
		self.selector.find('.votes').show();
	}
}

$(document).ready(function() { 
	var skiBumPoll = Poll.init($('#poll'));
});