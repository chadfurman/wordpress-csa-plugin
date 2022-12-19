<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers;

use RedFireFarm\CsaPlugin\Api\Services\ConfigInterface;
use function register_rest_route;

/**
 * Class BaseController
 *
 * The base class for all API controllers.
 *
 * Provides convenience methods for standardized route registration.
 * Provides an interface for route registration and custom post type registration
 *
 * @package RedFireFarm\CsaPlugin\Api\Controllers
 */
abstract class BaseController
{
    private array $config;
    private string $namespace;

    public function __construct(ConfigInterface $config)
    {
        $this->config = $config->getConfig();
        $route_prefix = $this->config['route_prefix'];
        $this->namespace = $route_prefix . '/v1/';
        $this->register_rest_routes();
        $this->register_post_types();
    }

    /**
     * Function to call when setting up the api controller to register the REST routes
     * @return void
     */
    abstract function register_rest_routes(): void;

    /**
     * Function to call when setting up the api controller to register the WordPress Custom Post Types
     * @return void
     */
    abstract function register_post_types(): void;

    /**
     * @param string $resource_name the pluralized url-safe name of the resource you're using.  Translates to the sub-path of the URL.  Use "my-items" instead of My Items.
     * @param string $http_verb the HTTP verb (e.g. GET, POST, DELETE, etc)
     * @param callable $route_handler the callback that will handle the request
     * @param callable $schema_handler the schema for the resource in question
     * @param callable $permissions_check_handler the authentication handler for this route
     * @param bool $is_singular whether the route is singular or not.  For example, if you have a route like "/posts/:post_id" then is_singular should be true, or "/posts" then is_singular should be false.  Default false.
     * @param bool $is_uuid whether the route is using UUID or not.  Default true
     * @return void
     */
    public function register_authenticated_route(
        string   $resource_name,
        string   $http_verb,
        callable $route_handler,
        callable $schema_handler,
        callable $permissions_check_handler,
        bool     $is_singular = false,
        bool     $is_uuid = true,
    ): void
    {
        $route = $this->get_route($resource_name, $is_singular, $is_uuid);
        register_rest_route($this->namespace, $route, array(
            array(
                'methods' => $http_verb,
                'callback' => $route_handler,
                'permission_callback' => $permissions_check_handler,
            ),
            'schema' => $schema_handler,
        ));
    }

    /**
     * @param string $resource_name base of the route name
     * @param bool $is_singular whether the route is singular or not.  For example, if you have a route like "/posts/:post_id" then is_singular should be true, or "/posts" then is_singular should be false.  Default false.
     * @param bool $is_uuid whether the route is using UUID or not.  Default true
     * @return string
     */
    public function get_route(string $resource_name, bool $is_singular, bool $is_uuid): string
    {
        if ($is_singular && $is_uuid) {
            $route = $resource_name . '/(?P<id>^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$)';
        } else if ($is_singular) {
            $route = $resource_name . '/(?P<id>[\d]+)';
        } else {
            $route = $resource_name;
        }
        return $route;
    }

    /**
     * @param string $resource_name the pluralized url-safe name of the resource you're using.  Translates to the sub-path of the URL.  Use "my-items" instead of My Items.
     * @param string $http_verb the HTTP verb (e.g. GET, POST, DELETE, etc)
     * @param callable $route_handler the callback that will handle the request
     * @param callable $schema_handler the schema for the resource in question
     * @param bool $is_singular whether the route is singular or not.  For example, if you have a route like "/posts/:post_id" then is_singular should be true, or "/posts" then is_singular should be false.  Default false.
     * @param bool $is_uuid whether the route is using UUID or not.  Default true
     * @return void
     */
    public function register_public_route(
        string   $resource_name,
        string   $http_verb,
        callable $route_handler,
        callable $schema_handler,
        bool     $is_singular = false,
        bool     $is_uuid = true,
    ): void
    {
        $route = $this->get_route($resource_name, $is_singular, $is_uuid);
        register_rest_route($this->namespace, $route, array(
            array(
                'methods' => $http_verb,
                'callback' => $route_handler,
            ),
            'schema' => $schema_handler,
        ));
    }
}
