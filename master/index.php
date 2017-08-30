<?php include('includes/header.php'); ?>    			
<!-- VIDEO -->
<div class="sectionWrapper wrapperVideo">
    <section class="video">
        <img class="videoClose" src="/img/close.png" alt="close" />
        <div class="heroVideo"></div>
    </section>
</div>

<!-- HERO -->
<div class="sectionWrapper wrapperHero">
    <a name="the-scholarship" class="checkpoint-top"></a>


    <section class="hero scrollblock">
        

        <div id="soc-panel">
            <h6>Share On:</h6>

            <ul>
                <li id="fb-share"><a href="http://www.facebook.com/share.php?u=http%3A%2F%2Fskibumscholarship.com" target="share" onclick="_gaq.push(['_trackEvent', 'Social', 'Share Contest', 'Facebook']);">Share on Facebook</a></li>
                
                <li id="tw-share"><a href="http://clicktotweet.com/ha0ja" target="share" onclick="_gaq.push(['_trackEvent', 'Social', 'Share Contest', 'Twitter']);">Share on Twitter</a></li>
                
                <li id="pin-share"><a href="//www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fskibumscholarship.com&media=http%3A%2F%2Fsites.cmdrm.com%2F8608%2Fpinterest-share.jpg&description=Columbia%20Ski%20Bum%20Scholarship%20is%20back.%20Win%20three%20months%20in%20Whistler%20with%20your%20best%20friend.%20Epic%2C%20meet%20your%20new%20definition.%20skibumscholarship.com" data-pin-do="buttonPin" data-pin-config="above" target="_blank" onclick="_gaq.push(['_trackEvent', 'Social', 'Share Contest', 'Pinterest']);"><img src='img/pin-sm.png'/></a></li>
                
                <li id="tumblr-share"><a href="http://www.tumblr.com/share/link?url=http%3A%2F%2Fskibumscholarship.com&name=Ski%20Bum%20Scholarship%20is%20back%20on%20Oct.%2021st.&description=Send%20us%20a%20video.%20We%20could%20send%20you%20and%20a%20friend%20to%20Whistler%20for%20three%20months.%20Columbia%20Ski%20Bum%20Scholarship%20is%20back.%20skibumscholarship.com" target="new" onclick="_gaq.push(['_trackEvent', 'Social', 'Share Contest', 'Tumblr']);">Share on Tumblr</a></li>
            </ul>
        </div>

        <img id="video-callout" src="/img/video-callout.png" alt="2013 Columbia Ski Bum Scholarship: Win three months in Whistler with a friend. Best. Contest. Ever." title="2013 Columbia Ski Bum Scholarship: Win three months in Whistler with a friend. Best. Contest. Ever." />

        <a href="#" id="hero-play-btn" onclick="_gaq.push(['_trackEvent', 'Link', 'Click', 'Play Teaser Video']);">Play Video<div>></div></a>

        <img src="/img/hero-graphic-4.png" id="hero-graphic" title="Ski Bum Scholarship" alt="Ski Bum Scholarship"  />

        <div id="hero-cta">
            <h2>SUBMIT VIDEOS STARTING October 21<sup>st</sup></h2>

            <p>Want to win three months of epic powder, first-class resort accommodations<br>
and hang out in hot tubs with ski bunnies and bros? All with a friend? <br>
Make a video and tell us why you should be the next Columbia Ski Bum. <br>
If you win, you and a friend might be killing it in Whistler before you know it.</p>
        </div>

        <a href="#how-to-win" class="cta-text">Get Your Video Going</a>

    </section>

    <span class="checkpoint-bottom" id="the-scholarship"></span>
</div>

<!-- HOW TO ENTER -->
<div class="sectionWrapper wrapperHowToEnter">
    
    <section class="countdownTimer">
        <a name="how-to-win" class="checkpoint-top"></a>
        <div id="counterContainer">

            <div id="myTimer">

                <script type="text/javascript">

                    CountdownImageFolder = "js/images/";

                    var date = new Date(1382328000000); // converted to Unix timestamp from 2013/10/20 21:00:00 PST
                    var ampmString = 'am';
                    if (date.getHours() >= 12) { 
                        ampmString = 'pm';
                    }
                    var hours = date.getHours();
                    if (date.getHours() > 12) { 
                        hours -= 12;
                    }

                    var test1 = new Countdown({
                          year  : date.getFullYear(), 
                          month : date.getMonth() + 1, 
                          day    : date.getDate(), 
                          hour  : hours,
                          ampm  : ampmString,
                          minute    : 0, 
                          second    : 0,
                          width : 340,
                          height : 60,
                          style : "flip",
                          rangeHi  : "day",
                          labels    :   {
                             font   : "Arial",
                             color  : "#2cb3f8",
                             weight : "bold"   // < - no comma on last item!
                         }
                           // < - no comma on last item!!
                     });
                    
                </script>

            </div>
			<div class="swinger"></div>
            <a class="calendar-add" href="#" onclick="_gaq.push(['_trackEvent', 'Link', 'Click', 'Add to My Calendar']);">Add to My Calendar »
                <!-- EVENT DETAILS -->
                <div class='addtocal vevent'>
                  <div class="summary">Ski Bum Scholarship is open and accepting video applications</div>
                  <span class="dtstart date" title="20131020T210000"></span>
                  <span class="dtend date" title="20131020T220000"></span>
                  <div class="location">Skibumscholarship.com</div>
                  <div class="description">Want to win three epic months in Whistler with your best friend? Of course you do. So make a video telling us why you’re our next Ski Bum. If you win, you and a friend get to call Whistler Village your home away from home for three months, starting in January.
Skibumscholarship.com

                  </div>
                
                </div>
            </a>
        </div>

    </section>

    <section class="HowToEnter scrollblock">

        <img id="howtoenter-headline" src="/img/howtoenter_headline.png" alt="Ski bums can't win on skills alone" title="Ski bums can't win on skills alone" />

        <p>You can stomp 360s in the backcountry and cork 7s in the park. Cool story.<br /> 
        But the winning Ski Bum isn’t just the one with the best skill on the hill.<br /> 
        So send us a video of you doing more than just sending it.</p>

        <table id="howtoenter-steps">
            <thead>
                <tr>
                    <th valign="top"><img src="/img/howtoenter_shootit.png" /><br />Shoot It</th>
                    <th valign="top"><img src="/img/howtoenter_cutit.png" /><br />Cut It</th>
                    <th valign="top"><img src="/img/howtoenter_sendit.png" /><br />Send It</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td valign="top"><p>Your video can be whatever you want it to be. Just make sure everything's clean and not obscene, and you're on the right track.</p></td>
                    <td valign="top"> <p>There's no limit to your imagination. Your video, on the other hand, must be between 60 and 90 seconds long.  So make every frame count. It also can't contain licensed music or other material.</p></td>
                    <td valign="top"><p>No copyrighted music? Check. No F-bombs or 
                    naughty bits? Double-check. Then upload your 
                    video starting October 21 and wait to see if your  
                    video is the Chosen One. </p></td>
                </tr>
            </tbody>
        </table>
        <div id="skibum-swag-btn-container">
            <div>
                <a href="downloads/ski-bum-swag-bag.zip" onclick="_gaq.push(['_trackEvent', 'Link', 'Click', 'Download Swag Bag']);" id="skibum-swag-btn">Skibum Swag Bag</a><br><!--<a href="contest-rules.html" target="_blank">OFFICIAL CONTEST RULES  »</a>--><br>
                <a href="#last-years-videos" class="cta-text">See Last Year's Videos</a>
            </div>
        </div>
    </section>	

    <span class="checkpoint-bottom" id="how-to-win"></span>
    <div class="clearfix"></div>
</div>

<!-- PREVIOUS YEARS VIDEO GALLERY -->
<div class="sectionWrapper wrapperGallery">
    <a name="last-years-videos" class="checkpoint-top"></a>
    <section class="gallery loading scrollblock">
        
        <!-- FIREBALL -->
        <div id="fireball"></div>

        <div class="galleryTextWrapper">
            <div>
                <h2>The Bar's Been Set.  Now Raise it.</h2>
                <p>
                    Last year, we received hundreds of Ski Bum Scholarship applications. 
                </p>
                <p>
                    Here are six of the best. They should give you an idea of what it takes to stand out from the crowd.
                </p>
            </div>
        </div>
		
        <!-- VIDEO PLAYER AREA -->
		<?php include('includes/videoplayer.php') ?>
		
		<!-- THUMBNAIL SLIDESHOW SKELETON -->
		<div id="thumbnailWrapper" class="flexslider">
		    <ul class="slides">
		        <!-- Slides populated here by Gallery script -->
		    </ul>
		</div>

		<!-- THUMBNAIL WRAPPER TEMPLATE -->
		<ul id="thumbnailWrapperTemplate" style="display: none;">
		    <!-- template for each slide -->
		    <li>
		        <ul class="thumbs topThumbs clearfix"></ul>
		        <ul class="thumbs bottomThumbs clearfix"></ul>
		    </li>
		</ul>
        
    </section>
    <a name="omni-heat" class="checkpoint-top"></a>
    <span class="checkpoint-bottom" id="last-years-videos"></span>
</div>

<!-- OMNI-HEAT -->
<div class="sectionWrapper wrapperOmniHeat scrollblock">
    <section class="omniHeat">
        <img src="/img/silver-dots.jpg" class="omni-heat-dots" />
        <img src="/img/yeti-omni.png" class="omni-yeti" />
    
        <h2>Ski Bums: 1, Frosbite: 0</h2>

        <p>Keep your warmth, not your sweat with Omni-Heat™ technology. The magic’s in the little silver dots that reflect and retain body heat, all while they wick away moisture.</p>
       	<div>
        	<a href="http://www.columbia.com/Omni-Heat-Reflective/Technology_Omni-Heat_Reflective,default,pg.html?mid=socm" target="_blank" onclick="_gaq.push(['_trackEvent', 'Link', 'Click', 'Explore Omni-Heat']);"><img src="/img/omni-explore.png" class="omni-explore" /></a>
        <a href="http://www.columbia.com/Omni-Heat-Reflective/Technology_Omni-Heat_Reflective,default,pg.html?mid=socm" target="_blank" class="exploreOmniHeatLink" onclick="_gaq.push(['_trackEvent', 'Link', 'Click', 'Explore Omni-Heat']);">Explore Omni-Heat </a>    
        </div>
    </section>
</div>



<!-- PRODUCT CALLOUT -->
<div class="sectionWrapper wrapperProductCallout">
    <section class="productCallout">
    	<h1>
       	    <img src="/img/productcallout_ahd.png" width="660" height="56" alt="SKIING is more fun with a friend. 
And sponsors."> 
        </h1>
		<p>
            The most epic ski experience this side of anywhere is made <br>
            possible by these sponsors and skiers like you.
        </p>
    	<div> <a href="http://www.whistler.com" target="_blank"><img src="/img/productcallout_logo01.png" width="311" height="57" alt="Whistler Canada"></a>
            <a href="http://freeskier.com/" target="_blank"><img src="/img/productcallout_logo02.png" width="301" height="57" alt="Freeskier Skiing's Independent magazine"></a>
        </div>
    </section>
</div>


<?php include('includes/footer.php') ?>
