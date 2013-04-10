DMSV.FolderView = Backbone.View.extend({
	tmpl: "#folder-tmpl",

	className : "documentItem documentFolder",

	events: {
		"click .folderLink": "folderClicked"
	},

	initialize: function() {
		_.bindAll(this, "render");
	},

	// When navigating folders
	folderClicked: function() {
		// Set the global activeFolderObj property
		DMSV.activeFolderObj = this.model;
		// Set the global activeFolder ID
		DMSV.activeFolder = this.model.get("id");
		// Fetch the new stuff
		// DMSV.object.fetch();
		DMSV.objectCollection.fetch();
		// Fetch the breadcrumb stuff
		DMSV.breadcrumbCollection.fetch();

		return false;
	},

	render: function() {
		// Again, because the structure of our model differs depending on a search or documents GET
		// we have to worm around this
		var data = this.model.toJSON();
		data.title = data.title || data.realname;

		this.$el.html($(this.tmpl).tmpl(data));

		return this;
	}
});