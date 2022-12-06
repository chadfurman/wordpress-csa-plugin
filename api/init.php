<?php

add_action('init', 'rffcsa_register_post_types');
function rffcsa_register_post_types()
{

    register_post_type(
        'csa_signup',
        array(
            'labels' => array(
                'name' => __('CSA Signups', 'textdomain'),
                'singular_name' => __('CSA Signup', 'textdomain'),
            ),
            'public' => true,
            'show_in_rest' => true,
            'description' => 'A CSA Signup.  A user submitted the CSA Signup Form and this is what we logged.'
        )
    );

    register_post_type(
        'pickup_location',
        array(
            'labels' => array(
                'name' => __('CSA Pickup Locations', 'textdomain'),
                'singular_name' => __('CSA Pickup Location', 'textdomain'),
            ),
            'description' => 'A CSA Pickup location.  Examples include Granby Farm Store, Northampton Farmers\' Market, etc.  Not all locations are available at all times.'
        )
    );

    register_post_type(
        'share_option',
        array(
            'labels' => array(
                'name' => __('CSA Share Options', 'textdomain'),
                'singular_name' => __('CSA Share Option', 'textdomain'),
            ),
            'public' => true,
            'show_in_rest' => true,
            'description' => 'A CSA Share Option.  Examples include Regular, Small, Fruit, Mushroom, etc.'
        )
    );
}
