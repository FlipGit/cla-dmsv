// Breadcrumb Collection
// ----------------------
DMSV.BreadcrumbCollection = Backbone.Collection.extend({
	model: DMSV.BreadcrumbItem,

	// Flag to determine whether we can change the contents in this folder
	add_folder: false,
	add_doc: false,

	url: function() {
		return "/intranet/rest/documents/folder/" + DMSV.activeFolder + "/ui";
	},

	// Overridden version of Backbone.Collection.fetch()
	fetch: function() {
		// Because we cannot fetch path info on the Root folder
		if(DMSV.activeFolder !== 0) {
			Backbone.Collection.prototype.fetch.call(this);
		} else {
			this.reset();
		}
	},

	// Overridden version of Backbone.Collection.reset()
	reset: function(models) {
		// Perform a reset as usual - But keep silent about it. We trigger the event at the end
		Backbone.Collection.prototype.reset.call(this, models, { silent: true });

		// If the our Root is 0 (The DMS root), add this as an entry
		if(DMSV.rootFolder === 0) {
			this.add({ id: 0, title: "Root" }, { at: 0 });
		}

		// Manually trigger the reset event
		this.trigger("reset");
	},

	parse: function(response) {
		// Data to return
		var ret = [];

		// Check for the permission change_content flag, set the internal property accordingly
		this.add_folder = _.has(response, "permission") && _.has(response.permission, "add_folder") && response.permission.add_folder === true;
		this.add_doc = _.has(response, "permission") && _.has(response.permission, "add_doc") && response.permission.add_doc === true;

		// If out root is 0, proceed as usual
		if(DMSV.rootFolder === 0) {
			return response.path;
		}

		// Otherwise, we only want to folders that are children of our Root
		var root_reached = false;
		_.each(response.path, function(item) {
			if (item['id'] == DMSV.rootFolder)
				root_reached = true;
			if (root_reached)
				ret.push(item);
		});
		return ret;
	}
});