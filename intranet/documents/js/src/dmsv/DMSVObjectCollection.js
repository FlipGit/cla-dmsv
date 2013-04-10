// The Object Collection
// ----------------------
// Responsible for grabbing Folders/Documents data from the server
// with an optional limit, offset and search query
DMSV.ObjectCollection = Backbone.Collection.extend({
	// The offset
	start: 0,
	// The limit
	num: 10,
	// Whether we have more to load
	more_to_load: false,

	url: function() {
		return "/intranet/rest/documents/folder/" + DMSV.activeFolder;
	},

	fetch: function(options) {
		var self = this;

		// Ensure we have an options object
		options = options || {};

		// Ensure we have the data property
		options.data = options.data || {};

		// If we're not adding, we're resetting. So start from 0 again
		if(!options.add) {
			this.start = 0;
		}
		// Apply pagination options
		options.data.start = this.start;
		options.data.num = this.num;

		// Show the loader
		options.beforeSend = function() {
			$("#docSpinner").show();
		};
		options.complete = function() {
			$("#docSpinner").fadeOut();
		};

		// Are we doing a search?
		if(DMSV.search && !_.isEmpty(DMSV.search.get("q"))) {
			options.data.folder_id = DMSV.activeFolder;
			options.data.with_subfolders=1;
			options.data.start = 0;
			options.data.q = DMSV.search.get("q");
			options.url = "/intranet/rest/search/documents/";
		}

		success = function(collection, json) {
			// Check whether we've received the limit
			self.more_to_load = collection.length == self.num;
			// Trigger an event for the DMSVShowMoreView
			self.trigger("updateShowMore");

			// Call the optional callback method
			// Callback method should be named "successCallback" instead of "success"
			if(options.successCallback) {
				options.successCallback.call(collection, json);
			}
		};

		// Assign the success callback
		options.success = success;

		// super.Collection.fetch()
		Backbone.Collection.prototype.fetch.call(this, options);
	},

	// Called on "Show More"
	fetchMore: function(options) {
		this.start = this.start + this.num;
		options = options || {};
		options.add = true;
		this.fetch(options);
	},

	// The response structure differs from normal requests
	// to search requests
	parse: function(response) {
		if(response.results) {
			return response.results;
		}
		return response;
	}
});