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

// fix for indexOf in IE8
if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			? Math.ceil(from)
			: Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++)
		{
			if (from in this &&
				this[from] === elt)
				return from;
		}
		return -1;
	};
}

yepnope([{
	load: [
		"/intranet/js/backbone-min.js",
		"/intranet/dmsv/js/jquery.tmpl-min.js",

		"/intranet/dmsv/js/src/DMSVFolderModel.js?x=1",
		"/intranet/dmsv/js/src/DMSVDocumentModel.js?x=1",
		"/intranet/dmsv/js/src/DMSVBreadcrumbItemModel.js?x=1",

		"/intranet/dmsv/js/src/DMSVObjectCollection.js?x=1",
		"/intranet/dmsv/js/src/DMSVBreadcrumbCollection.js?x=1",

		"/intranet/dmsv/js/src/DMSVContainerView.js?x=1",
		"/intranet/dmsv/js/src/DMSVFolderView.js?x=2",
		"/intranet/dmsv/js/src/DMSVDocumentView.js?x=2",
		"/intranet/dmsv/js/src/DMSVBreadcrumbView.js?x=2",

		"/intranet/dmsv/js/src/DMSVSearchModel.js?x=2",

		"/intranet/dmsv/js/src/DMSVActionsView.js?x=2",

		"/intranet/dmsv/js/src/DMSVShowMoreView.js?x=2",

		"/intranet/dmsv/js/lightbox/js/jquery.lightbox.js",
		"/intranet/dmsv/js/lightbox/css/jquery.lightbox.css"
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

		// temporary changes for buttons in popup forms
		DMSV.detailedUploadView = new DMSV.DetailedUploadView();
		DMSV.extendedEditView = new DMSV.ExtendedEditView();
	}
}]);