<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers;

use RedFireFarm\CsaPlugin\Api\Services\ConfigInterface;
use function register_rest_route;

abstract class BaseController
{
    private array $config;
    private string $namespace;
    private string $resource_name;

    public function __construct(ConfigInterface $config)
    {
        $this->config = $config->getConfig();
        $route_prefix = $this->config['route_prefix'];
        $this->namespace = $route_prefix . '/v1/';
        $this->register_rest_routes();
        $this->register_post_types();
    }

    abstract function register_rest_routes();

    abstract function register_post_types();

    /**
     * @param string $resource_name the url-safe name of the resource you're using.  Translates to the sub-path of the URL.  Use "my-resource" instead of My Resource
     * @param string $http_verb
     * @param callable $route_handler
     * @param callable $schema_handler
     * @param callable $permissions_check_handler
     * @return void
     */
    public function register_authenticated_route(
        string   $resource_name,
        string   $http_verb,
        callable $route_handler,
        callable $schema_handler,
        callable $permissions_check_handler
    ): void
    {
        register_rest_route($this->namespace, $resource_name, array(
            array(
                'methods' => $http_verb,
                'callback' => $route_handler,
                'permission_callback' => $permissions_check_handler,
            ),
            'schema' => $schema_handler,
        ));
    }

    public function register_public_route(
        string   $resource_name,
        string   $http_verb,
        callable $route_handler,
        callable $schema_handler,
    ): void
    {
        register_rest_route($this->namespace, $resource_name, array(
            array(
                'methods' => $http_verb,
                'callback' => $route_handler,
            ),
            'schema' => $schema_handler,
        ));
    }
}
