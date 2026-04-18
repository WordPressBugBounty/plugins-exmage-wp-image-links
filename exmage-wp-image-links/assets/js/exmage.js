jQuery(document).ready(function ($) {
    'use strict';
    $(document).on('click', '.exmage-migrate-button,.exmage-convert-external-button', function (event) {
        convert_attachment($(this));
    });
    /*Add field filter external image*/
    let ids_media = [];


    $('body').on('click', '.download_exmage_all', (e) => {
        e.preventDefault();
        let text_count = ids_media.length > 0 ? ids_media.length : 'all';
        if (confirm('Do you really want to download ' + text_count + ' images?')) {
            let per_download = 5;

            if(!ids_media.length){
                get_all_attachment_id();
            }
            if(!ids_media.length){
                alert("No Exmage available for download.")
            }
            for (let i = 0; i < per_download; i++) {
                let current_media_id = ids_media[i],
                    button_selector = $('#post-' + current_media_id).find('.exmage-migrate-button');
                convert_attachment(button_selector, true);
            }
        }
    });
    $('body').on('change', 'input[name="media[]"],#cb-select-all-1', (e) => {
        ids_media = [];
        $('.exmage-migrate-button').map(function () {
            let current_tr = $(this).closest('tr');
            if (current_tr.find('input[name="media[]"]').prop('checked')) {
                ids_media.push($(this).data('attachment_id'));
            }
        });
        if (ids_media.length) {
            $('.download_exmage_all .exmage_number_download').html(ids_media.length);
        } else {
            $('.download_exmage_all .exmage_number_download').html("all");
        }
    });
    function get_all_attachment_id() {
        ids_media = [];
        $('.exmage-migrate-button').map(function () {
            ids_media.push($(this).data('attachment_id'));

        });
    }
    function convert_attachment($button, multiple = false) {
        let attachment_id = $button.data('attachment_id'),
            $container = $button.closest('.exmage-external-url-container'),
            $message = $container.find('.exmage-migrate-message'),
            to_external = $button.is('.exmage-migrate-button') ? 0 : 1;
        if (!$button.hasClass('exmage-button-loading')) {
            $button.addClass('exmage-button-loading');
            $message.html('');
            $.ajax({
                url: exmage_admin_params.ajaxurl,
                type: 'POST',
                data: {
                    action: 'exmage_convert_external_image',
                    attachment_id: attachment_id,
                    to_external: to_external,
                    _exmage_ajax_nonce: exmage_admin_params._exmage_ajax_nonce,
                },
                success(response) {
                    if (response.status === 'success') {
                        // $container.find('.exmage-external-url-content').html(response.message);
                        $container.find('.exmage-external-url-content').html('');
                        if(multiple){
                            ids_media = jQuery.grep(ids_media, function(value) {
                                return value !== attachment_id;
                            });

                            if(ids_media.length){
                                let current_media_id = ids_media[0],
                                    button_selector = $('#post-' + current_media_id).find('.exmage-migrate-button');
                                convert_attachment(button_selector, true);
                            }
                        }
                    } else {
                        $message.html('<span class="exmage-message-error"><span class="exmage-use-url-message-content">' + response.message + '</span></span>');
                    }
                },
                error() {
                    $message.html('<span class="exmage-message-error"><span class="exmage-use-url-message-content">An error occurs</span></span>');
                },
                complete() {
                    $button.removeClass('exmage-button-loading');
                }
            });
        }
    }

    /*Process image url*/
    $(document).on('click', '.exmage-use-url-input-multiple-add', function () {
        data_preprocessing($(this).closest('.exmage-container-form').find('.exmage-use-url-input-multiple'));
        exmage_handle_url_input($(this).closest('.exmage-container-form').find('.exmage-add-external-url-field'));
    });

    $(document).on('change', '.exmage-add-external-url-field.exmage-add-external-url-media', function (event) {
        let t = $(this),
            t_closest = t.closest('.exmage-table-tr'),
            t_closest_table = t.closest('.exmage-wrap-body-table'),
            t_closest_wrap_loading = t_closest_table.find('.exmage-use-url-input-overlay'),
            t_image_preview_wrap = t_closest.find('.exmage_preview_field'),
            t_image_preview = t_image_preview_wrap.find('.exmage-image-preview'),
            placeholder_src = t_image_preview.data('placeholder_src');

        if (isImageURL(t.val())) {
            t_image_preview.attr('src', t.val());
            t_image_preview_wrap.show();
            t_closest.attr('data-media_type', 'image');
        } else {
            t_closest.attr('data-media_type', 'image');
            t_image_preview.attr('src', placeholder_src);
            t_image_preview_wrap.hide();
        }

        // if (t.val() !== '') {
        //     t_closest.find('.exmage-add-field').trigger('click');
        // }

    });

    $(document).on('click', '.exmage-delete-field', function () {
        let t = $(this),
            t_closet = t.closest('.exmage-table-tr'),
            t_body_table = t.closest('.exmage-wrap-body-table');
        let count = t_body_table.find('.exmage-table-tr').length;
        if (count > 1) {
            t_closet.remove();
        } else {
            alert('You cannot delete all fields!');
        }
        return false;
    });
    $(document).on('click', '.exmage-add-field', function () {
        let t = $(this),
            t_closet = t.closest('.exmage-table-tr'),
            t_body_table = t.closest('.exmage-wrap-body-table');
        let template = t_closet.clone();

        let preview_field_img = template.find('.exmage_preview_field img');
        template.find('.exmage-add-external-url-media').val('');/*Remove external video or image clone*/

        template.attr('data-media_type', 'image');/*Set default tr media_type*/

        preview_field_img.attr('src', preview_field_img.data('placeholder_src'));

        t_body_table.append(template);
        return false;
    });

    /* ============================================
       EXMAGE Multi-URL Import
       ============================================ */

    // Parse URLs from text (newline, comma, semicolon, space)
    function exmage_parse_urls(text) {
        if (!text || !text.trim()) return [];
        // Split by newline, comma, semicolon, or multiple spaces
        let urls = text.split(/[\n,\s;]+/);
        urls = urls.map(u => u.trim()).filter(u => u.length > 0);
        // Unique
        let seen = {};
        urls = urls.filter(u => {
            if (seen[u]) return false;
            seen[u] = true;
            return true;
        });
        return urls;
    }

    // Parse URLs from CSV text
    function exmage_parse_csv(text) {
        if (!text || !text.trim()) return [];
        let lines = text.split(/\r?\n/);
        let urls = [];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (!line) continue;
            line = line.replace(/^["']|["']$/g, '').trim();
            if (i === 0 && !/^https?:\/\//i.test(line)) continue;
            if (/^https?:\/\//i.test(line)) {
                urls.push(line);
            }
        }
        let seen = {};
        urls = urls.filter(u => {
            if (seen[u]) return false;
            seen[u] = true;
            return true;
        });
        if (urls.length === 0) {
            const re = /https?:\/\/[^\s"',;\r\n)]+/gi;
            let m;
            while ((m = re.exec(text)) !== null) {
                let u = m[0].replace(/[.,;)\]]+$/g, '');
                if (/^https?:\/\//i.test(u)) urls.push(u);
            }
            seen = {};
            urls = urls.filter(u => {
                if (seen[u]) return false;
                seen[u] = true;
                return true;
            });
        }
        return urls;
    }

    function exmage_set_csv_error(show, message) {
        let $el = $('#exmage-csv-error');
        if (!$el.length) return;
        if (!show) {
            $el.addClass('exmage-hidden').empty();
            return;
        }
        $el.removeClass('exmage-hidden').text(message || '');
    }

    // Render preview table
    function exmage_render_preview(urls) {
        let $container = $('#exmage-url-preview-container'),
            $list = $('#exmage-url-preview-list'),
            $count = $('#exmage-preview-count'),
            $btn = $('#exmage-add-multiple-btn');

        $list.empty();

        if (!urls || urls.length === 0) {
            $container.hide();
            $btn.prop('disabled', true);
            return;
        }

        $count.text(urls.length + ' URL' + (urls.length > 1 ? 's' : '') + ' found');
        $container.show();

        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            let $item = $('<div class="exmage-preview-item"></div>');
            $item.append('<input type="checkbox" checked data-url="' + exmage_esc_attr(url) + '">');
            $item.append('<img class="exmage-preview-thumb loading" src="' + exmage_esc_attr(url) + '" onload="jQuery(this).removeClass(\'loading\')" onerror="jQuery(this).removeClass(\'loading\').attr(\'src\',\'\');">');
            $item.append('<span class="exmage-preview-url" title="' + exmage_esc_attr(url) + '">' + exmage_esc_html(url) + '</span>');
            $list.append($item);
        }

        $btn.prop('disabled', false);
    }

    // Escape HTML attributes
    function exmage_esc_attr(str) {
        return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    // Escape HTML text
    function exmage_esc_html(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Update button count based on checked items
    function exmage_update_count() {
        let checked = $('#exmage-url-preview-list input:checked').length;
        let total = $('#exmage-url-preview-list .exmage-preview-item').length;
        let $btn = $('#exmage-add-multiple-btn');
        if (checked > 0) {
            $btn.text('Add ' + checked + ' to Gallery');
            $btn.prop('disabled', false);
        } else {
            $btn.text('Add All to Gallery');
            $btn.prop('disabled', true);
        }
    }

    // Handle textarea input/paste
    $(document).on('input paste', '#exmage-multiple-urls', function () {
        let text = $(this).val();
        let urls = exmage_parse_urls(text);
        exmage_render_preview(urls);
    });

    // Handle CSV file upload
    $(document).on('change', '#exmage-csv-file-input', function (e) {
        let file = e.target.files[0];
        if (!file) {
            exmage_set_csv_error(false);
            $('#exmage-csv-filename').text('');
            return;
        }
        $('#exmage-csv-filename').text(file.name);
        let reader = new FileReader();
        reader.onload = function (ev) {
            let urls = exmage_parse_csv(ev.target.result);
            if (urls.length === 0) {
                exmage_set_csv_error(true, (typeof exmage_admin_params !== 'undefined' && exmage_admin_params.i18n_csv_no_valid_urls) ? exmage_admin_params.i18n_csv_no_valid_urls : 'This CSV file does not contain any valid image or video URLs (http or https).');
            } else {
                exmage_set_csv_error(false);
            }
            let textarea_urls = exmage_parse_urls($('#exmage-multiple-urls').val());
            let all_urls = [...new Set([...textarea_urls, ...urls])];
            exmage_render_preview(all_urls);
        };
        reader.onerror = function () {
            exmage_set_csv_error(true, (typeof exmage_admin_params !== 'undefined' && exmage_admin_params.i18n_csv_read_error) ? exmage_admin_params.i18n_csv_read_error : 'Could not read the CSV file.');
        };
        reader.readAsText(file);
    });

    $(document).on('dragover dragenter', '#exmage-csv-dropzone', function (e) {
        e.preventDefault();
        $(this).addClass('dragover');
    });
    $(document).on('dragleave dragend', '#exmage-csv-dropzone', function (e) {
        e.preventDefault();
        $(this).removeClass('dragover');
    });
    $(document).on('drop', '#exmage-csv-dropzone', function (e) {
        e.preventDefault();
        $(this).removeClass('dragover');
        let file = e.originalEvent.dataTransfer.files[0];
        if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
            $('#exmage-csv-file-input')[0].files = e.originalEvent.dataTransfer.files;
            $('#exmage-csv-file-input').trigger('change');
        }
    });

    $(document).on('click', '#exmage-csv-dropzone', function (e) {
        if ($(e.target).closest('label[for="exmage-csv-file-input"]').length) {
            return;
        }
        let input = document.getElementById('exmage-csv-file-input');
        if (input) {
            input.click();
        }
    });

    // Preview interactions
    $(document).on('change', '#exmage-url-preview-list input[type="checkbox"]', function () {
        let $item = $(this).closest('.exmage-preview-item');
        if ($(this).prop('checked')) {
            $item.removeClass('exmage-preview-item-unchecked');
        } else {
            $item.addClass('exmage-preview-item-unchecked');
        }
        exmage_update_count();
    });

    // Check All
    $(document).on('click', '#exmage-check-all', function () {
        $('#exmage-url-preview-list input').prop('checked', true);
        $('#exmage-url-preview-list .exmage-preview-item').removeClass('exmage-preview-item-unchecked');
        exmage_update_count();
    });

    // Uncheck All
    $(document).on('click', '#exmage-uncheck-all', function () {
        $('#exmage-url-preview-list input').prop('checked', false);
        $('#exmage-url-preview-list .exmage-preview-item').addClass('exmage-preview-item-unchecked');
        exmage_update_count();
    });

    // Clear preview
    $(document).on('click', '#exmage-clear-preview', function () {
        $('#exmage-multiple-urls').val('');
        $('#exmage-csv-file-input').val('');
        $('#exmage-csv-filename').text('');
        exmage_set_csv_error(false);
        exmage_render_preview([]);
    });

    // Add All to Gallery - main submit
    $(document).on('click', '#exmage-add-multiple-btn', function () {
        let $btn = $(this);
        if ($btn.prop('disabled') || $btn.hasClass('exmage-button-loading')) return;

        // Collect checked URLs from preview
        let urls = [];
        $('#exmage-url-preview-list input:checked').each(function () {
            urls.push($(this).data('url'));
        });

        if (urls.length === 0) return;

        $btn.addClass('exmage-button-loading').prop('disabled', true);

        $.ajax({
            url: exmage_admin_params.ajaxurl,
            type: 'POST',
            data: {
                action: 'exmage_handle_url',
                urls: urls.join(','),
                post_id: exmage_admin_params.post_id,
                _exmage_ajax_nonce: exmage_admin_params._exmage_ajax_nonce,
                is_single: '',
            },
            success(response) {
                let $message = $('.exmage-use-url-message');
                if (response.status === 'success') {
                    let message = '';
                    for (let i in response.details) {
                        if (response.details[i].status === 'success') {
                            message += `<li class="exmage-message-success"><span class="exmage-result-url">${exmage_esc_html(response.details[i].url)} =></span><span class="exmage-use-url-message-content">${response.details[i].message}</span>, ID: <a target="_blank" href="${response.details[i].edit_link}">${response.details[i].id}</a></li>`;
                        } else {
                            message += `<li class="exmage-message-error"><span class="exmage-result-url">${exmage_esc_html(response.details[i].url)} =></span><span class="exmage-use-url-message-content">${response.details[i].message}</span></li>`;
                        }
                    }
                    message = `<ol>${message}</ol>`;
                    $message.html(message);

                    // Clear preview after success
                    $('#exmage-multiple-urls').val('');
                    $('#exmage-csv-file-input').val('');
                    $('#exmage-csv-filename').text('');
                    exmage_set_csv_error(false);
                    exmage_render_preview([]);

                    // Add to media frame selection
                    if (wp.media && wp.media.frame) {
                        let active_frame = wp.media.frame;
                        let selection = active_frame.state().get('selection');
                        if ('upload' === active_frame.content.mode()) {
                            active_frame.content.mode('browse');
                        }
                        for (let i in response.details) {
                            if (response.details[i].status === 'success' && response.details[i].id) {
                                if (selection) {
                                    selection.add(wp.media.attachment(response.details[i].id));
                                }
                            }
                        }
                        if (active_frame.content.get() && active_frame.content.get().collection) {
                            active_frame.content.get().collection._requery(true);
                        }
                        active_frame.trigger('library:selection:add');
                    }
                } else if (response.status === 'queue') {
                    $message.html('<p class="exmage-message-queue"><span class="exmage-use-url-message-content">' + response.message + '</span></p>');
                } else {
                    $message.html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">' + (response.message || 'An error occurred') + '</span></p>');
                }
            },
            error() {
                $('.exmage-use-url-message').html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">An error occurred.</span></p>');
            },
            complete() {
                $btn.removeClass('exmage-button-loading').prop('disabled', false);
            }
        });
    });
});
function data_preprocessing($input) {
    let $container = $input.closest('.exmage-container-form'),
        tab_content = $container.find('.exmage-wrap-tab-content'),
        tab_content_list = tab_content.find('.exmage-tab-content-item');

    let arr_url = [];

    let tr = tab_content_list.find('.exmage-wrap-body-table .exmage-table-tr');
    tr.each(function (i, e) {
        let tr_this = jQuery(this);
        let field_url = tr_this.find('.exmage-add-external-url-field');
        if (field_url.val()) {
            arr_url.push(field_url.val());
        }

    });

    jQuery('.exmage-use-url-input-multiple').val(arr_url.toString());


}
function exmage_handle_url_input($input, $type) {
    let $container = $input.closest('.exmage-container-form'),
        $overlay = $container.find('.exmage-use-url-input-overlay'),
        $message = $container.find('.exmage-use-url-message');
    if ($overlay.hasClass('exmage-hidden')) {
        $message.html('');
        setTimeout(function () {
            let urls = $input.val();
            let is_url_valid = false, is_single = $input.is('input');
            try {
                if (is_single) {
                    let url_obj = new URL(urls);
                    if (url_obj.protocol === 'https:' || url_obj.protocol === 'http:') {
                        is_url_valid = true;
                    } else {
                        $message.html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">Please enter a valid image URL</span></p>');
                    }
                } else {
                    if (urls) {
                        is_url_valid = true;
                    } else {
                        $message.html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">Please enter at least a valid image URL to continue</span></p>');
                        return;
                    }
                }
            } catch (e) {
                $overlay.addClass('exmage-hidden');
                $message.html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">Please enter a valid image URL</span></p>');
                return;
            }
            if (is_url_valid) {
                $overlay.removeClass('exmage-hidden');
                jQuery.ajax({
                    url: exmage_admin_params.ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'exmage_handle_url',
                        urls: urls,
                        post_id: exmage_admin_params.post_id,
                        _exmage_ajax_nonce: exmage_admin_params._exmage_ajax_nonce,
                        is_single: is_single ? 1 : '',
                    },
                    success(response) {
                        let active_frame = wp.media ? wp.media.frame : '';
                        if (response.status === 'success') {
                            let details = response.details, message = '';
                            for (let i in details) {
                                if (details[i].status === 'success') {
                                    if (is_single) {
                                        message += `<p class="exmage-message-${details[i].status}"><span class="exmage-use-url-message-content">${details[i].message}</span>, ID: <a target="_blank" href="${details[i].edit_link}">${details[i].id}</a></p>`;
                                    } else {
                                        message += `<li class="exmage-message-${details[i].status}"><span class="exmage-result-url">${details[i].url} =><span class="exmage-use-url-message-content">${details[i].message}</span>, ID: <a target="_blank" href="${details[i].edit_link}">${details[i].id}</a></li>`;
                                    }
                                    if (active_frame) {
                                        let _state = active_frame.content.view._state;
                                        let selection = active_frame.state().get('selection');

                                        if ('upload' === active_frame.content.mode()) {
                                            active_frame.content.mode('browse');
                                        }
                                        if (_state === 'library' || _state === 'edit-attachment') {
                                            if (selection) {
                                                selection.reset();
                                                selection.add(wp.media.attachment(details[i].id));
                                            }
                                            if (active_frame.content.get() && active_frame.content.get().collection) {
                                                active_frame.content.get().collection._requery(true);
                                            }
                                            active_frame.trigger('library:selection:add');
                                        } else {
                                            if (selection) {
                                                selection.reset();
                                                selection.add(wp.media.attachment(details[i].id));
                                            }
                                            wp.media.attachment(details[i].id).fetch();
                                        }
                                    }
                                } else {
                                    if (details[i].id) {
                                        let item_message = `<span class="exmage-use-url-message-content">${details[i].message}</span>, ID: <a target="_blank" href="${details[i].edit_link}">${details[i].id}</a>`;
                                        if (active_frame && active_frame.content.get() && active_frame.content.get().collection) {
                                            item_message = `${item_message}. <span class="exmage-select-existing-image" data-attachment_id="${details[i].id}">${exmage_admin_params.i18n_select_existing_image}</span>.`;
                                        }
                                        if (is_single) {
                                            message += `<p class="exmage-message-${details[i].status}">${item_message}</p>`;
                                        } else {
                                            message += `<li class="exmage-message-${details[i].status}"><span class="exmage-result-url">${details[i].url} =>${item_message}</li>`;
                                        }
                                    } else {
                                        if (is_single) {
                                            message += `<p class="exmage-message-${details[i].status}"><span class="exmage-use-url-message-content">${details[i].message}</span></p>`;
                                        } else {
                                            message += `<li class="exmage-message-${details[i].status}"><span class="exmage-result-url">${details[i].url} =><span class="exmage-use-url-message-content">${details[i].message}</span></li>`;
                                        }
                                    }
                                }
                            }
                            if (!is_single) {
                                message = `<ol>${message}</ol>`;
                            }
                            $message.html(message);
                        } else if (response.status === 'queue') {
                            $message.html('<p class="exmage-message-queue"><span class="exmage-use-url-message-content">' + response.message + '</span></p>');
                        } else {
                            $message.html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">' + response.message + '</span></p>');
                        }
                    },
                    error() {
                        $message.html('<p class="exmage-message-error"><span class="exmage-use-url-message-content">An error occurs.</span></p>');
                    },
                    complete(jqXHR, textStatus) {
                        $overlay.addClass('exmage-hidden');

                        let responseJSON = jqXHR.responseJSON ?? {};
                        if (responseJSON.details && responseJSON.details.length) {
                            let details = responseJSON.details;
                            if (details.length) {
                                let details_item = details[0];
                                if (typeof details_item.type !== 'undefined') {
                                    jQuery('.exmage-add-external-url-field.exmage-add-external-url-media').val('');
                                } else {
                                    jQuery('.exmage-add-external-url-field').val('');
                                }
                            }
                        }
                    }
                });
            }
        }, 1);
    }
}
function isImageURL(url) {

    var imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)(\?.*)?$/i;


    var imageDomains = [
        /(?:https?:\/\/)?(?:.+\.)?imgur\.com\/.+/,
        /(?:https?:\/\/)?(?:.+\.)?gyazo\.com\/.+/,
        /(?:https?:\/\/)?(?:.+\.)?prnt\.sc\/.+/,
        /(?:https?:\/\/)?drive\.google\.com\/uc\?id=.+/,
        /(?:https?:\/\/)?images\.unsplash\.com\/.+/,
        /(?:https?:\/\/)?cdn\.discordapp\.com\/attachments\/.+/,
        /(?:https?:\/\/)?somecdn\.net\/photo\?id=.+/
    ];


    if (imageExtensions.test(url)) {
        return true;
    }

    for (var i = 0; i < imageDomains.length; i++) {
        if (imageDomains[i].test(url)) {
            return true;
        }
    }

    return false;
}