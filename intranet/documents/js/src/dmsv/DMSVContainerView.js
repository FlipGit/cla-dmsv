// A view wrapping the DMSV component
// ----------------------------------
DMSV.ContainerView = Backbone.View.extend({
	el: "#dmsv-container",

	initialize: function() {
		_.bindAll(this, "appendOne", "reset");
		this.collection.on("add", this.appendOne);
		this.collection.on("reset", this.reset);
	},

	appendOne: function(model) {
		if(model.get("type") === "folder") {
			this.$el.append(new DMSV.FolderView({ model: model }).render().el);
		} else if(model.get("type") === "document") {
			this.$el.append(new DMSV.DocumentView({ model: model }).render().el);
		} else { // We should never get here
			alert("ERROR: An unknown object type was received in DMSV.ContainerView.appendOne() - Type: " + model.get("type"));
		}
	},

	reset: function() {
		this.$el.empty();
		this.collection.each(function(object) {
			this.appendOne(object);
		}, this);
	}
});