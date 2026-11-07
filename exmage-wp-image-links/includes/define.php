<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals -- Intentional EXMAGE_WP_IMAGE_LINKS_ / VillaTheme_ prefixes.
define( 'EXMAGE_WP_IMAGE_LINKS_LANGUAGES', EXMAGE_WP_IMAGE_LINKS_DIR . 'languages' . DIRECTORY_SEPARATOR );
$exmage_plugin_url = plugins_url( '', __FILE__ );
$exmage_plugin_url = str_replace( '/includes', '', $exmage_plugin_url );
define( 'EXMAGE_WP_IMAGE_LINKS_ASSETS', $exmage_plugin_url . '/assets/' );
define( 'EXMAGE_WP_IMAGE_LINKS_CSS', EXMAGE_WP_IMAGE_LINKS_ASSETS . 'css/' );
define( 'EXMAGE_WP_IMAGE_LINKS_JS', EXMAGE_WP_IMAGE_LINKS_ASSETS . 'js/' );
define( 'EXMAGE_WP_IMAGE_LINKS_IMAGES', EXMAGE_WP_IMAGE_LINKS_ASSETS . 'images/' );
unset( $exmage_plugin_url );

if ( is_file( EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'functions.php' ) ) {
	require_once EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'functions.php';
}
if ( is_file( EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'support.php' ) ) {
	require_once EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'support.php';
}
if ( is_file( EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'wp-async-request.php' ) ) {
	require_once EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'wp-async-request.php';
}
if ( is_file( EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'wp-background-process.php' ) ) {
	require_once EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'wp-background-process.php';
}
if ( is_file( EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'exmage-background-process.php' ) ) {
	require_once EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'exmage-background-process.php';
}
if ( is_file( EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'background-process-images.php' ) ) {
	require_once EXMAGE_WP_IMAGE_LINKS_INCLUDES . 'background-process-images.php';
}
