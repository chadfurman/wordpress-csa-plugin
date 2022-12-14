<?php

namespace RedFireFarm\CsaPlugin\Api;

use RedFireFarm\CsaPlugin\Api\Container\CsaContainer;


class Application extends CsaContainer {
    public function __construct(Services\WordPress $wp)
    {
        $this->wp = $wp;
    }

    public function run(): void {
        $this->wp->init(array($this, 'register_api_resources'));
    }

    public function register_api_resources()
    {
        $this->wp->register_api_resource(array($this, 'register_signup_resource'));
        $this->wp->register_api_resource(array($this, 'register_pickup_location_resource'));
        $this->wp->register_api_resource(array($this, 'register_share_option_resource'));
        $this->wp->register_api_resource(array($this, 'register_addon_share_option_resource'));
        $this->wp->register_api_resource(array($this, 'register_payment_option_resource'));
        $this->wp->register_api_resource(array($this, 'register_hear_about_us_question_resource'));
        $this->wp->register_api_resource(array($this, 'register_bundle_resource'));
        $this->wp->register_api_resource(array($this, 'register_bundle_option_resource'));
        $this->wp->register_api_resource(array($this, 'register_payment_method_resource'));
        $this->wp->register_api_resource(array($this, 'register_region_resource'));
        $this->wp->register_api_resource(array($this, 'register_season_resource'));
        $this->wp->register_api_resource(array($this, 'register_addon_share_option_resource'));
    }

    public function register_signup_resource(): void {
        register_post_type(
            'rffcas_signup',
            array(
                'labels' => array(
                    'name' => __('RFFCSA Signups', 'textdomain'),
                    'singular_name' => __('RFFCSA Signup', 'textdomain'),
                ),
                'public' => true,
                'show_in_rest' => true,
                'description' => 'A Red Fire Farm CSA Signup.  A user submitted the CSA Signup Form and this is what we logged.'
            )
        );

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