<?php
/**
 * @package RedFireFarm_CSA
 */
/*
Plugin Name: Red Fire Farm CSA Plugin
Description: A plugin for managing the Red Fire Farm CSA
Version: 1.0
Author: Chad Furman
Author URI: https://chadfurman.com
License: ISC
*/

// Fill in location model
// fill in


add_action( 'admin_menu', 'rffcsa_init_menu' );

/**
 * Init Admin Menu.
 *
 * @return void
 */
function rffcsa_init_menu() {
    add_menu_page( __( 'Red Fire Farm CSA', 'rffcsa'), __( 'Red Fire Farm CSA', 'rffcsa'), 'manage_options', 'rffcsa', 'rffcsa_admin_page', 'dashicons-admin-post', '2.1' );
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function rffcsa_admin_page() {
    require_once plugin_dir_path( __FILE__ ) . 'templates/app.php';
}

add_action( 'admin_enqueue_scripts', 'rffcsa_admin_enqueue_scripts' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function rffcsa_admin_enqueue_scripts() {
    wp_enqueue_style( 'rffcsa-style', plugin_dir_url( __FILE__ ) . 'packages/plugin-settings-page/build/index.css' );
    wp_enqueue_script( 'rffcsa-script', plugin_dir_url( __FILE__ ) . 'packages/plugin-settings-page/build/index.js', array( 'wp-element' ), '1.0.0', true );
}

add_action('init', 'rffcsa_register_post_types');
function rffcsa_register_post_types() {
    register_post_type(
        'pickup_location',
        array(
            'labels' => array(
                'name'          => __('CSA Pickup Locations', 'textdomain'),
                'singular_name' => __('CSA Pickup Location', 'textdomain'),
            ),
            'description' => 'A CSA Pickup location.  Examples include Granby Farm Store, Northampton Farmers\' Market, etc.  Not all locations are available at all times.'
        )
    );

    register_post_type(
        'share_option',
        array(
            'labels' => array(
                'name'          => __('CSA Share Options', 'textdomain'),
                'singular_name' => __('CSA Share Option', 'textdomain'),
            ),
            'public' => true,
            'show_in_rest' => true,
            'description' => 'A CSA Share Option.  Examples include Regular, Small, Fruit, Mushroom, etc.'
        )
    );
}
//
function rffcsa_create_block_signup_button() {
    register_block_type( __DIR__ . '/packages/signup-button-block' );
}
add_action( 'init', 'rffcsa_create_block_signup_button' );

add_shortcode( 'csa_signup', 'rffcsa_csa_signup_page_shortcode' );

function rffcsa_csa_signup_page_shortcode() {
    return '<div id="rffcsa">Loading</div>';
}

add_action( 'wp_enqueue_scripts', 'enqueue_my_app' );

function enqueue_my_app() {
    global $post;

    if ( ! has_shortcode( $post->post_content, 'csa_signup' ) ) {
        return false;
    }
    $plugin_app_dir_url = plugin_dir_url( __FILE__ ) . 'packages/csa-signup-shortcode/';
    $react_app_build = $plugin_app_dir_url .'build/';
    $manifest_url = $react_app_build. 'asset-manifest.json';

    // Request manifest file.
    $request = file_get_contents( $manifest_url );

    // If the remote request fails, wp_remote_get() will return a WP_Error, so let’s check if the $request variable is an error:
    if ( ! $request ) {
        return false;
    }

    // Convert json to php array.
    $files_data = json_decode($request);
    if ( $files_data === null ) {
        return false;
    }

    if( ! property_exists($files_data,'entrypoints') ) {
        return false;
    }

    // Get assets links.
    $assets_files = $files_data->entrypoints;

    $js_files = array_filter($assets_files,'rffcsa_filter_js_files');
    $css_files = array_filter($assets_files,'rffcsa_filter_css_files');

    // Load css files.
    foreach ($css_files as $index => $css_file){
        wp_enqueue_style('react-plugin-'.$index, $react_app_build . $css_file);
    }

    // Load js files.
    foreach ($js_files as $index => $js_file){
        wp_enqueue_script('react-plugin-'.$index, $react_app_build . $js_file, array(), 1, true);
    }

    // Variables for app use.
    wp_localize_script('react-plugin-0', 'rffcsaReactPlugin',
        array('appSelector' => '#rffcsa')
    );
}

/**
 * Get js files from assets array.
 *
 * @param array $file_string
 *
 * @return bool
 */
function rffcsa_filter_js_files ($file_string){
    return pathinfo($file_string, PATHINFO_EXTENSION) === 'js';
}

/**
 * Get css files from assets array.
 *
 * @param array $file_string
 *
 * @return bool
 */
function rffcsa_filter_css_files ($file_string) {
    return pathinfo( $file_string, PATHINFO_EXTENSION ) === 'css';
}