<?php

namespace RedFireFarm\CsaPlugin\Api\Services;

class Config implements ConfigInterface
{
    /**
     * Returns a simple config array
     *
     * @return array
     */
    public function getConfig(): array
    {
        $config = array();

        $config['route_prefix'] = 'rff-csa-plugin/v1/';

        return $config;
    }
}
