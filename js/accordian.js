$.getScript("capture.js", function(){

   // alert("Script loaded and executed.");
   // Here you can use anything you defined in the loaded script
});

$(document).ready(function() {
	var openTabIndex;

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
});