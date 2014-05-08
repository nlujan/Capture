Template.userInfo.userEmail = function () {
	if (Meteor.user()) {
		return Meteor.userId();
	}	
}