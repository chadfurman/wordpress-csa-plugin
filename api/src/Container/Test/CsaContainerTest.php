<?php

namespace RedFireFarm\CsaPlugin\Api\Container\Test;

use PHPUnit\Framework\TestCase;
use RedFireFarm\CsaPlugin\Api\Container\CsaContainer;
use RedFireFarm\CsaPlugin\Api\Services\Config;

class CsaContainerTest extends TestCase
{
    public function setUp(): void
    {
        $this->container = new CsaContainer();
        $this->container->register(Config::class, Config::class);
    }

    public function tearDown(): void
    {
        unset($this->container);
    }

    public function testRegistersFunctionDependencies()
    {
        $testStr = "purple";
        $this->container->register('someFunction', function () use ($testStr) {
            return $testStr;
        });
        $this->assertEquals($testStr, $this->container->get('someFunction'));
    }

    public function testGetsServices()
    {
        $services = $this->container->getServices();
        $this->assertIsArray($services);
        $this->assertNotEmpty($services);
    }

    public function testHasService()
    {
        $this->assertTrue($this->container->has(Config::class));
        $this->assertFalse($this->container->has("someOtherThing"));
    }

    public function testGetService()
    {
        $configClass = $this->container->get(Config::class);
        $config = $configClass->getConfig();
        $this->assertIsArray($config);
    }
}