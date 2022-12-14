<?php
namespace RedFireFarm\CsaPlugin\Api\Services;

class Config {
    /**
     * Returns a simple config array
     *
     * @return array
     */
    public static function getConfig(): array
    {
        $config = array();

        $config['route_prefix'] = 'rff-csa-plugin';

        return $config;
    }
}
