<!-- VIDEO PLAYER AREA -->
<div class="player">
	<div class="shareOptions">
		<a id="playerFacebookShare"href="http://www.facebook.com/share.php?u=http%3A%2F%2Fskibumscholarship.com/video/<?php if (isset($video)) {echo $video->id;} ?>" target="share"><img src="/img/facebook_share_btn_lg.png" alt="Share this video on Facebook" /></a>
		<a id="playerTwitterShare" href="http://twitter.com/home?status=This%20Ski%20Bum%20video%20is%20doing%20it%20right.%20Vote%20for%20it%20at%20skibumscholarship.com%20%23skibum13%20http%3A%2F%2Fskibumscholarship.com%2Fvideo%2F<?php if (isset($video)) {echo $video->id;} ?>" target="share"><img src="/img/twitter_share_btn_lg.png" alt="Share this video on Twitter" /></a>
	</div>
    <div class="theVideo"></div>
    <div class="details myHidden">
        <div class="scrollingWrapper">
            <div class="entrantTitle"></div>
            <div class="entrantName"></div>
            <div class="location"></div>
            <div class="description"></div>
        </div>
		<div class="rank"></div>
		<div class="vote"></div>
    </div>
</div>

