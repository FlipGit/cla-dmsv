// View wrapping the existing Breadcrumb container
// -----------------------------------------------
DMSV.BreadcrumbView = Backbone.View.extend({
	el: "#dmsv-breadcrumb",

	events: {
		"click .breadcrumb-item": "itemClicked"
	},

	initialize: function() {
		_.bindAll(this, "change");
		this.collection.on("add", this.change);
		this.collection.on("remove", this.change);
	},

	// Breadcrumb item clicked
	itemClicked: function(el) {
		DMSV.activeFolder = parseInt($(el.target).attr("id").split("-")[2], 10);
		DMSV.objectCollection.fetch();
		this.collection.fetch();

		return false;
	},

	// Reset the breadcrumb items
	change: function() {
		this.$el.find("li.dynamic-li").remove();

		this.collection.each(function(item) {
			this.$el.append(new DMSV.BreadcrumbItemView({ model: item }).render().el);
		}, this);
	}
});

// View for dynamic breadcrumn items
// ---------------------------------
DMSV.BreadcrumbItemView = Backbone.View.extend({
	tagName: "li",
	className: "dynamic-li",
	tmpl: "#breadcrumb-item-tmpl",

	initialize: function() {
		_.bindAll(this, "render");
	},

	render: function() {
		// Determine whether we're the first and last item
		this.model.set({ first_item: DMSV.breadcrumbCollection.first() === this.model });
		this.model.set({ last_item: DMSV.breadcrumbCollection.last() === this.model });

		this.$el.html($(this.tmpl).tmpl(this.model.toJSON()));
		return this;
	}
});