<?php
/**
 * Uninstall EXMAGE - WordPress Image Links.
 *
 * @package EXMAGE_WP_IMAGE_LINKS
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_site_option( 'exmage_background_process_image_kill_process' );
delete_transient( 'exmage_background_process_image_complete' );

global $wpdb;

// Clear background process batches.
$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
	$wpdb->prepare(
		"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
		$wpdb->esc_like( 'wp_exmage_background_process_image_batch_' ) . '%',
		$wpdb->esc_like( '_transient_exmage_background_process_image' ) . '%'
	)
);

if ( is_multisite() ) {
	$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$wpdb->prepare(
			"DELETE FROM {$wpdb->sitemeta} WHERE meta_key LIKE %s",
			$wpdb->esc_like( 'wp_exmage_background_process_image_batch_' ) . '%'
		)
	);
}
