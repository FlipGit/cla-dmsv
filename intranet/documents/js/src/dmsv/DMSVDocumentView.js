DMSV.DocumentView = Backbone.View.extend({
	tmpl: "#document-tmpl",

	className : "documentItem documentDoc",

	// Known image extensions
	imageExtensions: [
		'jpg', 'jpeg', 'png', 'gif'
	],

	initialize: function() {
		_.bindAll(this, "render");
	},

	render: function() {
		var
			// Hack around the fact the title can be called "title" or "realname"
			title = this.model.get("title") || this.model.get("realname"),
			// Split the file name down in to parts
			fileParts = title.split('.'),
			// Attempt to grab the extension
			ext = fileParts.pop();

		// For some reasin, the structure for a search is completely different to a documents GET
		this.model.set("title",  title);

		// If it's an image, set the lightbox property.
		// Used in the tmpl for determining the URL etc.
		if(this.imageExtensions.indexOf(ext) >= 0) {
			this.model.set({ "lightbox": true });
		}

		// Draw our $el
		this.$el.html($(this.tmpl).tmpl(this.model.toJSON()));

		// Again, if it's an image, attach the lightbox
		if(this.imageExtensions.indexOf(ext) >= 0) {
			this.$el.find("a").lightBox();
		}

		return this;
	}
});