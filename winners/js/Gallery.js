var Gallery = { 
	apiKey: '57ec96e81db0b6cb1dc11464c681d135',
	apiURL: 'http://api.filemobile.com',
	apiVhost: 1161,
	thumbTranscodeID: 14,
	videFlashTranscodeID: 1709,
	vidQuicktimeTranscodeID: 1711,
	galleryItems: new Array(),
	rankedItems: new Array(),
	currentSlide: 1,
	useYoutube: 0,
	officialVideoId:13147103,
    votingEnabled:1,
	rankingEnabled: true,
	showVoteCounts:0,
    domain: '.skibumscholarship.com',
    usePlaceholder: true,
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
            // console.log(results.length);
			self.originalGalleryItems = shuffle(self.addRank(results));
            self.galleryItems = self.originalGalleryItems;
            
            if (window.video_id) {
    			self.preventAutoplay = 1;
                self.populateVideoArea(window.video_id , 1);
                $('.gallery').removeClass('loading');
            } else {
                self.usePlaceholder = true;
        		self.populateThumbs();
            }
    		$('.player .scrollingWrapper').mCustomScrollbar({ theme: 'light-thin', updateOnContentResize: true });
        },function(error){
            alert("Could not get files:" + error);
        },
		self.useYoutube
    );
        
        $('.sort-group .latest').click(function(){
            $('.sort-group .sort').removeClass('active');
            self.usePlaceholder = true;
            $(this).addClass('active');

            self.galleryItems = _.sortBy(self.galleryItems, function(obj){
                var date = to_date(obj.upload);  // 2013-09-17 11:03:27
                return -date.getTime();
            });

    		self.populateThumbs();
            
        });
        
        $('.sort-group .greatest').click(function(){
            $('.sort-group .sort').removeClass('active');
            self.usePlaceholder = true;
            
            $(this).addClass('active');

    		self.populateThumbs(self.rankedItems);
        });
        
        $('.sort-group .randoms').click(function(){
            $('.sort-group .sort').removeClass('active');
            self.usePlaceholder = true;
            $(this).addClass('active');
                        
            var searchstring = $('.video-search').val();
            if (searchstring != '') {
            	self.galleryItems = shuffle(self.galleryItems);
            } else {
            	self.galleryItems = self.originalGalleryItems;
            }
            self.populateThumbs();
        }).addClass('active');
        
        $('.clearsearch').click(function(event){
            $('.video-search').val('');
            $('#videosearch').submit();
        });
        
        $('#videosearch').submit(function(event){
            event.preventDefault();
            self.usePlaceholder = false;
            self.galleryItems = self.originalGalleryItems;
            self.rankedItems = self.originalRankedItems;
            
            $('.sort-group .sort').removeClass('active');
            $(this).addClass('active');
            var searchstring = $('.video-search').val();
            if (searchstring == '') {
                self.usePlaceholder = true;
                $('.clearsearch').hide();
            } else {
                $('.clearsearch').show();
                
                self.galleryItems = _.filter( self.galleryItems, function(obj){
                    // console.log(obj);
                    var first_name = obj.user_firstname.toLowerCase().search(searchstring.toLowerCase());
                    var last_name = obj.user_lastname.toLowerCase().search(searchstring.toLowerCase());
                    if (first_name >= 0 || last_name >= 0) {
                        return 1;
                    }
                    // check for location then search by
                    if (typeof obj.metadataArray 
                        && obj.metadataArray 
                        && typeof obj.metadataArray.user == "object"
                        && typeof obj.metadataArray.user.location == "string") {
                        var location = obj.metadataArray.user.location.toLowerCase().search(searchstring.toLowerCase());
                        if (location >= 0) {
                            return 1;
                        }
                    }
                
                    var title = obj.title.toLowerCase().search(searchstring.toLowerCase());
                    if (title >= 0) {
                        return 2;
                    }
                });
				
                self.rankedItems = _.filter( self.rankedItems, function(obj){
                    // console.log(obj);
                    var first_name = obj.user_firstname.toLowerCase().search(searchstring.toLowerCase());
                    var last_name = obj.user_lastname.toLowerCase().search(searchstring.toLowerCase());
                    if (first_name >= 0 || last_name >= 0) {
                        return 1;
                    }
                    // check for location then search by
                    if (typeof obj.metadataArray 
                        && obj.metadataArray 
                        && typeof obj.metadataArray.user == "object"
                        && typeof obj.metadataArray.user.location == "string") {
                        var location = obj.metadataArray.user.location.toLowerCase().search(searchstring.toLowerCase());
                        if (location >= 0) {
                            return 1;
                        }
                    }
                
                    var title = obj.title.toLowerCase().search(searchstring.toLowerCase());
                    if (title >= 0) {
                        return 2;
                    }
                });
            }
            self.populateThumbs();
        });
                
	},
	addRank: function(results) {
		// adds rank info to the complete array for each item
		var self = this;

		var rank_temp =_.sortBy(results, function(obj){
	        var vote = parseInt(obj.votecount, 10);
	        return -vote;
	    }); 
		
		// remove the official video
		var official = _.findWhere(results, {id: self.officialVideoId });
        if (official) {
    		rank_temp = _.reject(rank_temp, function(obj){ return obj.id == self.officialVideoId; });
        }
	
		$.each(rank_temp, function(index, obj) {
			rank_temp[index].ranking = index + 1;
		});
        
		self.originalRankedItems = _.clone(rank_temp);
		self.rankedItems = self.originalRankedItems;
        
        if (official) {
    		rank_temp.push(official);
        }

		return rank_temp;
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
			if ((BrowserDetect.browser == 'Explorer' && BrowserDetect.version >= 10) || ($('html').hasClass('touch'))) { 
				code = '<video controls="true" ' + autoplayHtmlString + ' width="' + width + '" height="' + height + '" poster="http://storage.filemobile.com/storage/' + id + '/1705"><source src="http://storage.filemobile.com/storage/' + id + '/' + this.vidQuicktimeTranscodeID + '" type="video/mp4" /></video>';
			} else { 
				var flashvars = {
					provider: "video", 
					skin: 'http://mediafactory.fm/static/videoplayer/filemobileSkin.zip', 
					image:'http://storage.filemobile.com/storage/' + id + '/1705', 
					file:'http://rstorage.filemobile.com/storage/' + id + '/' + this.videFlashTranscodeID, 
					autostart:autoplayString
				};
				var params = {
					wmode:"transparent",
					allowfullscreen:"true",
					allowscriptaccess:"always"
				}; 
				var attributes = {},
				script = '';
				
				if (navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/)) {
					script = 'document.getElementById("vp' + id + '").innerHTML = \'<video controls="true" ' + autoplayHtmlString + ' width="' + width + '" height="' + height + '" poster="http://storage.filemobile.com/storage/' + id + '/1705"><source src="http://storage.filemobile.com/storage/' + id + '/' + this.vidQuicktimeTranscodeID + '" type="video/mp4" /></video>\';};'
				} else {
					script = 'swfobject.embedSWF("http://mediafactory.fm/static/videoplayer/player.swf?wmode=transparent","vp' + id + '","' + width + '","' + height + '","9","expressInstall.swf", '+ JSON.stringify(flashvars) +','+JSON.stringify(params)+','+JSON.stringify(attributes)+');';
				}
				code = '<div id="vp' + id + '" class="fileMobileVideo">Sorry, can\'t play vids without flash.</div>';
				code += '<script type="text/javascript">'+ script + '</script>';
			}
		}
		
		return $(code);
	},
	clearPlayerContents: function() { 
		$('.player .details').addClass('myHidden');
		$('.player .theVideo').html('');
		//$('.player .details .scrollingWrapper > div, .player .rank, .player .vote').html('');
		$('.player').addClass('loading');
	},
	populateVideoArea: function(id, autoplay) { 
		var self = this;
		this.clearPlayerContents();
        if (parseInt(id)) {
            id = parseInt(id);
        }
        
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
				$('.player').removeClass('loading');
				$('.player .entrantTitle').html(item.title);
				$('.player .entrantName').html(response.author);
				if (response.location) { 
					$('.player .location').html(response.location);	
				} else { 
					$('.player .location').html('');	
				}
				
				$('.player .description').html(response.description);
				$('.player .details').removeClass('myHidden');
        		$('.player .scrollingWrapper').mCustomScrollbar("update");
			},
			function(err) { 
				alert('Gallery 194:' +err);
			});
		} else { 
			this.getFileById(id, function(response) { 
        		$('.player').removeClass('loading');
        		$('.player .entrantTitle').html(response.title);
        		$('.player .entrantName').html(response.user_firstname + ' ' + response.user_lastname);
        		if (response.metadata.location) { 
        			$('.player .location').html(response.metadata.location);	
        		} else { 
        			$('.player .location').html('');	
        		}
		
        		$('.player .description').html(response.message);
        		$('.player .details').removeClass('myHidden');

        		// update share URLs
        		$('.player #playerFacebookShare').attr('href', 'http://www.facebook.com/share.php?u=http%3A%2F%2Fskibumscholarship.com/video/' + id);
        		$('.player #playerTwitterShare').attr('href', 'http://twitter.com/home?status=This%20Ski%20Bum%20video%20is%20doing%20it%20right.%20Vote%20for%20it%20at%20skibumscholarship.com%20%23skibum13%20http%3A%2F%2Fskibumscholarship.com%2Fvideo%2F' + id);
        		
                
                $('.player .scrollingWrapper').mCustomScrollbar("update");
				
                $('.player .vote').empty();
				
				var alreadyVoted = false;
				if ($.cookie('voted') && $.cookie('voted') == window.postvar || window.voted) {
					alreadyVoted = true;
				}
				
				if (id == self.officialVideoId) {
					 var showVoteCounts = 0;
					 var votingEnabled = 0;
				} else {
					var showVoteCounts = self.showVoteCounts;
					var votingEnabled = self.votingEnabled;
				}
				
				if (showVoteCounts) {
	                var votetext = (item.votecount == 1)? item.votecount+ ' Vote': item.votecount+ ' Votes';
	                $('.player .vote').prepend( '<span class="votecount">'+ votetext + '</span>');
				}
				
				if (self.rankingEnabled && item.ranking) {
	                var votetext = 'Currently ranked: #' + item.ranking;
	                $('.player .vote').prepend( '<span class="votecount">'+ votetext + '</span>');
				}
				
				if (alreadyVoted || !votingEnabled) {
					var singleHtml = '<span class="voted"><a href="/">Head over to the full site<br/> to watch more videos &raquo;</a></span>';
					$('.wrapperSinglevideo .player .vote').html(singleHtml);
				}
				
                if (votingEnabled) {
                    if (alreadyVoted) {
                                 
                        // is it the single page?
						if (id != self.officialVideoId) {
							var singleHtml = 'You&rsquo;ve cast your vote for today. But the fun&rsquo;s just heating up.';
	        				$('.wrapperSinglevideo .player .voted').prepend(singleHtml);
						}

                        // no it's the gallery
                        $('.wrapperGallery .player .vote').append('<span class="just-voted">Thanks, vote again tomorrow.</span>');
                        
                    } else {
        				$('.player .vote').append('<a href="#"><img src="/img/section4/thumbs-up.png">Vote to send \'em to Whistler!</a>');
                        $('.player .vote a').click(function() { 
                            self.vote(id, function(results){
                                // console.log(results);
                                if (results.status) {
                                    var item = results.result;
                                    $.cookie('voted',  window.postvar , { expires: 1 }, self.domain);
                                    window.voted = true;
                    				$('.player .vote').html('<span class="just-voted">Thanks, vote again tomorrow.</span>');
									
									if (showVoteCounts) {
	                                    var votetext = (item.votecount == 1)? item.votecount+ ' Vote': item.votecount+ ' Votes';
	                                    $('.player .vote ').prepend( '<span class="votecount">'+ votetext + '</span>');
									}
                                    _gaq.push(['_trackEvent', 'Vote', 'Click', 'Video vote']);
                                } else {
                                    alert('244 Gallery:' + results.result);
                                }
                            }, function(err){
                                alert(err);
                            });
                            return false;
    					});
                    }
				}
			},
			function(err) { 
				alert('261 Gallery:' + err);
			});
		}
		
	},
    vote: function(id, successCallback, errorCallback) {
		var self = this;
        if ($.cookie('voted') && $.cookie('voted') == window.postvar || window.voted) {
            alert("You've already voted today!  You can vote again tomorrow.");
		} else { 
            var data = {};
            data[window.postvar] = id;
            data['video_id'] = id;
            // console.log(data);
            $.ajax({
                url: '/vote.php',
                type: 'POST',
                dataType: 'json',
                data: data,
                complete: function(xhr, textStatus) {
                  //called when complete
                },
                success: function(data, textStatus, xhr) {
                    successCallback(data);
                  //called when successful
                },
                error: function(xhr, textStatus, errorThrown) {
                    // console.log(xhr.responseJSON);
                    errorCallback(xhr.responseJSON.message);
                  //called when there is an error
                }
            });
            
            
            // this.sendRequest('media.vote', {'mid': id, 'vote': 1, 'recaptcha': {'challenge':3,'response':3} }, function(results) { 
            //     successCallback(results);
            // }, function(xhr, stringStatus, errorThrown) { 
            //     errorCallback(stringStatus);
            // });
		}
    },
    // getRank: function(id){
    //     var self = this;
    //     gallery = _.sortBy(self.galleryItems, function(obj, key){
    //         var vote = parseInt(obj.votecount, 10);
    //         return -vote;
    //     });
    //     gallery = _.each(gallery, function(obj, key){
    //         gallery[key].rank = key;
    //     });
    //     
    //     console.log(gallery);
    //     
    //     return false;  
    // },
	populateThumbs: function(items) {
		var self = this;
        if (!items) {
        	items = self.galleryItems; 
        }
        if (items.length <= 0) {
            $('#thumbnailWrapper').html('<div class="no-items"><strong>Well, this is awkward.</strong><br />Your search didn\'t return any results. Stay calm. Just double-check<br />you spelled everything correctly and give it another go.</div>');
            $('.player').hide();
            return false;
        } else {
            $('.player').show();
        }

        
		// group gallery items
		var galleryItemsArray = new Array();
        $('#thumbnailWrapper').empty().append(self.slideTemplate());

		var thumbWrapper, thumbTemplate = null;
		_.each(items, function(item, itemCounter) { 

			var proceed = 1;
			if (($('html').hasClass('ie8') && ((items.length - 1) == itemCounter))) { // account for IE8's off-by-one error when calculating the length of arrays 
                // proceed = 0;
                // that seemed to break it in ie, so i took it out.  :/
			}
			if (proceed) {
    			var mod = itemCounter % 6;
    			if (mod == 0) { 
                    thumbTemplate = self.thumbTemplate();
    				thumbWrapper = $('#thumbnailWrapper .slides').append(thumbTemplate);
    			}

    			var thumbnail = self.thumbHtml(item);

    			$(thumbnail).click(function(event) {
    				var autoplay = 1;
    				self.populateVideoArea(item.id, autoplay);
    				$('.thumb').removeClass('active');
    				$(this).addClass('active');
    			});
    			if (mod >= 0 && mod <= 2) { 
    				$(thumbnail).appendTo($('.topThumbs', thumbTemplate));
    			}
    			if (mod >= 3 && mod <= 5) { 
    				$(thumbnail).appendTo($('.bottomThumbs', thumbTemplate));
    			}
    			if (itemCounter == 0) { 
    				this.preventAutoplay = 1;
        			$(thumbnail).click();
    				this.preventAutoplay = 0;
    			}
			}
		});
        
        if (self.usePlaceholder && items.length < 6) {
            
            for (var i = 6 - 1; i >= items.length; i--) {
                var placeholder = '<li class="placeholder"><div class="arrowTop">&nbsp;</div><div class="border">&nbsp;</div><img src="/img/section4/your-image-here.png"></li>';
    			if (i >= 0 && i <= 2) { 
    				$(placeholder).appendTo($('.topThumbs'));
    			}
    			if (i >= 3 && i <= 5) { 
    				$(placeholder).appendTo($('.bottomThumbs'));
    			}
            }
            $('.placeholder').click(function(){
                popitup('/uploader.html');
            });
        }
        

		$('.gallery').removeClass('loading');

		var allowGalleryTouch = false;
		if (items.length > 6) { 
			allowGalleryTouch = true;
		}
		  $('.flexslider').flexslider({
		    animation: "slide",
		    directionNav: true,
		    slideshow: false,
            video: true,
		    controlNav: false,
		    touch: allowGalleryTouch,
            controlsContainer: ".videonav-group",
            start: function(slider){
                // add class to make no more clicks on page-prev
                if (slider.count > 1) {
                    $('.videonav-group').show();
                    $('.page-count').text(slider.count);
                    $('.page-current').text(slider.currentSlide + 1);
                } else {
                    $('.videonav-group').hide();
                }
            },
		    before: function(slider) { 
                // add class to make clicks on page-next and page-prev
		    	self.clearPlayerContents();	
                self.preventAutoplay = 1;
		    },
		    after: function(slider) { 
                if (slider.count > 1) {
                    $('.videonav-group').show();
                    $('.page-count').text(slider.count);
                    $('.page-current').text(slider.currentSlide + 1);
                } else {
                    $('.videonav-group').hide();
                }
		    	$('.flex-active-slide > .topThumbs > .thumb:nth-child(1)').click(); // FIXME this fires four times!
		    },
            end:function(slider){
                // add class to make no more clicks on page-next
            }
		  });


	},
	getFiles: function(successCallback, errorCallback, useYoutube) { 
		var self = this;
		if (useYoutube) { 
			successCallback(self.youtubeData);
		} else { 
			this.sendRequest('media.getFiles', {'fields': ['user_firstname', 'user_lastname', 'title', 'votecount', 'upload', 'message', 'metadata'], limit: 500}, function(results) { 
                successCallback(results.result.data);
			}, function(xhr, stringStatus, errorThrown) { 
				errorCallback(stringStatus);
			});
		}
	},
    slideTemplate: function(){
        return '<div class="flexslider"><ul class="slides"></ul></div>';
    },
    thumbTemplate: function(){
        var html =  '<li>'+
        '<ul class="thumbs topThumbs clearfix"></ul>'+
        '<ul class="thumbs bottomThumbs clearfix"></ul>'+
        '</li>';
        return $(html);
    },
    thumbHtml: function (item){
        var self = this;
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
			thumbUrl = item.thumbUrl + '/1705';
		}
        
        var html = '<li class="thumb" data-id="' + item.id + '" data-name="' + item.title + '" style="background-image: url(\'' + thumbUrl + '\')">' +
        '<div class="arrowTop">&nbsp;</div><div class="border">&nbsp;</div>' +
        '<div class="titleWrapper"><p class="author">' + author + '</p>' +
        '<p class="title">' + item.title + '</p>' +
        '</div><div class="arrowBottom">&nbsp;</div></li>';
        
        return $(html);
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
			description: 'Is it possible to love skiing too much? Before you answer, check out Aubrey&mdash;a diehard ski junkie&mdash;confront his addiction. It\'s not pretty. But it is pretty hilarious.'
		},
		{ 
			id: 'Xh73yioAZZU',
			thumb: 'img/video_thumbs/02-brendand.jpg',
			title: 'SkiBumSchool',
			author: 'Brendan Peterson',
			location: 'La Mesa, CA',
			description: 'It takes more a lot more than skill to win Ski Bum Scholarship. A broken humerus along with a healthy dose of hubris, for example.'
		},
		{ 
			id: 's320R2AWtY4',
			thumb: 'img/video_thumbs/03-james.jpg',
			title: 'Columbia Ski Bum Scholarship Application',
			author: 'James Gardiner',
			location: 'Denver, CO',
			description: 'In a world filled with underwhelming application videos, James stood out a simple idea, great editing and plenty of style.'
		},
		{ 
			id: 'lYllUbKSrR0',
			thumb: 'img/video_thumbs/04-mike-bradley.jpg',
			title: 'Mike Bradley for Columbia Ski Bum',
			author: 'Michael Bradley',
			location: 'New York, NY',
			description: 'There\'s no one more dedicated, passionate and excited about skiing than Mike. If only he could show that same commitment to his day job, he\'d have it made.'
		},
		{ 
			id: '97BDZmy6PxM',
			thumb: 'img/video_thumbs/05-michael-sieman.jpg',
			title: 'Pow Man (Michael S) - Columbia Ski Bum Scholarship',
			author: 'Michael Siemann',
			location: 'College Park, MD',
			description: 'For most of the year, Michael\'s a pretty normal guy. But if there\'s no snow on the ground when winter comes around, well, he\'s going to get angry. And you\'re gonna like him when he gets angry.'
		},
		{ 
			id: 'DPsrkqOyhGA',
			thumb: 'img/video_thumbs/06-Seth.jpg',
			title: 'Seth Yates for THE Columbia Ski Bum',
			author: 'Seth Yates',
			location: 'Seattle, WA',
			description: 'Normally, we\'d advise against webcam selfies. but for Seth, his delivery, and his epic stache, we made an exception.'
		},
	];
	Gallery.init(0);
});


function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
    return sourceArray;
}

function to_date(o) {
    var date = o.split(' '); // 2013-09-17 11:03:27  new Date(year, month, day, hours, minutes, seconds, milliseconds);
    var day = date[0].split('-'); // 2013-09-17 11:03:27  new Date(year, month, day, hours, minutes, seconds, milliseconds);
    var time = date[1].split(':');
    o = new Date(day[0], day[1], day[2], time[0], time[1], time[2]);
    return o;
}
function desc_start_time(o) {
    return -o.startDate.getTime();
}
