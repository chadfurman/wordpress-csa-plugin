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
//    public function testRouteRegistrationHappensOnApiInit(): void
//    {
//        // mock out add_action
////        $mock_add_action = ...;
//        $signupController = new SignupController();
//
//        $this->assertEquals('/signup', $signupController->routeName());
//    }
//
    public function testRegistersCreateHandler(): void
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
//        $controller = new SignupController();
//        $controller->registerRoutes();
//
//        // assert that when we call register_routes, the handler is registered.
//
//        // Function to register our new routes from the controller.
//        function prefix_register_my_rest_routes()
//        {
//        }
//
//        add_action('rest_api_init', 'prefix_register_my_rest_routes');
//    }
//
//    public function testCreateHandlerAuthIsPublic(): void
//    {
//        $this->assertTrue(!true);
//    }
//
//    public function testCreateHandlerRequiresCaptcha(): void
//    {
//        $this->assertTrue(!true);
//    }
//
//    public function testRegistersListHandler(): void
//    {
//        $this->assertTrue(!true);
//    }
//
//    public function testListHandlerAuthRequiresAdmin(): void
//    {
//        $this->assertTrue(!true);
//    }
}