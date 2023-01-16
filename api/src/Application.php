<?php
namespace RedFireFarm\CsaPlugin\Api;
use RedFireFarm\CsaPlugin\Api\Container\CsaContainer;

require_once __DIR__ . '/../../vendor/autoload.php';

#test

class Application extends CsaContainer
{
    public function run(): void
    {
        add_action('init', array($this, 'register_api_resources'));
    }

    public function register_api_resources()
    {
        add_action('rest_api_init', array($this, 'register_signup_resource'));
        add_action('rest_api_init', array($this, 'register_pickup_location_resource'));
        add_action('rest_api_init', array($this, 'register_share_option_resource'));
        add_action('rest_api_init', array($this, 'register_addon_share_option_resource'));
        add_action('rest_api_init', array($this, 'register_payment_option_resource'));
        add_action('rest_api_init', array($this, 'register_hear_about_us_question_resource'));
        add_action('rest_api_init', array($this, 'register_bundle_resource'));
        add_action('rest_api_init', array($this, 'register_bundle_option_resource'));
        add_action('rest_api_init', array($this, 'register_payment_method_resource'));
        add_action('rest_api_init', array($this, 'register_region_resource'));
        add_action('rest_api_init', array($this, 'register_season_resource'));
        add_action('rest_api_init', array($this, 'register_addon_share_option_resource'));
    }

    public function register_signup_resource(): void {

    }

    public function register_pickup_location_resource(): void {
        register_post_type(
            'rffcsa_pickup_location',
            array(
                'labels' => array(
                    'name' => __('RFFCSA Pickup Locations', 'textdomain'),
                    'singular_name' => __('RFFCSA Pickup Location', 'textdomain'),
                ),
                'description' => 'A RFFCSA Pickup location.  Examples include Granby Farm Store, Northampton Farmers\' Market, etc.  Not all locations are available at all times.'
            )
        );
    }

    public function register_share_option_resource(): void {
        register_post_type(
            'rffcsa_share_option',
            array(
                'labels' => array(
                    'name' => __('RFFCSA Share Options', 'textdomain'),
                    'singular_name' => __('RFFCSA Share Option', 'textdomain'),
                ),
                'public' => true,
                'show_in_rest' => true,
                'description' => 'A RFFCSA Share Option.  Examples include Regular, Small, Fruit, Mushroom, etc.'
            )
        );
    }

    public function register_addon_share_option_resource(): void {

    }

    public function register_payment_option_resource(): void {

    }

    public function register_hear_about_us_question_resource(): void {

    }

    public function register_bundle_resource(): void {

    }

    public function register_bundle_option_resource(): void {

    }

    public function register_payment_method_resource(): void {

    }

    public function register_region_resource(): void {

    }

    public function register_season_resource(): void {

    }
}