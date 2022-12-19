<?php declare(strict_types=1);

namespace RedFireFarm\CsaPlugin\Api\Controllers\Test;

use RedFireFarm\CsaPlugin\Api\Controllers\SignupController;
use RedFireFarm\CsaPlugin\Api\Services\Config;
use WP_Mock;
use WP_Mock\Tools\TestCase;

final class SignupControllerTest extends TestCase
{
    public static $functions;

    public function setUp(): void
    {
        WP_Mock::setUp();
    }

    public function tearDown(): void
    {
        WP_Mock::tearDown();
    }

    public function testRegisterCreate(): void
    {
        WP_Mock::userFunction('register_rest_route');
        WP_Mock::userFunction('register_post_type');
        $controller = $this->getMockBuilder(SignupController::class)
            ->onlyMethods(['register_public_route'])
            ->setConstructorArgs([new Config()])
            ->getMock();
        $controller->expects($this->once())->method('register_public_route');
        $controller->register_create_route();
    }

    public function testCreateWithCaptcha(): void
    {
        $this->assertTrue(!true);
    }

    public function testCreateWithoutCaptcha(): void
    {
        $this->assertTrue(!true);
    }

    public function testRegistersGetItem(): void
    {
        $this->assertTrue(!true);
    }

    public function testGetItem(): void
    {
        $this->assertTrue(!true);
    }

    public function testGetItemAuthCheck(): void
    {
        $this->assertTrue(!true);
    }

    public function testRegistersGetItems(): void
    {
        $this->assertTrue(!true);
    }

    public function testGetItems(): void
    {
        $this->assertTrue(!true);
    }

    public function testGetItemsAuthCheck(): void
    {
        $this->assertTrue(!true);
    }

    public function testRegistersUpdateItem(): void
    {
        $this->assertTrue(!true);
    }

    public function testUpdateItem(): void
    {
        $this->assertTrue(!true);
    }

    public function testUpdateItemAuthCheck(): void
    {
        $this->assertTrue(!true);
    }

    public function testRegistersDeleteItem(): void
    {
        $this->assertTrue(!true);
    }

    public function testDeleteItem(): void
    {
        $this->assertTrue(!true);
    }

    public function testDeleteItemAuthCheck(): void
    {
        $this->assertTrue(!true);
    }
}