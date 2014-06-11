// The Folder model
// ----------------
DMSV.Folder = Backbone.Model.extend({
	defaults: {
		id: undefined,
		title: undefined
	},

	url: function() {
		if(this.isNew()) {
			return "/intranet/rest/documents/folder/" + DMSV.activeFolder + "/folders";
		} else {
			return "/intranet/rest/documents/folder/" + this.get("id");
		}
	},

	validate: function() {
		if(!this.get("title") || this.get("title").length === 0) {
			return "A folder name must be specified";
		}
	}
});