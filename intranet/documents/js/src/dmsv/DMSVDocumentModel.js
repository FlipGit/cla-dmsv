// The Document Model
// ------------------
DMSV.Document = Backbone.Model.extend({
	url: function() {
		return "/intranet/rest/documents/folder/" + DMSV.activeFolder + "/documents";
	}
});