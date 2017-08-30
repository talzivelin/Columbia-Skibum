var Gallery = { 
	apiKey: '57ec96e81db0b6cb1dc11464c681d135',
	apiURL: 'http://api.filemobile.com',
	apiVhost: 1161,
	thumbTranscodeID: 14,
	videFlashTranscodeID: 21,
	vidQuicktimeTranscodeID: 22,
	galleryItems: new Array(),
	currentSlide: 1,
	useYoutube: 0,
    votingEnabled:1,
	preventAutoplay: 1, // set to 1 by default because we want to prevent autoplaying initially loaded video
	init: function(useYoutube, youtubeData) { 
        var self = this;
		if (typeof(useYoutube) == 'undefined') { 
			var useYoutube = 0;
		}
		if (typeof(youtubeData) == 'undefined') { 
			youtubeData = null;
		}
		this.useYoutube = useYoutube;
		this.youtubeData = youtubeData;
        this.getFiles(function(results){
            self.galleryItems = results;
            if (window.video_id) {
    			self.preventAutoplay = 1;
                self.populateVideoArea(window.video_id , 1);
                $('.gallery').removeClass('loading');
            } else {
        		self.populateThumbs();
            }
        },function(error){
            alert("Could not get files:" + error);
        },
		self.useYoutube
        );
	},
	getPlayerEmbedCode: function(id, autoplay) { 
		var autoplayString = "false";
		var autoplayHtmlString = "";
		if (!this.preventAutoplay) { 
			if (typeof(autoplay) != 'undefined') { 
				if (autoplay) { 
					if (this.useYoutube) { 
						autoplayString = '&autoplay=1'
					} else { 
						autoplayString = "true";
						autoplayHtmlString = "autoplay";
					}
					
				}
			}
		}
		
		width = $('.theVideo').width();
		height = $('.theVideo').height();
		

		var code = '';
		if (this.useYoutube) { 
			code = '<iframe id="youtubeIframe" width="585" height="329" src="//www.youtube.com/embed/' + id + '?rel=0&wmode=transparent&enablejsapi' + autoplayString + '" frameborder="0" allowfullscreen></iframe>';
		} else { 
			if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version >= 10) { 
				code = '<video controls="true" ' + autoplayHtmlString + ' width="' + width + '" height="' + height + '" poster="http://storage.filemobile.com/storage/' + id + '/15"><source src="http://storage.filemobile.com/storage/' + id + '/' + this.vidQuicktimeTranscodeID + '" type="video/mp4" /></video>';
			} else { 
				code = '<div id="vp' + id + '" class="fileMobileVideo"></div><script type="text/javascript">swfobject.embedSWF("http://mediafactory.fm/static/videoplayer/player.swf","vp' + id + '","' + width + '","' + height + '","9","expressInstall.swf",{"provider": "video", "skin": "http://mediafactory.fm/static/videoplayer/filemobileSkin.zip", "image":"http://storage.filemobile.com/storage/' + id + '/15", "file":"http://rstorage.filemobile.com/storage/' + id + '/' + this.videFlashTranscodeID + '", "autostart":"' + autoplayString + '" },{"allowfullscreen":"true","allowscriptaccess":"always"});if(navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/)){ document.getElementById("vp' + id + '").innerHTML = \'<video controls="true" ' + autoplayHtmlString + ' width="' + width + '" height="' + height + '" poster="http://storage.filemobile.com/storage/' + id + '/15"><source src="http://storage.filemobile.com/storage/' + id + '/' + this.vidQuicktimeTranscodeID + '" type="video/mp4" /></video>\';}</script>';
			}
			
		}
		
		return $(code);
	},
	clearPlayerContents: function() { 
		$('.player .details').addClass('myHidden');
		//$('.player .theVideo').addClass('myHidden');
		$('.player .theVideo').html('');
		$('.player .details > div').html('');
		$('.player').addClass('loading');
	},
	populateVideoArea: function(id, autoplay) { 
		var self = this;
		this.clearPlayerContents();
        if (parseInt(id)) {
            id = parseInt(id);
        }
        console.log(this.galleryItems);
        
		// video player
		try { // for some reason the player will not initialize the first time, sometimes.
			var playerEmbedCode = this.getPlayerEmbedCode(id, autoplay);
		} catch (e) { 
			var playerEmbedCode = this.getPlayerEmbedCode(id, autoplay);
		}
		playerEmbedCode.appendTo($('.theVideo'));

		var item = _.findWhere(this.galleryItems, { id: id });
		if (this.useYoutube) { 
			this.getYoutubeDataById(id, function(response) { 
                console.log(item);
				$('.player').removeClass('loading');
				$('.player .entrantTitle').html(item.title);
				$('.player .entrantName').html(response.author);
				if (response.location) { 
					$('.player .location').html(response.location);	
				} else { 
					$('.player .location').html('');	
				}
				
				$('.player .description').html(response.description);
				$('.player .description').mCustomScrollbar({ theme: 'light-thin' });
				$('.player .details').removeClass('myHidden');

				if (self.preventAutoplay) { 
					$('#youtubeIframe').click(function() { 
						_gaq.push(['_trackEvent', 'Entry Video', 'Play', item.title]);
					});
				}
			},
			function(err) { 
				alert(err);
			});
		} else { 
			this.getFileById(id, function(response) { 
        		$('.player').removeClass('loading');
        		$('.player .entrantTitle').html(response.title);
        		$('.player .entrantName').html(response.user_firstname + ' ' + response.user_lastname);
        		if (response.user_city) { 
        			$('.player .location').html(response.user_city + ', ' + response.user_country);	
        		} else { 
        			$('.player .location').html('');	
        		}
		
        		$('.player .description').html(response.message);
        		$('.player .description').mCustomScrollbar({ theme: 'light-thin' });
        		$('.player .details').removeClass('myHidden');

                if (self.votingEnabled) {
                    if ($.cookie('video_'+id)) {
        				$('.player .vote').html('Already Voted!  Thanks!');
                    } else {
        				$('.player .vote').html('<a href="#">Vote to send \'em to Whistler!</a>');
                        $('.player .vote a').click(function() { 
                            self.vote(id, function(results){
                                console.log(results);
                                if (results.status) {
                                    $.cookie('video_'+id,  id , { expires: 1 });
                    				$('.player .vote').html('Voted!  Thanks!');
                                    _gaq.push(['_trackEvent', 'Entry Video', 'Vote', item.title]);
                                } else {
                                    alert(results.result);
                                }
                            }, function(err){
                                alert(err);
                            });
                            return false;
    					});
                    }
				}

        		if (self.preventAutoplay) { 
        			$('.fileMobileVideo').click(function() { 
        				_gaq.push(['_trackEvent', 'Entry Video', 'Play', response.title]);
        			});
        		}
			},
			function(err) { 
				alert(err);
			});
		}
		
	},
    vote: function(id, successCallback, errorCallback) {
		var self = this;
		if ($.cookie('video_'+id)) { 
            alert("You've already voted for that video once today!  You can vote for it again tomorrow.  Go check out the other videos.");
		} else { 
			this.sendRequest('media.vote', {'mid': id, 'vote': 1, 'recaptcha': {'challenge':3,'response':3} }, function(results) { 
				successCallback(results);
			}, function(xhr, stringStatus, errorThrown) { 
				errorCallback(stringStatus);
			});
		}
    },
	populateThumbs: function() {
		var self = this;
		// group gallery items
		var galleryItemsArray = new Array();

		var thumbWrapper = null;

		_.each(self.galleryItems, function(item, itemCounter) { 
			var proceed = 1;
			if (($('html').hasClass('ie8') && ((self.galleryItems.length - 1) == itemCounter))) { // account for IE8's off-by-one error when calculating the length of arrays 
				proceed = 0;
			}
			if (proceed) {
			var mod = itemCounter % 6;
			if (mod == 0) { 
				thumbWrapper = $('#thumbnailWrapperTemplate > li').clone().appendTo('#thumbnailWrapper .slides');
			}
			var author = '';
			if (self.useYoutube) {
				author = item.author;
			} else { 
				author = item.user_firstname + ' ' + item.user_lastname;
			}
			var thumbUrl = '';
			if (self.useYoutube) { 
				thumbUrl = item.thumb;
			} else { 
				thumbUrl = item.thumbUrl + '/15';
			}
			var thumbnail = $('<li class="thumb" data-id="' + item.id + '" data-name="' + item.title + '" style="background-image: url(\'' + thumbUrl + '\')"><div class="arrowTop">&nbsp;</div><div class="border">&nbsp;</div><div class="titleWrapper"><p class="author">' + author + '</p><p class="title">' + item.title + '</p></div><div class="arrowBottom">&nbsp;</div></li>');

			thumbnail.click(function(event) {
				var autoplay = 1;
				self.populateVideoArea(item.id, autoplay);
				$('.thumb').removeClass('active');
				$(this).addClass('active');
				if (!self.preventAutoplay) { 
					_gaq.push(['_trackEvent', 'Entry Video', 'Play', item.title]);
				}
				self.preventAutoplay = 0;
			});
			if (mod >= 0 && mod <= 2) { 
				thumbnail.appendTo($('.topThumbs', thumbWrapper));
			}
			if (mod >= 3 && mod <= 5) { 
				thumbnail.appendTo($('.bottomThumbs', thumbWrapper));
			}
			if (itemCounter == 0) { 
				this.preventAutoplay = 1;
				thumbnail.click();
				this.preventAutoplay = 0;
			}
			}
		});

		$('.gallery').removeClass('loading');

		var allowGalleryTouch = false;
		if (self.galleryItems.length > 6) { 
			allowGalleryTouch = true;
		}
		  $('.flexslider').flexslider({
		    animation: "slide",
		    directionNav: false,
		    slideshow: false,
		    controlNav: false,
		    touch: allowGalleryTouch,
		    before: function(slider) { 
		    	self.clearPlayerContents();	
		    	
		    },
		    after: function(slider) { 
		    	$('.flex-active-slide > .topThumbs > .thumb:nth-child(1)').click(); // FIXME this fires four times!
		    }
		  });


	},
	getFiles: function(successCallback, errorCallback, useYoutube) { 
		var self = this;
		if (useYoutube) { 
			successCallback(self.youtubeData);
		} else { 
			this.sendRequest('media.getFiles', {'fields': ['user_firstname', 'user_lastname', 'title'], limit:500}, function(results) { 
				successCallback(results.result.data);
			}, function(xhr, stringStatus, errorThrown) { 
				errorCallback(stringStatus);
			});
		}
		
	},
	getYoutubeDataById: function(id, successCallback, errorCallback) { 
		var self = this;
		var results = null;
		results = _.findWhere(self.youtubeData, { id: id });
		if (results) { 
			successCallback(results);
		} else { 
			errorCallback('Unable to find that Youtube video.');
		}
	},
    getFileById: function(fileID, successCallback, errorCallback) { 
        this.sendRequest('media.getFileInfo', { id: fileID }, function(results) { 
            successCallback(results.result);
        }, function(xhr, stringStatus, errorThrown) { 
            errorCallback(stringStatus);
        });
    },
	sendRequest: function(method, theParams, successCallback, errorCallback) { 
		var self = this;
		var params = theParams;
		params.method = method;
		params.vhost = this.apiVhost;
		params.APIKEY = this.apiKey;
		params.filters = { filetype: 2 };


		$.ajax({
		  type: "GET",
		  url: this.apiURL + '/services/json',
		  data: params,
		  success: successCallback,
		  error: errorCallback,
		  dataType: 'jsonp',
		  jsonp: 'callBack'
		});
	}
}

$(document).ready(function() { 
	var youtubeData = [
		{ 
			id: '9jK4VvXgiJ0',
			thumb: 'img/video_thumbs/01-aubrey.jpg',
			title: 'Ski Bum Intervention 2012',
			author: 'Aubrey Elliott',
			location: 'McKinney, TX',
			description: 'Is it possible to love skiing too much? Before you answer, check out Aubrey&mdash;a diehard ski junkie&mdash;confront his addiction. It\'s not pretty. But it is pretty hilarious.',
		},
		{ 
			id: 'Xh73yioAZZU',
			thumb: 'img/video_thumbs/02-brendand.jpg',
			title: 'SkiBumSchool',
			author: 'Brendan Peterson',
			location: 'La Mesa, CA',
			description: 'It takes more a lot more than skill to win Ski Bum Scholarship. A broken humerus along with a healthy dose of hubris, for example.',
		},
		{ 
			id: 's320R2AWtY4',
			thumb: 'img/video_thumbs/03-james.jpg',
			title: 'Columbia Ski Bum Scholarship Application',
			author: 'James Gardiner',
			location: 'Denver, CO',
			description: 'In a world filled with underwhelming application videos, James stood out a simple idea, great editing and plenty of style.',
		},
		{ 
			id: 'lYllUbKSrR0',
			thumb: 'img/video_thumbs/04-mike-bradley.jpg',
			title: 'Mike Bradley for Columbia Ski Bum',
			author: 'Michael Bradley',
			location: 'New York, NY',
			description: 'There\'s no one more dedicated, passionate and excited about skiing than Mike. If only he could show that same commitment to his day job, he\'d have it made.',
		},
		{ 
			id: '97BDZmy6PxM',
			thumb: 'img/video_thumbs/05-michael-sieman.jpg',
			title: 'Pow Man (Michael S) - Columbia Ski Bum Scholarship',
			author: 'Michael Siemann',
			location: 'College Park, MD',
			description: 'For most of the year, Michael\'s a pretty normal guy. But if there\'s no snow on the ground when winter comes around, well, he\'s going to get angry. And you\'re gonna like him when he gets angry.',
		},
		{ 
			id: 'DPsrkqOyhGA',
			thumb: 'img/video_thumbs/06-Seth.jpg',
			title: 'Seth Yates for THE Columbia Ski Bum',
			author: 'Seth Yates',
			location: 'Seattle, WA',
			description: 'Normally, we\'d advise against webcam selfies. but for Seth, his delivery, and his epic stache, we made an exception.',
		},
	];
	Gallery.init(0);
});