var Gallery = { 
	apiKey: '57ec96e81db0b6cb1dc11464c681d135',
	apiURL: 'http://api.filemobile.com',
	apiVhost: 1161,
	thumbTranscodeID: 14,
	videFlashTranscodeID: 1709,
	vidQuicktimeTranscodeID: 1711,
	officialVideoId:'13147103',
	galleryItems: new Array(),
	currentSlide: 1,
    channel: 24839,
    domain: '',
    votingEnabled:1,
    usePlaceholder: true,
	preventAutoplay: 1, // set to 1 by default because we want to prevent autoplaying initially loaded video
	init: function() { 
        var self = this;
        
        if ($.cookie('voted') && $.cookie('voted') == window.postvar || window.voted) {
            $('.wrapperwatchAndVote .vote').html("Thanks, vote <br>again tomorrow.").addClass('voted');
        }

        this.getFiles(function(results){
            self.originalGalleryItems = shuffle(results);
            
            self.galleryItems = self.originalGalleryItems;
            
            // for testing smaller quantities
            // self.galleryItems = [self.originalGalleryItems[0], self.originalGalleryItems[1], self.originalGalleryItems[2], self.originalGalleryItems[3]];

            if (window.video_id) {
    			self.preventAutoplay = 1;
                self.populateVideoArea(window.video_id , 1);
                $('.gallery').removeClass('loading');
            } else {
        		self.populateThumbs();
            }
        },function(error){
            alert("Could not get files:" + error);
        });
        
	},
    vote: function(id, successCallback, errorCallback) {
		var self = this;

        if ($.cookie('voted') && $.cookie('voted') == window.postvar || window.voted) {
            alert("You've already voted today!  You can vote again tomorrow.");
		} else { 
            var data = {};
            data[window.postvar] = id;
            data['video_id'] = id;
            console.log(data);
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
            
		}
    },
	getVideoLink: function(id) { 
		var autoplayString = "false";
		var autoplayHtmlString = "";
        var self = this;
        // self.getFileById(id,
        //     function(results){
        //         console.log(results);
        //     },function(results){
        //         console.log(results);
        //     });
				
        return 'http://rstorage.filemobile.com/storage/' + id + '/' + this.vidQuicktimeTranscodeID;
		
	},
	populateThumbs: function() {
		var self = this;
        
        if (self.galleryItems.length <= 0) {
            $('.gallery').html('<div class="no-items"><strong>Well, this is awkward.</strong><br />Your search didn\'t return any results. Stay calm. Just double-check<br />you spelled everything correctly and give it another go.</div>');
            $('.player').hide();
            return false;
        } else {
            $('.player').show();
        }

		// group gallery items
		var galleryItemsArray = new Array();
        $('.gallery').empty().append(self.slideTemplate());

		var thumbWrapper, thumbTemplate = null;
		_.each(self.galleryItems, function(item, itemCounter) { 

			var proceed = 1;
			if (proceed) {
                
    			if (itemCounter == 0) { 
    				thumbTemplate = $('.gallery .slides');
    			}

    			var thumbnail = self.thumbHtml(item);
                
                $(thumbnail).click(function(event){
                    // id = $(this).find('.thumb').data('id');
                    
                });
                
    			$(thumbnail).appendTo(thumbTemplate);
                
			}
		});        

		$('.gallery').removeClass('loading');

		var allowGalleryTouch = false;
		if (self.galleryItems.length > 6) { 
			allowGalleryTouch = true;
		}
		$('.flexslider').flexslider({
		    animation: "slide",
		    directionNav: true,
		    slideshow: false,
            video: true,
		    controlNav: false,
            nextText: "NEXT &raquo;",
		    touch: allowGalleryTouch,
            controlsContainer: ".videonav-group",
            start: function(slider){
                // add class to make no more clicks on page-prev
                if (slider.count > 1) {
                    $('.videonav-group').show();
                } else {
                    $('.videonav-group').hide();
                }
                self.setVoteButton();
            },
		    before: function(slider) { 
                
                // add class to make clicks on page-next and page-prev
		    },
		    after: function(slider) { 
                self.setVoteButton();
                if (slider.count > 1) {
                    $('.videonav-group').show();
                } else {
                    $('.videonav-group').hide();
                }
		    },
            end:function(slider){
                // add class to make no more clicks on page-next
            }
		  });
	},
    setVoteButton: function(id){
        var self = this;
        var $voteButton = $('.wrapperwatchAndVote .vote');
        if (!id) {
            id = $('.flex-active-slide').data('id');
        }
        if (id == self.officialVideoId) {
            $voteButton.hide();
        } else {
            $voteButton.show();
        }
        $voteButton.unbind('click').click(function(event){
            event.preventDefault();
            if ($.cookie('voted') && $.cookie('voted') != window.postvar || !window.voted) {
                self.vote(id, 
                function(results){
                    $voteButton.html("Thanks, vote <br>again tomorrow.").addClass('voted');
                    window.voted = true;
                    
                    $.cookie('voted',  window.postvar , { expires: 1 }, self.domain);
                    _gaq.push(['_trackEvent', 'Vote', 'Click', 'Video vote']);
                },
                function(results){
                    alert(results);
                });
            }
        });
    },
	getFiles: function(successCallback, errorCallback) { 
		var self = this;
		this.sendRequest('media.getFiles', {
            'fields': ['user_firstname', 'user_lastname', 'title', 'votecount', 'upload', 'message', 'metadata', 'channel'],
            'limit': 500, 
            'filters': {'channel':self.channel}
         }, function(results) { 
            successCallback(results.result.data);
		}, function(xhr, stringStatus, errorThrown) { 
			errorCallback(stringStatus);
		});
	},
    slideTemplate: function(){
        return '<div class="flexslider"><ul class="slides"></ul></div>';
    },
    thumbHtml: function (item){
        var self = this;
        var thumbUrl = item.thumbUrl + '/1705';
        var videoUrl = self.getVideoLink(item.id);
        console.log(videoUrl);
        var html = '<li class="thumb" data-id="' + item.id + '" data-name="' + item.title + '"><a href="'+videoUrl+'"><img src="' + thumbUrl + '"/></a></li>';
        
        // alert(html);
        
        return $(html);
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
