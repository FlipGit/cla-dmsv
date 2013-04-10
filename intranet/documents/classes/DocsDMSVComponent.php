<?php
class DocsDMSVComponent extends TemplaterComponentTmpl {

	public function Show($attributes)
	{
		global $args;
		$datasources = array();

		// Parse the DMS Document Icons
		require_once('../common/icons.php');
		$args['icons.json'] = $file_type_classes;

		// Instantiate the DMS Dropbox dialog
		$dropbox = new DropboxDialog();
		$dropbox->Show();

		// Check for a root folder
		$args['root_folder.body'] = is_numeric($attributes['root_folder']) ? $attributes['root_folder'] : 0;

		$args['dmsv_options.json'] = array('root_edit' => ERMSBrowser::GetPermsChecker(false)->CanChangeContent(null));

		return $this->CallTemplater('documents/dms_view.html', $args, $datasources);
	}
}