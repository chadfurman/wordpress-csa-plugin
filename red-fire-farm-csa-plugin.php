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
