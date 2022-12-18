<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers;

use function register_post_type;

class SignupController extends BaseController
{
    public string $resource_name = "signup";

    public function register_post_types(): void
    {
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

    public function register_rest_routes(): void
    {
        $this->register_create_route();
        $this->register_retrieve_route();
        $this->register_update_route();
        $this->register_delete_route();
    }

    public function register_create_route(): void
    {
        $http_verb = "GET";
        $route_handler = [$this, "create_handler"](...);
        $schema_handler = [$this, "schema_handler"](...);
        $this->register_public_route(
            $this->resource_name,
            $http_verb,
            $route_handler,
            $schema_handler,
        );
    }

    public function register_retrieve_route(): void
    {
        $http_verb = "GET";
        $route_handler = [$this, "retrieve_handler"](...);
        $schema_handler = [$this, "schema_handler"](...);
        $permissions_check_handler = [$this, "retrieve_auth_handler"](...);
        $this->register_authenticated_route(
            $this->resource_name,
            $http_verb,
            $route_handler,
            $schema_handler,
            $permissions_check_handler
        );
    }

    public function register_update_route(): void
    {
        $http_verb = "GET";
        $route_handler = [$this, "update_handler"](...);
        $schema_handler = [$this, "schema_handler"](...);
        $permissions_check_handler = [$this, "update_auth_handler"](...);
        $this->register_authenticated_route(
            $this->resource_name,
            $http_verb,
            $route_handler,
            $schema_handler,
            $permissions_check_handler
        );
    }

    public function register_delete_route(): void
    {
        $http_verb = "GET";
        $route_handler = [$this, "delete_handler"](...);
        $schema_handler = [$this, "schema_handler"](...);
        $permissions_check_handler = [$this, "delete_auth_handler"](...);
        $this->register_authenticated_route(
            $this->resource_name,
            $http_verb,
            $route_handler,
            $schema_handler,
            $permissions_check_handler
        );
    }

    public function create_handler(): void
    {

    }

    public function retrieve_handler(): void
    {

    }

    public function retrieve_auth_handler(): void
    {

    }

    public function update_handler(): void
    {

    }

    public function update_auth_handler(): void
    {

    }

    public function delete_handler(): void
    {

    }

    public function delete_auth_handler(): void
    {

    }

    public function schema_handler(): void
    {

    }
}