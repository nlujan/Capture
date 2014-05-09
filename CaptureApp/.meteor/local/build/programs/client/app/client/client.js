(function(){Meteor.subscribe("events");

Template.userInfo.userEmail = function () {
	if (Meteor.user()) {
		return Meteor.userId();
	}	
}

// Template.details.event = function () {
// 	return Events.findOne(Session.get("selected"));
// };

// Template.details.events({
// 	"click .invite": function () {
// 		openInviteDialog();
// 		return false;
// 	}
// });

Template.gallery.photos = function () {
    return Photos.find({});
  };

Template.attendance.canInvite = function () {
	return this.owner === Meteor.userId();
}

var openInviteDialog = function () {
	Session.set("showInviteDialog", true);
};

Template.page.showInviteDialog = function () {
	return Session.get("showInviteDialog");
};

Template.inviteDialog.events({
	"click .invite": function (event, template) {
		Meteor.call("invite", Session.get("selected"), this._id);
	},
	"click .done": function (event, template) {
		Session.set("showInviteDialog", false);
		return false;
	}
});

// Template.inviteDialog.uninvited = function () {
// 	var event = Events.findOne(Session.get("selected"));
// 	if (! event)
// 		return [];
// 	return Meteor.users.find({$nor: [{_id: {$in: event.invited}}, {_id: event.owner}]});
// };

Template.inviteDialog.displayName = function () {
	return displayName(this);
};

if (Meteor.is_server) {
	alert("yesss");
  Meteor.startup(function () {
    if( Photos.find().count() === 0) {
      var pics = [
        "http://upload.wikimedia.org/wikipedia/commons/e/e5/Pale_Ale.jpg",
        "http://upload.wikimedia.org/wikipedia/commons/3/3e/Weizenbier.jpg",
        "http://upload.wikimedia.org/wikipedia/commons/9/99/Glass_of_K%C3%B6stritzer_Schwarzbier.jpg"
      ];

      for (var i = 0; i < pics.length; i++) {
        Photos.insert({url: pics[i], phone: ""});
      }
    }
  });
}

})();
