<?php

namespace RedFireFarm\CsaPlugin\Api\Container\Test;

use PHPUnit\Framework\TestCase;
use RedFireFarm\CsaPlugin\Api\Container\CsaContainer;
use RedFireFarm\CsaPlugin\Api\Services\Config;

class CsaContainerTest extends TestCase
{
    public function testRegistersClassDependencies()
    {
        $container = new CsaContainer();
        $container->register(Config::class, Config::class);
        $configClass = $container->get(Config::class);
        $config = $configClass->getConfig();
        $this->assertIsArray($config);
    }

    public function testRegistersFunctionDependencies()
    {
        $this->assertTrue(!true);
    }

    public function testGetsServices()
    {
        $this->assertTrue(!true);
    }

    public function testHasService()
    {
        $this->assertTrue(!true);
    }

    public function testGetService()
    {
        $this->assertTrue(!true);
    }
}