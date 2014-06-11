// View for the List/Icon buttons
// -------------------------------
DMSV.StyleSwitchView = Backbone.View.extend({
	el: "#documentViewSize",

	events: {
		"click a": "switchStyle"
	},

	switchStyle: function(ev) {
		el = ev.target.tagName.toLowerCase() === "span" ? $(ev.target).parent() : $(ev.target);
		el.parent().find("a").each(function(i, a) {
			$(a).removeClass("active");
		});
		el.addClass("active");
		$("#dmsv-container").attr("class", "").addClass(el.data('set-class'));

		return false;
	}
});

// View wrapping the Create Folder modal
// --------------------------------------
DMSV.CreateFolderView = Backbone.View.extend({
	el: "#addFolderPopup",

	events: {
		"click #confirmAddFolder": "addFolder"
	},

	// Add folder button clicked
	addFolder: function() {
		var self = this, error;
		var folder = new DMSV.Folder({ title: this.$("#folder_title").val() });
		error = folder.validate();
		if(error) {
			alert(error);
			return false;
		}
		folder.save(undefined, {
			success: function() {
				self.$el.modal("hide");
				DMSV.objectCollection.fetch();
			},
			error: function(model, xhr, options) {
				// TODO: Handle this properly
				if(typeof console === "object") {
					console.log(model, xhr, options);
				}
			}
		});

		return false;
	}
});

// View wrapping the Add Document button
// -------------------------------------
DMSV.AddDocumentView = Backbone.View.extend({
	el: "#addDocumentPopup",

	events: {
		"click .btn-primary": "addDocument"
	},

	addDocument: function() {
		_.each(fuu_obj.GetFiles(), function(file) {
			DMSV.objectCollection.create(
				new DMSV.Document(
					{
						title: file.file_name,
						components: [
							{
								file_key: file.file_key,
								is_primary: true
							}
						]
					}
				), { wait: true }
			);
		});

		this.$el.modal("hide");

		return false;
	}
});

// View wrapping the "Add Document" and "Add Folder" button
// --------------------------------------------------------
DMSV.AddFolderDocumentButtons = Backbone.View.extend({
	el: "#add-folder-docs-btns",

	initialize: function() {
		_.bindAll(this, "redraw");
		DMSV.breadcrumbCollection.on("sync", this.redraw);
	},

	redraw: function(root_check) {
		var add_folder = false;
		var add_doc = false;
		if(DMSV.activeFolder === 0) {
            add_folder = DMSV.options.root_edit;
            add_doc = DMSV.options.root_edit;
		} else {
			add_folder = DMSV.breadcrumbCollection.add_folder;
			add_doc = DMSV.breadcrumbCollection.add_doc;
		}

		this.$("#dmsv-add-folder-link").toggle(add_folder);
		this.$("#dmsv-add-document-link").toggle(add_doc && DMSV.activeFolder !== 0);
		this.$("#dmsv-add-folder-span").toggle(!add_folder);
		this.$("#dmsv-add-document-span").toggle(!add_doc && DMSV.activeFolder !== 0);
	}
});

// View wrapping the "View in Documents" link
// ------------------------------------------
DMSV.ViewInDMSView = Backbone.View.extend({
	el: "#view-in-dms",

	initialize: function() {
		_.bindAll(this, "update");
		DMSV.objectCollection.on("all", this.update);
	},

	update: function() {
		this.$el.prop("href", "/intranet/documents/" + DMSV.activeFolder);
	}
});

// Search box View
// ---------------
DMSV.SearchView = Backbone.View.extend({
	el: "#search_form",
    options: {},
	events: {
		"keyup #search": "search",
		"keydown #search": "detectEnter",
		"click .search-reset": "clearSearch"
	},

	initialize: function() {
		_.bindAll(this, "search");
	},

	// Detect enter keydown events and prevent them
	detectEnter: function(ev) {
		// Prevent enter from doing it's thing
		if(ev.keyCode === 13) {
			return false;
		}
	},

	// Perform the search on keyup
	// Will wait 0.5 seconds before performing the search
	search: function(ev) {
		var self = this;

		// No point going through on enter
		if(_.isObject(ev) && ev.keyCode === 13) {
			return false;
		}

		// Timer already running? End it.
		if(this.options.timer !== undefined) {
			clearTimeout(this.options.timer);
			this.options.timer = undefined;
		}

		// Start a search timer
		this.options.timer = setTimeout(function() {
			self.model.set({ q: self.$("#search").val() });
			DMSV.objectCollection.fetch();
		}, 500);

		return false;
	},

	// Clear the search field
	clearSearch: function() {
		this.$("#search").val('');
		this.search();

		return false;
	}
});