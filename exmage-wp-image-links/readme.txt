=== EXMAGE - WordPress Image Links ===
Contributors: villatheme, mrt3vn
Donate link: https://www.villatheme.com/donate
Tags: elementor gallery with links, woocommerce product image external url,wordpress gallery custom links, wordpress gallery with links, wordpress image links
Requires at least: 5.6
Tested up to: 7.1
Requires PHP: 7.4
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Stable tag: trunk

Add images using external links - Save your storage with EXMAGE effortlessly

== Description ==

EXMAGE - WordPress Image Links helps you save storage by using external image URLs. These images are shown in Media library like normal images so that you can choose them for post/product featured image, WooCommerce product gallery... or everywhere that images are chosen from Media library.

[Try the Demo](https://new2new.com/?item=exmage "Demo EXMAGE - WordPress Image Links") | [Documents](https://docs.villatheme.com/?item=exmage "Documents") | [Pro Version](https://villatheme.com/extensions/exmage-wordpress-image-links "Premium Version") | | [Facebook group](https://www.facebook.com/groups/villatheme "VillaTheme")

###Preview EXMAGE - WordPress Image Links
[youtube https://youtu.be/R_hNwUIGqIQ]

###How to install and use the plugin
[youtube https://youtu.be/KSQoZjM7yBI]

### Important Notice:

- This plugin only supports real image URLs that have correct image mime type. It does not support image URLs from an image hosting service(such as Flickr, Imgur, Photobucket ...) or a file storage service(such as Google drive)

- External images added by this plugin will no longer work if the plugin is not active

### FEATURES

- Ability to add single image URL on Upload files tab of the Media library

- Ability to add multiple image URLs at once on below the File upload on Upload New Media page

- External images have an icon to distinguish them from normal attachments.

- External images also have attachment ID like normal attachments so that you can use them wherever that allows to insert images from Media library such as Post/Product featured image, product gallery images, variation image, product category image...

- Compatible with ALD plugin: when this plugin is active, there will be an option named "Use external links for images" in the ALD plugin settings/Products. By enabling this option, AliExpress products imported by ALD plugin will use original AliExpress image URLs for product featured images, gallery images and variation images instead of saving images to your server.

=Integration=

`
if(class_exists( 'EXMAGE_WP_IMAGE_LINKS' )){
    $add_image = EXMAGE_WP_IMAGE_LINKS::add_image( $url, $image_id, $post_parent );
}
`
-$url: URL of the image you want to process
-$image_id: Passed by reference
-$post_parent: ID of the post that you want the image to be attached to. If empty, the image will not be attached to any post
-Return:
`
        [
        'url'       => $url,//Input URL
		'message'   => '',//Additional information
		'status'    => 'error',//error or success
		'id'        => '',//Attachment ID if added new or the attachment exists
		'edit_link' => '',//Attachment's edit link if added new or the attachment exists
		]
`
### MAY BE YOU NEED

[9Map - Map Multi Locations](https://wordpress.org/plugins/9map-map-multi-locations/)

[Abandoned Cart Recovery for WooCommerce](https://wordpress.org/plugins/woo-abandoned-cart-recovery/)

[Advanced Product Information for WooCommerce](https://wordpress.org/plugins/woo-advanced-product-information/)

[AFFI - Affiliate Marketing for WooCommerce](https://wordpress.org/plugins/affi-affiliate-marketing-for-woo/)

[ALD - Dropshipping and Fulfillment for AliExpress and WooCommerce](https://wordpress.org/plugins/woo-alidropship/)

[Boost Sales for WooCommerce - Set up Up-Sells & Cross-Sells Popups & Auto Apply Coupon](https://wordpress.org/plugins/woo-boost-sales/)

[Bopo - WooCommerce Product Bundle Builder](https://wordpress.org/plugins/bopo-woo-product-bundle-builder/)

[Bulky - Bulk Edit Products for WooCommerce](https://wordpress.org/plugins/bulky-bulk-edit-products-for-woo/)

[Cart All In One For WooCommerce](https://wordpress.org/plugins/woo-cart-all-in-one/)

[Catna - Woo Name Your Price and Offers](https://wordpress.org/plugins/catna-woo-name-your-price-and-offers/)

[Checkout Upsell Funnel for WooCommerce](https://wordpress.org/plugins/checkout-upsell-funnel-for-woo/)

[ChinaDS - Tmall-Taobao Dropshipping for WooCommerce](https://wordpress.org/plugins/chinads-dropshipping-taobao-woocommerce/)

[Clear Autoptimize Cache Automatically](https://wordpress.org/plugins/clear-autoptimize-cache-automatically/)

[COMPE - WooCommerce Compare Products](https://wordpress.org/plugins/compe-woo-compare-products/)

[Coreem - Coupon Reminder for WooCommerce](https://wordpress.org/plugins/woo-coupon-reminder/)

[Coupon Box for WooCommerce](https://wordpress.org/plugins/woo-coupon-box/)

[CURCY - Multi Currency for WooCommerce - Smoothly on WooCommerce 9.x](https://wordpress.org/plugins/woo-multi-currency/)

[Customer Coupons for WooCommerce](https://wordpress.org/plugins/woo-customer-coupons/)

[DEPART - Deposit and Part payment for Woo](https://wordpress.org/plugins/depart-deposit-and-part-payment-for-woo/)

[Email Template Customizer for WooCommerce](https://wordpress.org/plugins/email-template-customizer-for-woo/)

[EPOI - WP Points and Rewards](https://wordpress.org/plugins/epoi-wp-points-and-rewards/)

[EPOW - Custom Product Options for WooCommerce](https://wordpress.org/plugins/epow-custom-product-options-for-woocommerce/)

[EU Cookies Bar for WordPress](https://wordpress.org/plugins/eu-cookies-bar/)

[EXMAGE - WordPress Image Links](https://wordpress.org/plugins/exmage-wp-image-links/)

[Faview - Virtual Reviews for WooCommerce](https://wordpress.org/plugins/woo-virtual-reviews/)

[FEWC - Extra Checkout Fields For WooCommerce](https://wordpress.org/plugins/fewc-extra-checkout-fields-for-woocommerce/)

[Free Shipping Bar for WooCommerce](https://wordpress.org/plugins/woo-free-shipping-bar/)

[GIFT4U - Gift Cards All in One for Woo](https://wordpress.org/plugins/gift4u-gift-cards-all-in-one-for-woo/)

[HANDMADE - Dropshipping for Etsy and WooCommerce](https://wordpress.org/plugins/handmade-dropshipping-for-etsy-and-woo/)

[HAPPY - Helpdesk Support Ticket System](https://wordpress.org/plugins/happy-helpdesk-support-ticket-system/)

[Jagif - WooCommerce Free Gift](https://wordpress.org/plugins/jagif-woo-free-gift/)

[LookBook for WooCommerce - Shoppable with Product Tags](https://wordpress.org/plugins/woo-lookbook/)

[Lucky Wheel for WooCommerce - Spin a Sale](https://wordpress.org/plugins/woo-lucky-wheel/)

[Lucky Wheel Giveaway](https://wordpress.org/plugins/wp-lucky-wheel/)

[Notification for WooCommerce | Boost Your Sales - Recent Sales Popup - Live Feed Sales - Upsells](https://wordpress.org/plugins/woo-notification/)

[Orders Tracking for WooCommerce](https://wordpress.org/plugins/woo-orders-tracking/)

[Photo Reviews for WooCommerce](https://wordpress.org/plugins/woo-photo-reviews/)

[Pofily - WooCommerce Product Filters](https://wordpress.org/plugins/pofily-woo-product-filters/)

[PRENA - Product Pre-Orders for WooCommerce](https://wordpress.org/plugins/product-pre-orders-for-woo/)

[Product Builder for WooCommerce - Custom PC Builder](https://wordpress.org/plugins/woo-product-builder/)

[Product Size Chart For WooCommerce](https://wordpress.org/plugins/product-size-chart-for-woo/)

[Product Variations Swatches for WooCommerce](https://wordpress.org/plugins/product-variations-swatches-for-woocommerce/)

[REDIS - WooCommerce Dynamic Pricing and Discounts](https://wordpress.org/plugins/redis-woo-dynamic-pricing-and-discounts/)

[REES - Real Estate for Woo](https://wordpress.org/plugins/rees-real-estate-for-woo/)

[S2W - Import Shopify to WooCommerce](https://wordpress.org/plugins/import-shopify-to-woocommerce/)

[Sales Countdown Timer](https://wordpress.org/plugins/sales-countdown-timer/)

[SUBRE - Product Subscription for WooCommerce - Recurring Payments](https://wordpress.org/plugins/subre-product-subscription-for-woo/)

[Suggestion Engine for WooCommerce](https://wordpress.org/plugins/woo-suggestion-engine/)

[Thank You Page Customizer for WooCommerce - Increase Your Sales](https://wordpress.org/plugins/woo-thank-you-page-customizer/)

[TMDS - Dropshipping for TEMU and Woo](https://wordpress.org/plugins/tmds-dropshipping-for-temu-and-woo/)

[VARGAL - Additional Variation Gallery for WooCommerce](https://wordpress.org/plugins/vargal-additional-variation-gallery-for-woo/)

[VillaTheme Core](https://wordpress.org/plugins/villatheme-core/)

[VIMA - Multi Customer Addresses for Woo](https://wordpress.org/plugins/vima-multi-customer-addresses-for-woo/)

[VISeek - Easy Custom Search](https://wordpress.org/plugins/viseek-easy-custom-search/)

[W2S - Migrate WooCommerce to Shopify](https://wordpress.org/plugins/w2s-migrate-woo-to-shopify/)

[WebPOS - Point of Sale for WooCommerce](https://wordpress.org/plugins/webpos-point-of-sale-for-woocommerce/)

[WPBulky - WordPress Bulk Edit Post Types](https://wordpress.org/plugins/wpbulky-wp-bulk-edit-post-types/)

### Plugin Links

- [Project Page](https://villatheme.com/extensions/exmage-wordpress-image-links/)
- [Report Bugs/Issues](https://villatheme.com/knowledge-base/security-is-our-priority/)

== Installation ==

1. Unzip the download package
2. Upload `exmage-wp-image-links` to the `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

== Screenshots ==
1. Photos added to gallery using external link
2. Add images using external link in "Add Media File"
3. Add image using external link on Upload popup
4. AI generated Alt text
5. Display video anywhere using shortcode
6. Video displayed using shortcode

== Changelog ==
2026.11.06 - version 1.1.5
- Fixed: Bound remote image validation (timeout + response size) and re-validate before convert-to-local download
- Fixed: Frontend attachment URL/srcset meta reuse (fewer get_post_meta calls per request)
- Fixed: Scope admin EXMAGE scripts to Media screens / when Media is already enqueued
- Fixed: Escape AJAX error messages in Media UI; convert-back control after download reload; multi-row Add to gallery URL collect
- Fixed: PHP 8.5-safe missing hook guard in exmage_remove_filter
- Updated: Compatible with WooCommerce 11.2

2026.08.17 - version 1.1.4
- Updated: Compatible WooCommerce 11.0

2026.06.20 - version 1.1.3
- Updated: VillaTheme support

2026.04.18 - version 1.1.2
- Added: Bulk import multiple image URLs at once with preview and checkbox selection
- Added: Import images from CSV file (drag & drop or browse)

2026.01.20 - version 1.1.1
- Updated: Compatible with WC 10.4 and WP 6.9
- Updated: Update support class

2025.09.05 - version 1.1.0
- Updated: Updated to new interface
- Updated: Compatible with WC 10.1.2
- Updated: Update support class

2025.07.26 - version 1.0.25
- Updated: Compatible with WP 6.8.2 and WC 10.0.3
- Updated: Update support class

2025.04.18 - version 1.0.24
- Updated: Compatible with WP 6.8 and WC 9.8
- Updated: Update support class

2025.03.03 - version 1.0.23
- Fixed: Fixed call to undefined function get_current_screen()

2025.02.28 - version 1.0.22
- Added: Added filter images by Exmage on the upload.php page
- Added: Bulk download external images on the upload.php page.
- Updated: Compatible with WP 6.7.2 and WC 9.7
- Updated: Update support class

2025.01.20 - version 1.0.21
- Updated: Compatible with WC 9.5.2
- Updated: Update support class

2024.12.06 - version 1.0.20
- Updated: Compatible with WP 6.7.1 and  WC 9.4.3
- Fixed: Cannot add image by URL in Media

2024.11.21 - version 1.0.19
- Updated: Compatible with WP 6.7 and  WC 9.4
- Updated: Update support class

2024.06.14 - version 1.0.18
- Updated: Update support class

2024.04.13 - version 1.0.17
- Updated: Compatible with WP 6.5
- Updated: Update support class

2023.09.06 - version 1.0.16
- Updated: Add stop processing button

2023.05.12 - version 1.0.15
- Updated: Keep exmage link of product when import product from csv

2023.01.11 - version 1.0.14
- Updated: If the number of images is greater than threshold(20 by default, able to change via exmage_ajax_handle_url_threshold hook), they will be processed in the background
- Updated: Compatible with WPML's attachment translations feature
- Dev: Added exmage_insert_attachment_image_name filter hook

2023.01.10 - version 1.0.13
- Fixed: Compatibility issue with Photon CDN(Jetpack)
- Dev: Added exmage_get_supported_image_sizes, exmage_image_size_url filter hooks

2022.11.17 - version 1.0.12
- Fixed: Image URL processing in some cases
- Updated: Compatibility check with WP 6.1

2022.08.29 - version 1.0.11
- Dev: Added exmage_get_supported_mime_types filter hook

2022.07.22 - version 1.0.10
- Updated: VillaTheme_Support
- Updated: Data sanitization/escaping check

2022.05.07 - version 1.0.9
- Fixed: Error with URLs that contains more than 255 characters

2022.04.19 - version 1.0.8
- Updated: VillaTheme_Support

2022.04.14 - version 1.0.7
- Fixed: Use wp_http_validate_url before remote call

2022.03.29 - version 1.0.6
- Updated: VillaTheme_Support

2022.03.28 - version 1.0.5
- Fixed: Use wp_safe_remote_get instead of wp_remote_get to avoid redirection and request forgery attacks

2022.03.21 - version 1.0.4
- Updated: VillaTheme_Support

2022.01.14 - version 1.0.3
- Optimized: Enqueue script

2022.01.10 - version 1.0.2.2
- Updated: VillaTheme_Support

2021.12.13 - version 1.0.2.1
- Updated: Missing css/image files for class VillaTheme_Support

2021.12.11 - version 1.0.2
- Added: Button to store external images to server in Media library/list view mode

2021.12.08 - version 1.0.1
- Updated: Do not allow to edit(crop, rotate...) external images to avoid unexpected errors

2021.12.07 - version 1.0.0
 - Released
