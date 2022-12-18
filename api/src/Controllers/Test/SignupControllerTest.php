<?php declare(strict_types=1);

namespace RedFireFarm\CsaPlugin\Api\Controllers\Test;

use PHPUnit\Framework\TestCase;
use RedFireFarm\CsaPlugin\Api\Controllers\SignupController;
use RedFireFarm\CsaPlugin\Api\Services\Config;

final class SignupControllerTest extends TestCase
{
    public static $functions;

    public function setUp(): void
    {
//        self::$functions = $this->createPartialMock(
//            SignupController::class, []
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
        $controller = $this->getMockBuilder(SignupController::class)
            ->onlyMethods(['registerAuthenticatedRoute'])
            ->setConstructorArgs([new Config()])
            ->getMock();
        $controller->expects($this->once())->method('registerAuthenticatedRoute');
        $controller->registerRoutes();
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
//
//    public function add_action(...$params): void {
//
//    }
}

function add_action(...$params)
{
}