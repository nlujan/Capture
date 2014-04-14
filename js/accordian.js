$(function() {

	// $("#accordian").zAccordion({
	// 	timeout: 4000,
	// 	slideWidth: 700,
	// 	width: 1300,
	// 	height: 700
	// });
	$("#accordian").zAccordion({
		startingSlide: 0,
		auto: false,
		// tabWidth: "5%",
		slideWidth: "70%",
		width: "100%",
		height: 700,
		trigger: "mousedown"
	});

	// $("#addButton").click(function(evt) {
	// 	$("#accordian").append("<div><img src='images/slide3.gif' width='100%' height='100%' alt='' /></div>");
	var counter = 0
	$("#addButton").click(function() {
		var index = $("#accordian").children().length;
		$("#accordian").append("<div><img src='images/slide3.gif' width='100%' height='100%' alt='' /></div>");
		$("#accordian").zAccordion("destroy", {
			removeStyleAttr: true, /* This attribute will default to true and remove all inline styles. */
			removeClasses: true, /* This attribute will default to false and remove any classes that have been set by zAccordion. */
			destroyComplete: {
				rebuild: {
					startingSlide: index,
					auto: false,
					slideWidth: "70%",
					width: "100%",
					height: 700,
					trigger: "mousedown"
				}
			}
		});
		//$("#addButton").zAccordion("trigger",index);
		return false;
	});




	// });

});