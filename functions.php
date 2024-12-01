<?php
// Filter Functions with Hooks

function custom_mce_button() {

	// Check if user have permission
  
	if ( !current_user_can( 'edit_posts' )&& !current_user_can( 'edit_pages' ) ) {
  
	  return;
  
	}
	
//   // Check if WYSIWYG is enabled
add_action('admin_head', 'custom_mce_button');
if ( 'true' == get_user_option( 'rich_editing' ) ) {

    add_filter( 'mce_external_plugins', 'custom_tinymce_plugin' );

    add_filter( 'mce_buttons_3', 'register_mce_button' );

   }

  }

    add_action('admin_head', 'custom_mce_button');

function custom_tinymce_plugin( $plugin_array ) {
	$plugin_array['custom_mce_button_icon'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';

	$plugin_array['custom_mce_button'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';
  
	$plugin_array['custom_mce_button_form'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';
  
	$plugin_array['custom_mce_button_list'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';
  
	$plugin_array['custom_mce_button_template'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';

	$plugin_array['custom_mce_button_templateHeader'] = get_template_directory_uri() .'/js/customtinymcefeatures.js'; 
  
	$plugin_array['custom_mce_button_formats'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';
  
	$plugin_array['custom_mce_button_short'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';
  
	$plugin_array['custom_formats'] = get_template_directory_uri() .'/js/customtinymcefeatures.js';
  
	return $plugin_array;
}

 function register_mce_button( $buttons ) {

   array_push( $buttons, 'custom_mce_button' );
    array_push( $buttons, 'custom_mce_button_icon' );
    array_push( $buttons, 'custom_mce_button_form' );
    array_push( $buttons, 'custom_mce_button_list' );
	array_push( $buttons, 'custom_mce_button_templateHeader' );
	array_push( $buttons, 'custom_formats' );
	array_push( $buttons, 'custom_mce_button_template' );
	array_push( $buttons, 'custom_mce_button_formats' );
	array_push( $buttons, 'custom_mce_button_short' );


  return $buttons;

}





//* TINYMCE ICON BUTTON //

function custom_css_mce_button() {

	       wp_enqueue_style('symple_shortcodes-tc',get_template_directory_uri('/css/tinymce_custom.css?v=44', __FILE__));
}

add_action('admin_enqueue_scripts', 'custom_css_mce_button');
?>