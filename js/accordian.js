$.getScript("capture.js", function(){

   // alert("Script loaded and executed.");
   // Here you can use anything you defined in the loaded script
});

$(document).ready(function() {
	var openTabIndex;


	// $("#hamburger").hover(function(){
 //         $("#hamburger div").css("border", "1px solid black");
 //     }, function() {
 //    // on mouseout, reset the background colour
 //    $("#hamburger div").css("border", "1px solid white");
 //    });
    

	$("#events").zAccordion({
		startingSlide: 0,
		auto: false,
		tabWidth: '5%',
		width: "100%",
		height: "100%",
		trigger: "mousedown"
	});
	$(window).resize(function() {
		$("#events").height($(window).height());
		$("#events li").height($(window).height());
		$("#events img").height($(window).height());
	});


	var tabIndex = function(){
		var index = 0;
		$("#events li").each(function(){
			if ($(this).hasClass("frame-open")){
				openTabIndex = index;
			}
			else{
				index++;
			}
		});
	};

	$("#addButton").click(function() {
		$("#hamburger").fadeToggle( "slow", "linear" )

    	//enable all scrolling on mobile devices when menu is closed
    	jQuery('#container').unbind('touchmove');

    	//set margin for the whole container back to original state with a jquery UI animation
    	jQuery("#container").animate({"marginLeft": ["0", 'easeOutExpo']}, {
        	duration: 700,
        	complete: function() {
              	jQuery('#content').css('width', 'auto');
            	jQuery('#contentLayer').css('display', 'none');

        }
        });
		var index = $("#events").children().length;
		tabIndex();
		$("#events").append("<li><img src='images/slide0.gif' width='100%' height='100%' alt='' /></li>");
		$("#events").zAccordion("destroy", {
			removeStyleAttr: true, /* This attribute will default to true and remove all inline styles. */
			removeClasses: true, /* This attribute will default to false and remove any classes that have been set by zAccordion. */
			destroyComplete: {
				rebuild: {
					startingSlide: openTabIndex,
					auto: false,
					tabWidth: '5%',
					width: "100%",
					height: "100%",
					trigger: "mousedown"
				}
			}
		});
		$("#events").zAccordion("trigger",index);
		clickedFrame();
	});


	jQuery("#hamburger").click(function() {
		$("#hamburger").fadeToggle( "slow", "linear" )

        //set the width of primary content container -> content should not scale while animating
        var contentWidth = jQuery('#content').width();

        //set the content with the width that it has originally
        jQuery('#content').css('width', contentWidth);

        //display a layer to disable clicking and scrolling on the content while menu is shown
        jQuery('#contentLayer').css('display', 'block');

        //disable all scrolling on mobile devices while menu is shown
        jQuery('#container').bind('touchmove', function(e){e.preventDefault()});

        //set margin for the whole container with a jquery UI animation
        jQuery("#container").animate({"marginLeft": ["10%", 'easeOutExpo']}, {
            duration: 700
        });



    });

    jQuery("#contentLayer").click(function() {

    	$("#hamburger").fadeToggle( "slow", "linear" )

    	//enable all scrolling on mobile devices when menu is closed
    	jQuery('#container').unbind('touchmove');

    	//set margin for the whole container back to original state with a jquery UI animation
    	jQuery("#container").animate({"marginLeft": ["0", 'easeOutExpo']}, {
        	duration: 700,
        	complete: function() {
              	jQuery('#content').css('width', 'auto');
            	jQuery('#contentLayer').css('display', 'none');

        }
        });
    });
});