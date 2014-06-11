DMSV.ShowMoreView = Backbone.View.extend({
	el: "#show-more",

	events: {
		"click #show-more-link": "fetchMore"
	},

	initialize: function() {
		_.bindAll(this, "fetchMore", "render");
		DMSV.objectCollection.on("updateShowMore", this.render);
	},

	fetchMore: function() {
		DMSV.objectCollection.fetchMore();

		return false;
	},

	render: function() {
		this.$("#show-more-link").toggle(DMSV.objectCollection.more_to_load === true);
		return this;
	}
});