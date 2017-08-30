<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="How do you make winning a three-month trip to shred world-class Whistler pow and scoring first class accommodations the entire time even awesome-er? By letting you do it all a with a friend. Columbia Ski Bum Scholarship is back. This is your chance to live the dream in Whistler B.C. with a friend. All you have to do is make a video and tell us why you’re the Ski Bum we’ve been looking for, and upload it after October 21. If you win, you and a friend could be killing it at Whistler in no time.">
        <meta name="keywords" content="Ski Bum Scholarship, ski, skiing, freeskiing, Whistler, ski videos, win a trip to whistler with a friend, ski video contest, yeti, sasquatch, poutine">
	    <meta name="viewport" content="width=device-width, target-densityDpi=device-dpi">
        <meta property="og:site_name" content="2013 Columbia Ski Bum Scholarship" />
        <meta property="og:type" content="website" />
		<script type="text/javascript" charset="utf-8">
			window.postvar = '<?php echo $postvar ?>';
			window.voted = <?php echo ($voted)? 'true' : 'false'; ?>;
		</script>
		
        <?php if (isset($video)) { ?>
        <title>2013 Columbia Ski Bum Scholarship : <?php echo $video->title; ?></title>
            <!-- video share -->
            <meta property="og:url" content="http://skibumscholarship.com/video/<?php echo $video->id; ?>" />
            <meta property="og:title" content="<?php echo $video->title; ?>" />
            <meta property="og:image" content="http://storage.filemobile.com/storage/<?php echo $video->id; ?>/15" />
            <meta property="og:description" content="Should this video win the Columbia Ski Bum Scholarship? Vote for it at skibumscholarship.com. Democracy wins again! #skibum13" />
        <?php } else { ?>
        <title>2013 Columbia Ski Bum Scholarship</title>
            <!-- page share -->
            <meta property="og:url" content="http://skibumscholarship.com/" />
            <meta property="og:title" content="2013 Columbia Ski Bum Scholarship" />
            <meta property="og:image" content="http://skibumscholarship.com/img/facebook-share.jpg" />
            <meta property="og:description" content="The 2013 Ski Bum Scholarship is open for applications. Enter a video at skibumscholarship.com and you could win three months in Whistler with a friend." />
        <?php } ?>
        
        <link rel="stylesheet" href="/css/normalize.min.css">
        <link rel="stylesheet" href="/css/main.css">
        <link rel='stylesheet' type='text/css' href='/js/addtocal/jquery.addtocal.css' />

        <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
        <!--script src="/js/countdown.js"></script-->
        
    </head>
    <body class="<?php if (isset($body_class)) {echo($body_class);} ?>">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        <div class="wrapper">

    		<header>

                <div id="headerWrap">
                
                    <h1>The Ski Bum Scholarship Program</h1>

                    <h2><a href="http://www.columbia.com/" target="_blank" onclick="_gaq.push(['_trackEvent', 'Link', 'Click', 'Columbia Site']);">Columbia</a></h2>

			        <?php if (!isset($video_id)) { ?>
                    <nav>
                        <ul>
                            <li><a href="#prizes-to-win">Prizes</a></li>
                            <li><a href="#how-to-enter">Enter</a></li>
                            <li><a href="#this-years-videos">Watch &amp; Vote</a></li>
                            <li><a href="#instagram-sweeps">Instagram Sweeps</a></li>
                            <li><a href="#goodies-section">Goodies</a></li>
                        </ul>
                    </nav>
			        <?php } ?>

                    <div id="soc-nav">

                        <h6>Follow us on:</h6>

                        <ul>
                            <li id="fb-follow"><a href="https://www.facebook.com/ColumbiaSportswear" target="follow" onclick="_gaq.push(['_trackEvent', 'Social', 'Follow', 'Facebook']);">Follow on Facebook</a></li>
                            <li id="tw-follow"><a href="https://twitter.com/Columbia1938" target="follow" onclick="_gaq.push(['_trackEvent', 'Social', 'Follow', 'Twitter']);">Follow on Twitter</a></li>
                        </ul>
                    </div>

                </div>
            </header>
            
            <div id="mainContainer">
