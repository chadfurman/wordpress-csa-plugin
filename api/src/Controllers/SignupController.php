<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers;

use RedFireFarm\CsaPlugin\Api\Container\CsaContainer;
use RedFireFarm\CsaPlugin\Api\Services\ConfigInterface;

class SignupController extends CsaContainer
{
    private array $config;
    private string $namespace;
    private string $resource_name;

    public function __construct(ConfigInterface $config)
    {
        $this->config = $config->getConfig();
        $route_prefix = $this->config['route_prefix'];
        $this->namespace = $route_prefix . '/v1';
        $this->resource_name = 'signups';
    }

    public function registerRoutes(): void
    {
        $this->registerAuthenticatedRoute();
    }

    public function registerAuthenticatedRoute(): void
    {

    }
}