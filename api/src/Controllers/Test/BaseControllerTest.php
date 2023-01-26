<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers\Test;

use RedFireFarm\CsaPlugin\Api\Controllers\BaseController;
use WP_Mock;
use WP_Mock\Tools\TestCase;
use RedFireFarm\CsaPlugin\Api\Services\Config;

class BaseControllerStub extends BaseController {
    function register_rest_routes(): void {}
    function register_post_types(): void {}
}

class BaseControllerTest extends TestCase {
    public function setUp(): void
    {
        $this->base_controller = new BaseControllerStub(new Config());
        WP_Mock::setUp();
    }

    public function tearDown(): void
    {
        WP_Mock::tearDown();
    }

    public function test_register_public_route()
    {
        $resource_name = 'a-public-resource';
        $http_verb = 'POST';
        $route_handler = function () {};
        $schema_handler = function () {};
        $is_singular = BaseController::PLURAL;
        $is_uuid = BaseController::UUID;
        WP_Mock::userFunction('register_rest_route', array(
            'times' => 1,
            'args' => array(
                $this->base_controller->route_prefix,
                $this->base_controller->get_route($resource_name, $is_singular, $is_uuid),
                array(
                   array(
                       'methods' => $http_verb,
                       'callback' => $route_handler,
                   ),
                   'schema' => $schema_handler,
                )
            )
        ));
        $this->base_controller->register_public_route(
            resource_name: $resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
            is_singular: $is_singular,
            is_uuid: $is_uuid
        );
        $this->assertConditionsMet();
    }

    public function test_get_route_plural()
    {
        $resource_name = 'a-public-resource';
        $route = $this->base_controller->get_route(
            resource_name: $resource_name,
            is_singular: BaseController::PLURAL,
            is_uuid: BaseController::UUID
        );
        $this->assertEquals($route, $resource_name, 'Plural routes are the resource name, no ID.');
    }

    public function test_get_route_singular_uuid()
    {
        $resource_name = 'a-public-resource';
        $route = $this->base_controller->get_route(
            resource_name: $resource_name,
            is_singular: BaseController::SINGULAR,
            is_uuid: BaseController::UUID
        );
        $this->assertStringContainsString('(?P<id>^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$)', $route, 'UUID regex should be present.');
    }

    public function test_get_route_singular_not_uuid()
    {
        $resource_name = 'a-public-resource';
        $route = $this->base_controller->get_route(
            resource_name: $resource_name,
            is_singular: BaseController::SINGULAR,
            is_uuid: false
        );
        $this->assertStringContainsString('(?P<id>[\d]+)', $route, 'Regular ID regex should be present.');
    }

    public function test_register_authenticated_route()
    {
        $resource_name = 'a-public-resource';
        $http_verb = 'POST';
        $route_handler = function () {};
        $schema_handler = function () {};
        $auth_handler = function () {};
        $is_singular = BaseController::PLURAL;
        $is_uuid = BaseController::UUID;
        WP_Mock::userFunction('register_rest_route', array(
            'times' => 1,
            'args' => array(
                $this->base_controller->route_prefix,
                $this->base_controller->get_route($resource_name, $is_singular, $is_uuid),
                array(
                    array(
                        'methods' => $http_verb,
                        'callback' => $route_handler,
                        'permission_callback' => $auth_handler,
                    ),
                    'schema' => $schema_handler,
                )
            )
        ));
        $this->base_controller->register_authenticated_route(
            resource_name: $resource_name,
            http_verb: $http_verb,
            route_handler: $route_handler,
            schema_handler: $schema_handler,
            auth_handler: $auth_handler,
            is_singular: $is_singular,
            is_uuid: $is_uuid
        );
        $this->assertConditionsMet();
    }
}