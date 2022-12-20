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
        $this->register_get_item_route();
        $this->register_get_items_route();
        $this->register_update_route();
        $this->register_delete_route();
    }

    public function register_create_route(): void
    {
        $http_verb = "POST";
        $route_handler = [$this, "create"];
        $schema_handler = [$this, "schema"];
        $this->register_public_route(
            resource_name: $this->resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
        );
    }

    public function register_get_item_route(): void
    {
        $http_verb = "GET";
        $route_handler = [$this, "get_item"];
        $schema_handler = [$this, "schema"];
        $permissions_check_handler = [$this, "get_item_auth"];
        $this->register_authenticated_route(
            resource_name: $this->resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
            auth_handler: $permissions_check_handler,
            is_singular: self::SINGULAR,
        );
    }

    public function register_get_items_route(): void
    {
        $http_verb = "GET";
        $route_handler = [$this, "get_items"];
        $schema_handler = [$this, "schema"];
        $permissions_check_handler = [$this, "get_items_auth"];
        $this->register_authenticated_route(
            resource_name: $this->resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
            auth_handler: $permissions_check_handler
        );
    }

    public function register_update_route(): void
    {
        $http_verb = "PATCH";
        $route_handler = [$this, "update"];
        $schema_handler = [$this, "schema"];
        $permissions_check_handler = [$this, "update_auth"];
        $this->register_authenticated_route(
            resource_name: $this->resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
            auth_handler: $permissions_check_handler,
            is_singular: self::SINGULAR,
        );
    }

    public function register_delete_route(): void
    {
        $http_verb = "DELETE";
        $route_handler = [$this, "delete"];
        $schema_handler = [$this, "schema"];
        $permissions_check_handler = [$this, "delete_auth"];
        $this->register_authenticated_route(
            resource_name: $this->resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
            auth_handler: $permissions_check_handler,
            is_singular: self::SINGULAR,
        );
    }

    public function create(): void
    {

    }

    public function get_item(): void
    {

    }

    public function get_items(): void
    {

    }

    public function get_item_auth(): void
    {

    }

    public function get_items_auth(): void
    {

    }

    public function update(): void
    {

    }

    public function update_auth(): void
    {

    }

    public function delete(): void
    {

    }

    public function delete_auth(): void
    {

    }

    public function schema(): void
    {

    }
}