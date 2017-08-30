<?php $body_class = "main"; ?>
<?php include('includes/config-video.php'); ?>    			
<?php include('includes/header.php'); ?>    			

<?php include('includes/hero.php'); ?>
<?php include 'includes/skibarprogress.php'; ?>	

<!-- WHAT YOU WIN SECTION 2 -->
<div class="sectionWrapper wrapperWhatYouWin scrollblock checkpoint" id="prizes-to-win">
    <!-- <a name="prizes-to-win" class="checkpoint-top"></a> -->
    
    <section class="WhatYouWin scrollblock" id="what-you-win">

		<img src="img/section2/h1.png" width="921" height="63" alt="Apply by December 2nd to win so much epicness we couldn’t put a price on it. ">
		<div id="moose1"></div>
		<div id="moose2"></div>

    <ul>
			<li>Round trip coach air travel for you and your Ski Bum Buddy</li>
			<li>Sweet condo in the heart of Whistler Village</li>
			<li>2 Whistler-Blackcomb season passes</li>
			<li>More Omni-Heat™ gear than you can shake a yeti at</li>
			<li>$100 a day to feed your faces</li>
			<li>2 Round trip shuttles from Vancouver to Whistler</li>
			<li>2 Public transit passes </li>
			<li>2 GoPro cameras to help you create killer videos</li>
    </ul>
		
    <div class="enter-now">
        <a href="uploader.html" onclick="_gaq.push(['_trackEvent', 'Button', 'Click', 'Enter Now']); return popitup('uploader.html')" class="button">Enter Now</a><br><br>
        <a href="#how-to-enter" class="cta-text">Get Your Video Ready</a>
    </div>
    </section>	

    <div class="clearfix"></div>
</div>

<!-- HOW TO ENTER  SECTION 3 -->
<div class="sectionWrapper wrapperHowToEnter checkpoint" id="how-to-enter">

    <section class="HowToEnter scrollblock">

		<img src="img/section3/h1.png" width="668" height="60" alt="Make a video and you could be making your way to Whistler. ">
		
        <p>It&rsquo;s easy to see why the Ski Bum Scholarship is the ultimate score.  Winning it, on the other hand, isn&rsquo;t so easy. So pay attention to the guidelines and rules below. Even if you don&rsquo;t win Whistler, you can still win runners-up prizes of $250 in Columbia Gear.</p>

        <table id="howtoenter-steps">
            <thead>
                <tr>
                    <th valign="top" width="33%"><img src="img/howtoenter_shootit.png" height="56" width="56" /><br />Shoot It</th>
                    <th valign="top" width="34%"><img src="img/howtoenter_cutit.png" height="56" width="56" /><br />Cut It</th>
                    <th valign="top" width="33%"><img src="img/howtoenter_sendit.png" height="56" width="101" /><br />Send It</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td valign="top"><p>Your video can be whatever you want it to be. Just make sure everything’s clean and not obscene, and you’re on the right track.</p></td>
                    <td valign="top"> <p>There’s no limit to your imagination. Your video, however, must be between 60 and 90 seconds long and can’t contain licensed music or other material. So download our <a href="downloads/ski-bum-swag-bag.zip">Swag Bag</a>.</p></td>
                    <td valign="top"><p>No copyrighted music? Check. No F-bombs or naughty bits? Double check. Now you’re ready to upload your video and wait to see if it is the Chosen One.</p></td>
                </tr>
            </tbody>
        </table>
        <div id="skibum-swag-btn-container">
            <div>
                <a href="downloads/ski-bum-swag-bag.zip" onclick="_gaq.push(['_trackEvent', 'Button', 'Download', 'Ski-bum-swag-bag.zip']);" class="button pink twoline"><img src="/img/mobile/swagbg_carrot.png" width="14" height="11" alt=" "> Ski Bum Swag Bag <br/><span class="additional">Download music and images for your video.</span></a>
                
                <a href="uploader.html" onclick="_gaq.push(['_trackEvent', 'Button', 'Click', 'Submit Video']); return popitup('uploader.html')" class="button launch_uploader">Submit Video</a>
				<p><a href="contest-rules.php" target="_blank" class="whitelink">OFFICIAL CONTEST RULES  »</a><br>
				   <a href="#this-years-videos" class="cta-text">Watch and vote</a></p>
            </div>
        </div>
    </section>	
	
</div>


<!-- VIDEO GALLERY SECTION 4 -->
<div class="sectionWrapper wrapperGallery checkpoint" id="this-years-videos">
    <!-- <a name= class="checkpoint-top"></a> -->
    <section class="scrollblock">
        
        <!-- FIREBALL -->
        <div id="fireball"></div>

        <div class="galleryTextWrapper">
            <div>
                <h2>Watch videos. Vote on videos. This is skiing, not rocket science.</h2>
				<p> Browse, search, and most importantly, vote for your favorite ski bum video. Yes, video. As in singular. As in you only get one vote per day. So use it wisely. Anyone caught trying to game the system will be publicly shamed on Reddit.</p>
            </div>
        </div>
		
		<div id="slider_controls">
			<span class="group sort-group">
				<span class="label">SORT</span>
				<span class="sort latest">The Latest</span>
				<span class="sort greatest">The Greatest</span>
				<span class="sort randoms">The Randoms</span>
			</span>
			<form action="#" method="get" accept-charset="utf-8" id="videosearch" class="group search-group">
				<span class="label">SEARCH</span>
				<input type="text" name="video" class="video-search" value="">
				<button><img src="img/section4/searchbutton.png" height="32" width="40" alt="Search"></button><span class="clearsearch">X</span>
			</form>
			<span class="group videonav-group">
				<span class="current"><span class="page-current"></span> of <span class="page-count"></span></span>
			</span>
		</div>

    <!-- Relocated here to keep it in the viewport -->

		<div class="loading gallery">
			
	        <!-- VIDEO PLAYER AREA -->
			<?php include('includes/videoplayer.php') ?>
		
			<!-- THUMBNAIL SLIDESHOW SKELETON -->
			<div id="thumbnailWrapper">
			</div>

			<!-- THUMBNAIL WRAPPER TEMPLATE -->
			<ul id="thumbnailWrapperTemplate" style="display: none;">
			    <!-- template for each slide -->
			    <li>
			        <ul class="thumbs topThumbs clearfix"></ul>
			        <ul class="thumbs bottomThumbs clearfix"></ul>
			    </li>
			</ul>
		</div>
        
    <a href="#instagram-sweeps" target="_blank" class="cta-text">Win on Instagram</a>
    </section>
    <!-- <a name="omni-heat" class="checkpoint-top"></a> -->
</div>

<?php include('includes/omniheat.php') ?>
<?php include('includes/instagram.php') ?>
<?php include('includes/poll.php'); ?>
<?php include('includes/spotify.php'); ?>


<!-- Live The Dream SECTION 9 -->
<div class="sectionWrapper wrapperDream checkpoint" id="live-the-dream">
    <!-- <a name="" class="checkpoint-top"></a> -->
    <section class="liveTheDream">
        <img class="heading" src="img/section9/dream_headline.png" width="567" height="61" alt="Enter to win three months in Whistler with your BFF." />
        <a href="#how-to-enter" class="button cta-hero">Learn more <b>&raquo;</b></a>
        <div>
            <img src="img/hero-graphic-3.png" height="461" width="620" />
        </div>
    </section>
</div>

<?php include('includes/productcallout.php') ?>
<?php include('includes/footer.php') ?>
<!-- <?php include('includes/uploader.php') ?> -->
