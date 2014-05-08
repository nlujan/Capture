// Events

/*
Each event is represented by a document in the Events collection:
	owner: user id -- note that this prototype inclues only one owner
	name: string
	address: string
	date: string
	time: string
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

var NonEmptyString = Match.Where(function (x) {
	check(x, String);
	return x.length !== 0;
});

createEvent = function(options) {
	var id = Random.id();
	Meteor.call("createEvent", _.extend({ _id: id }, options));
	return id;
}

Meteor.methods({
	// options should include name, address, date, time
	createEvent: function(options) {
		check(options, {
			name: NonEmptyString,
			address: NonEmptyString,
			date: NonEmptyString,
			time: NonEmptyString,
			_id: Match.Optimal(NonEmptyString)
		});

		if (options.name.length > 20)
			throw new Meteor.Error(413, "Event Name too long");

		var id = options._id || Random.id();
		Parties.insert({
			_id: id,
			owner: this.userId,
			name: options.name,
			address: options.address,
			date: options.date,
			time: options.time,
			invited: []
		});
		return id;
	},

	invite: function (eventId, userId) {
		check(eventId, String);
		check(userId, String);
		var event = Events.findOne(eventId);
		if (! event || event.owner !== this.userId)
			throw new Meteor.Error(404, "No such event");

		if (userId !== event.owner && ! _.contains(event.invited, userId)) {
			Events.update(eventId, { $addToSet: { invited: userId } });

			var from = contactEmail(Meteor.users.findOne(this.userId));
			var to = contactEmail(Meteor.users.findOne(userId));
			if (Meteor.isServer && to) {
				// This code only runs on server
				Email.send({
					from: "toksfifo@gmail.com",
					to: to,
					replyTo: from || undefined,
					subject: "EVENT: " + event.title,
					text: "Hey, I just invited you to '" + event.title + "' on Capture!" + "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
				});
			}
		}
	}
});


// Users

displayName = function (user) {
	if (user.profile && user.profile.name)
		return user.profile.name;
	return user.emails[0].address;
};

var contactEmail = function (user) {
	if (user.emails && user.emails.length)
		return user.emails[0].address;
	if (user.services && user.services.facebook && user.services.facebook.email)
		return user.services.facebook.email;
	return null;
};




























