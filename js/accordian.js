$(document).ready(function() {
	var openTabIndex;
	var eventCount = 0;


	$("#hamburger").hover(function(){
         $("#hamburger div").css("border", "1px solid #D8D8D8");
     }, function() {
    // on mouseout, reset the background colour
    $("#hamburger div").css("border", "1px solid white");
    });
    

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
		$("#initialPage").hide();
		//hideWelcome();
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
				},			
			},
		});
		$("#events").zAccordion("trigger",index);
		// clickedFrame();
		createNewFrame();

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

    var createNewFrame = function() {
    	// add listener to frames upon creation
        $(".frame").click(frameClicked);

        // remove gif image that comes with acoordion panel
        $(".frame-open img").remove();

        var i = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

        // add all the panel functionality
        $(".frame-open").append('<div id="gray_screen"></div><div id="panel" class="panel'+i+'"><div id="title_screen"><div class="title_event_name simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Name"><input type="text" class="input_title event_name" value="Event Name" onclick="this.select();" /></div><div class="title_address simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Address"><input type="text" class="input_title address" value="Address" onclick="this.select();" /></div><div class="title_date simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Date"><input type="text" class="input_title date" value="Date" onclick="this.select();"/></div><div class="title_time simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Time"><input type="text" class="input_title time" value="Time" /></div><div class="simptip-position-bottom simptip-movable simptip-smooth" id="delete" data-tooltip="Delete Event"><img class="delete_inner" src="images/icon_16505/icon_16505.png" /></div></div><button class="panel_button timeline_button" onclick='+"window.location.href='learn_timeline.html'"+'>Timeline</button><button class="panel_button invite_button">Invite</button><button class="panel_button upload_button">Upload</button><button class="panel_button relive_button" onclick='+"window.location.href='http://www.satine.org/research/webkit/snowleopard/snowstack.html'"+'>Relive</button></div><!-- invite screen --><div class="hide_panel" id="invite_screen"><textarea type="text" class="email_list" placeholder="example@gmail.com"></textarea><button class="panel_button inviteNested_button">Invite</button><button class="panel_button inviteToAll_button">Invite to All</button><div class="simptip-position-bottom simptip-movable simptip-smooth" id="delete" data-tooltip="Cancel"><img class="cancel" src="images/icon_19368/icon_19368.png" /></div></div>');

        // remove current and blur closed frames
        $(".frame-closed").data("current", false);
        $(".frame-closed #panel").addClass("blur");

        // add current to newly created frame
        $(".frame-open").data("current", true);

        // add listeners for invite button
        $(".frame-open .invite_button").click(function() {
        	$(".frame-open #panel").addClass("blur");
        	$(".frame-open #invite_screen").toggleClass("show_panel");
        	$(".frame-open #invite_screen .email_list").focus();
        });

        // add listener for delete button
        $(".frame-open #invite_screen #delete").click(function() {
        	$(".frame-open #invite_screen").toggleClass("show_panel");
        	$(".frame-open #panel").removeClass("blur");
        });

        // add datepicker and timepicker
        $(".date").datepicker({
        	dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
         	dateFormat: "D M d yy"
        });
        $(".date").datepicker("setDate", new Date());
        $(".time").timepicker({
          	startTime: new Date(0,0,0,0,0,0),
          	scrollbar: true,
          	timeFormat: 'h:mm p'
        });
        var date_for_picker = new Date();
        date_for_picker.setMinutes (date_for_picker.getMinutes() + 30);
        date_for_picker.setMinutes (0);
        $(".time").timepicker("setTime", date_for_picker);
    }

    var frameClicked = function() {
    	//if the frame that was clikced was closed
      	if ($(".frame-open").data("current") != true) {
      		
        	// stuff for frame-closed
        	$(".frame-closed").data("current", false);
        	$(".frame-closed #panel").addClass("blur");

        	// stuff for frame-open
        	$(".frame-open").data("current", true);
        	$(".frame-open #panel").removeClass("blur");
      }
    }
});