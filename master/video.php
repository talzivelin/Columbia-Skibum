<?php 
	$video_id = (isset($_GET['videoid'])) ? $_GET['videoid'] : null ;
	if (!$video_id) header('Location: /');
?>
<?php include('includes/header.php'); ?>    			

<!-- PREVIOUS YEARS VIDEO GALLERY -->
<div class="sectionWrapper wrapperGallery">
    <a name="last-years-videos" class="checkpoint-top"></a>
    <section class="gallery loading scrollblock">
        
        <!-- FIREBALL -->
        <div id="fireball"></div>

        <div class="galleryTextWrapper">
            <div>
                <h2>Video</h2>
                <p>
                    Last year, we received hundreds of Ski Bum Scholarship applications. 
                </p>
                <p>
                    Here are six of the best. They should give you an idea of what it takes to stand out from the crowd.
                </p>
            </div>
        </div>
		<script type="text/javascript" charset="utf-8">
			window.video_id = '<?php echo $video_id ?>';
		</script>
		
        <!-- VIDEO PLAYER AREA -->
		<?php include('includes/videoplayer.php') ?>
        
    </section>
    <a name="omni-heat" class="checkpoint-top"></a>
    <span class="checkpoint-bottom" id="last-years-videos"></span>
</div>


<?php include('includes/footer.php'); ?>    			
