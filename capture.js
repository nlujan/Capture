var clickedFrame = function() {
  i = randxy(0,2);
  if (typeof $(".frame-open").data("beenclicked") === "undefined") {
    $(".frame-open img").remove();
    $(".frame-open").append('<div id="gray_screen"></div><div id="panel" class="panel'+i%3+'"><div id="title_screen"><div class="title_event_name simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Name"><input type="text" class="input_title event_name" value="Event Name" onclick="this.select();" /></div><div class="title_address simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Address"><input type="text" class="input_title address" value="Address" onclick="this.select();" /></div><div class="title_date simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Date"><input type="text" class="input_title date" value="Date" onclick="this.select();"/></div><div class="title_time simptip-position-right simptip-movable simptip-smooth" data-tooltip="Enter Time"><input type="text" class="input_title time" value="Time" /></div><div class="simptip-position-bottom simptip-movable simptip-smooth" id="delete" data-tooltip="Delete Event"><img class="delete_inner" src="images/icon_16505/icon_16505.png" /></div></div><button class="panel_button timeline_button" onclick='+"window.location.href='learn_timeline.html'"+'>Timeline</button><button class="panel_button invite_button">Invite</button><button class="panel_button upload_button">Upload</button><button class="panel_button relive_button">Relive</button></div><!-- invite screen --><div class="hide_panel" id="invite_screen"><input type="text" class="email_list" name="tag[]" value="example@gmail.com" /><button class="panel_button inviteNested_button">Invite</button><button class="panel_button inviteToAll_button">Invite to All</button><div class="simptip-position-bottom simptip-movable simptip-smooth" id="delete" data-tooltip="Cancel"><img class="cancel" src="images/icon_31941/icon_31941.png" /></div></div>');
    $(".frame-open .invite_button").click(function() {
      $(".frame-open #panel").addClass("blur");
      $(".frame-open #invite_screen").removeClass("hide_panel");
      $(".frame-open #invite_screen").addClass("show_panel");
    });
    $(".frame-open #invite_screen #delete").click(function() {
      $(".frame-open #invite_screen").removeClass("show_panel");
      $(".frame-open #invite_screen").addClass("hide_panel");
      $(".frame-open #panel").removeClass("blur");
    });
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
  else {
    // if frame open elements don't exist
    if (typeof $(".frame-open #title_screen") === "undefined" || $(".frame-open #title_screen:hidden")) {
      $(".frame-open #title_screen").fadeIn(1000);
      $(".frame-open .panel_button").fadeIn(1000);
      removeVerticalName($(".frame-open #panel"), $(".frame-open #panel #vertical_text"));
    } 
  }
  $(".frame-open").data("beenclicked", true);
  // if frame closed elements exists
  if (typeof $(".frame-closed #title_screen") !== "undefined" || $(".frame-closed #title_screen:visible")) {
    $(".frame-closed #title_screen").fadeOut(1000);
    $(".frame-closed .panel_button").fadeOut(1000);
    removeVerticalName($(".frame-previous #panel"), $(".frame-previous #panel #vertical_text"));
    verticalName($(".frame-previous #panel"), $(".frame-previous .input_title").val());
  }
}

var verticalName = function(panel, event_name_text) {
  // if (panel.data("has_vertical_text") != true) {
    $('<div id="vertical_text">'+event_name_text+'</div>').hide().appendTo(panel).fadeIn(2000);
    // $(panel).data("has_vertical_text", true);
  // }
}

var removeVerticalName = function(panel, text_selector) {
  // if (panel.data("has_vertical_text") == true) {
    text_selector.remove();
    // $(panel).data("has_vertical_text", false);
  // }
}

var randxy = function(x,y) {
  return Math.floor(Math.random()*(y-x+1)) + x;
}