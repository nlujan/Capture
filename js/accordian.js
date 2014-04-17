$(function() {

	var openTabIndex;

	$("#accordian").zAccordion({
		startingSlide: 0,
		auto: false,
		slideWidth: "70%",
		width: "100%",
		height: 500,
		trigger: "mousedown"
	});

	var tabIndex = function(){
		var index = 0;
		$("#accordian div").each(function(){
			if ($(this).hasClass("frame-open")){
				openTabIndex = index;
			}
			else{
				index++;
			}
		});
	};


	var counter = 0
	$("#addButton").click(function() {
		var index = $("#accordian").children().length;
		tabIndex();
		$("#accordian").append("<div><img src='images/slide3.gif' width='100%' height='100%' alt='' /></div>");
		$("#accordian").zAccordion("destroy", {
			removeStyleAttr: true, /* This attribute will default to true and remove all inline styles. */
			removeClasses: true, /* This attribute will default to false and remove any classes that have been set by zAccordion. */
			destroyComplete: {
				rebuild: {
					// startingSlide: openTabIndex,
					auto: false,
					slideWidth: "70%",
					width: "100%",
					height: 700,
					trigger: "mousedown"
				}
			}
		});
		$("#accordian").zAccordion("trigger",index);
	});




	// });

});