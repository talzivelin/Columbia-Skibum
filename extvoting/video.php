<?php $body_class = "popup-video"; ?>
<?php 

	include('includes/config-video.php');

	$video_id = (isset($_GET['videoid'])) ? $_GET['videoid'] : null ;

	
	$request = "$url?id=$video_id&method=media.getFileInfo&vhost=$apiVhost&APIKEY=$key&filters%5Bfiletype%5D=2&_=1381810256988";

	$data = json_decode(file_get_contents($request));
	$video = $data->result;
	// var_dump($request);
	// die();
?>

<?php include('includes/header.php'); ?>    			


<div class="sectionWrapper wrapperHero popupHero">
    <section class="hero scrollblock">
		<img src="/img/popup-hero.png" width="772" height="206" alt="Popup Hero" class="nav-front">
	</section>
</div>

<!-- VIDEO GALLERY -->
<div class="sectionWrapper wrapperSinglevideo">
    <section class="gallery loading singlevideo scrollblock">
        
        <!-- FIREBALL -->
        <div id="fireball"></div>

        <div class="galleryTextWrapper">
            <div>
				<img src="/img/popup-videos/h1.png" width="623" height="61" alt="Columbia Ski Bum Scholarship: Best. Contest. Ever.">
				<p>This ski bum wants to score an epic trip to Whistler with a friend. But what about you? </p>
				<p>Watch the video and vote for it if you think they deserve to be the next Columbia Ski Bum.</p>
            </div>
        </div>
		<?php if ($video): ?>
			<script type="text/javascript" charset="utf-8">
				window.video_id = '<?php echo $video->id ?>';
			</script>
		<?php endif ?>
		
        <!-- VIDEO PLAYER AREA -->
		<?php include('includes/videoplayer.php') ?>
        <div class="galleryTextWrapper">
			<img src="/img/popup-videos/h2.png" width="664" height="67" alt="Experience Ski Bum Scholarship in all its glory.">
			<a href="/" class="button">Visit the full site</a>
			

			<p>There&rsquo;s more to this year&rsquo;s Ski Bum Scholarship than watching and voting.</p>
	
			<ul>			
				<li>Make a video and enter to win a full ride to Whistler this winter</li>
				<li>Win Columbia gear in our Instagram sweepstakes</li>
				<li>Test your steeze and Canadian IQ</li>
				<li>Learn why Omni-Heat™ Reflective is the hottest gear in the game</li>
			</ul> 
			       
		</div>
    </section>
</div>

<?php include('includes/omniheat.php'); ?>

            <!-- PRODUCT CALLOUT -->
            <div class="sectionWrapper wrapperProductCallout">
                <section class="productCallout">
                	<h1>
                   	    <img src="/img/productcallout_ahd.png" width="660" height="56" alt="SKIING is more fun with a friend. And sponsors."> 
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


<?php include('includes/footer.php'); ?>    			
