DMSV = window.DMSV || {
	constant: {
		FOLDER: 2,
		DOCUMENT: 4
	},
	// Our current folder
	activeFolder: 0,
	// The desired root folder
	rootFolder: 0,

	activeFolderObj: undefined
};

var claIcon = function(fileName) {
	var ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
	var icon = _.find(DMSV.icons, function(icon, key) {
		return key === ext;
	});
	if( typeof icon === 'undefined') {
		icon = 'cla-icon-page';
	}
	return icon;
};

Modernizr.load([{
	both: [
		"/intranet/js/backbone-min.js",
		"/intranet/js/jquery.tmpl.min.js",

		"/intranet/documents/js/src/dmsv/DMSVFolderModel.js?x=1",
		"/intranet/documents/js/src/dmsv/DMSVDocumentModel.js?x=1",
		"/intranet/documents/js/src/dmsv/DMSVBreadcrumbItemModel.js?x=1",

		"/intranet/documents/js/src/dmsv/DMSVObjectCollection.js?x=1",
		"/intranet/documents/js/src/dmsv/DMSVBreadcrumbCollection.js?x=1",

		"/intranet/documents/js/src/dmsv/DMSVContainerView.js?x=1",
		"/intranet/documents/js/src/dmsv/DMSVFolderView.js?x=2",
		"/intranet/documents/js/src/dmsv/DMSVDocumentView.js?x=2",
		"/intranet/documents/js/src/dmsv/DMSVBreadcrumbView.js?x=2",

		"/intranet/documents/js/src/dmsv/DMSVSearchModel.js?x=2",

		"/intranet/documents/js/src/dmsv/DMSVActionsView.js?x=2",

		"/intranet/documents/js/src/dmsv/DMSVShowMoreView.js?x=2",

		"/intranet/gallery/js/jquery.lightbox.js",
		"/intranet/gallery/css/jquery.lightbox.css"
	],
	complete: function() {
		DMSV.styleSwitchView = new DMSV.StyleSwitchView();
		DMSV.addFolderView = new DMSV.CreateFolderView();
		DMSV.addDocumentView = new DMSV.AddDocumentView();

		// Search stuff
		DMSV.search = new DMSV.Search();
		DMSV.searchView = new DMSV.SearchView({ model: DMSV.search });

		DMSV.objectCollection = new DMSV.ObjectCollection();
		DMSV.containerView = new DMSV.ContainerView({ collection: DMSV.objectCollection });
		DMSV.objectCollection.fetch();

		DMSV.breadcrumbCollection = new DMSV.BreadcrumbCollection();
		DMSV.breadcrumbView = new DMSV.BreadcrumbView({ collection: DMSV.breadcrumbCollection });
		DMSV.breadcrumbCollection.fetch();

		DMSV.addFolderDocumentButtons = new DMSV.AddFolderDocumentButtons();
		DMSV.addFolderDocumentButtons.redraw(DMSV.options.root_edit);
		DMSV.viewInDMSView = new DMSV.ViewInDMSView();

		DMSV.showMoreView = new DMSV.ShowMoreView();
		DMSV.showMoreView.render();
	}
}]);