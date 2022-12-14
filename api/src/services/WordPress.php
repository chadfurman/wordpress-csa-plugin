<?php

namespace RedFireFarm\CsaPlugin\Api\Services;

class WordPress {
    public function init(array $callable): void {
        add_action('init', $callable);
    }
    public function register_api_resource(array $resource): void {
        add_action('rest_api_init', $resource);
    }
}