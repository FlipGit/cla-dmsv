// A view wrapping the DMSV component
// ----------------------------------
DMSV.ContainerView = Backbone.View.extend({
	el: "#dmsv-container",

	initialize: function() {
		_.bindAll(this, "change");
		this.collection.on("add", this.change);
		this.collection.on("remove", this.change);
	},

	appendOne: function(model) {

		// Some error checking.
		// This seems to happen when the Cla Indexing service is not running
		if(model.has("success") && model.get("success") === false) {
			alert("Sorry! There was an error communicating with the server");
			return false;
		}

		if(model.get("type") === "folder") {
			this.$el.append(new DMSV.FolderView({ model: model }).render().el);
		} else if(model.get("type") === "document") {
			this.$el.append(new DMSV.DocumentView({ model: model }).render().el);
		} else { // We should never get here
			alert("ERROR: An unknown object type was received in DMSV.ContainerView.appendOne() - Type: " + model.get("type"));
		}
	},

    change: function() {
		this.$el.empty();
		this.collection.each(function(object) {
			this.appendOne(object);
		}, this);
	}
});