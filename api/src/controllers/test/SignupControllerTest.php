<?php declare(strict_types=1);

namespace RedFireFarm\CsaPlugin\Api\Controllers\Test;

use PHPUnit\Framework\TestCase;
use RedFireFarm\CsaPlugin\Api\Controllers\SignupController;

final class SignupControllerTest extends TestCase
{
    public function testRouteRegistrationHappensOnApiInit(): void {
        // mock out add_action
//        $mock_add_action = ...;
        $signupController = new SignupController();

        $this->assertEquals('/signup', $signupController->routeName());
    }
    public function testRegistersCreateHandler(): void
    {
        $controller = new SignupController();
        $controller->register_routes();

        // assert that when we call register_routes, the handler is registered.

        // Function to register our new routes from the controller.
        function prefix_register_my_rest_routes() {
        }

        add_action( 'rest_api_init', 'prefix_register_my_rest_routes' );
    }

    public function testCreateHandlerAuthIsPublic(): void
    {
    }

    public function testCreateHandlerRequiresCaptcha(): void
    {
    }

    public function testRegistersListHandler(): void
    {
    }

    public function testListHandlerAuthRequiresAdmin(): void
    {
    }
}