<?php
/**
 * DMSV Component
 *
 * To use this, simply embed:
 *
 *	 <component class="DmsvComponent">
 *
 * On your page.
 *
 * Optional parameters:
 *  * root_folder - The folder to point the DMSV at
 *
 * @author Julian Cohen [julian.cohen@claromentis.com]
 */
class DmsvComponent extends TemplaterComponentTmpl
{

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

		// Pass along some options
		$args['dmsv_options.json'] = array('root_edit' => ERMSBrowser::GetPermsChecker(false)->CanChangeContent(null));

		return $this->CallTemplater('dmsv/dms_view.html', $args, $datasources);
	}
}