/*
Each event is represented by a document in the Events collection:
	owner: user id -- note that this prototype inclues only one owner
	event_name: string
	event_address: string
	event_date: date object
	event_time: date object
	invited: array of user id's that are invited
*/
Events = new Meteor.Collection("events");

// Allow users to write directly to this collection from client code, subject to limitations
Events.allow({
	insert: function(userId, event) {
		return false; // by convention -- use createEvent method
	},
	update: function(userId, event, fields, modifier) {
		if (userId !== event.owner)
			return false; // not the owner
	},
	remove: function(userId, event) {
		// you can only remove events you created
		return event.owner === userId;
	}
})

