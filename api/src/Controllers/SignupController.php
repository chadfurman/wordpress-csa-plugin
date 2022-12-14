<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers;

use RedFireFarm\CsaPlugin\Api\Services\Config;

class SignupController
{
    private Config $config;
    private string $namespace;
    private string $resource_name;

    public function __construct(Config $config)
    {
        $this->config = $config;
        $route_prefix = $this->config['route_prefix'];
        $this->namespace = $route_prefix . '/v1';
        $this->resource_name = 'signups';
    }
}