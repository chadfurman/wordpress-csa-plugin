<?php

namespace RedFireFarm\CsaPlugin\Api\Services\Test;

use PHPUnit\Framework\TestCase;
use RedFireFarm\CsaPlugin\Api\Services\Config;

class ConfigServiceTest extends TestCase
{
    function testGetConfigReturnsConfigArray(): void
    {
        $this->assertIsArray(Config::getConfig());
    }
}