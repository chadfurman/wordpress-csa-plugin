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
    wp_enqueue_style( 'rffcsa-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
    wp_enqueue_script( 'rffcsa-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
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
            'show_in_rest' => true,
            'description' => 'A CSA Share Option.  Examples include Regular, Small, Fruit, Mushroom, etc.'
        )
    );
}

function rffcsa_create_block_signup_button() {
    register_block_type( __DIR__ . '/build/blocks/signup-button' );
}
add_action( 'init', 'rffcsa_create_block_signup_button' );

add_shortcode( 'rffcsa_signup_page', 'rffcsa_csa_signup_page_shortcode' );

function rffcsa_csa_signup_page_shortcode() {
    return '<div id="rffcsa"></div>';
}

add_action( 'wp_enqueue_scripts', 'enqueue_my_app' );

function enqueue_my_app() {
    global $post;

    if ( has_shortcode( $post->post_content, 'rffcsa_signup_page' ) ) {
        $build_directory     = __DIR__ . '/build/shortcodes/csa-signup-shortcode';
        $build_directory_uri = plugin_dir_url( __FILE__ ) . 'build/shortcodes/csa-signup-shortcode/';

//        wp_enqueue_style( 'app_styles', $build_directory_uri . 'csa-signup-shortcode.css', [], '1.0.0' );
        wp_enqueue_script( 'app_script', $build_directory_uri . 'csa-signup-shortcode.js', [], '1.0.0', true );
    }
}