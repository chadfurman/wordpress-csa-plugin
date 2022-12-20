<?php

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
        $controller->expects($this->once())->method('register_public_route')->with(
            resource_name: $this->equalTo($controller->resource_name),
            http_verb: 'GET',
            route_handler: $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "create";
            }),
            schema_handler: $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "schema";
            }),
            auth_handler: $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "create_auth";
            }),
            is_singular: $this->equalTo(true),
        );
        $controller->register_get_item_route();
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
        WP_Mock::userFunction('register_rest_route');
        WP_Mock::userFunction('register_post_type');
        $controller = $this->getMockBuilder(SignupController::class)
            ->onlyMethods(['register_authenticated_route'])
            ->setConstructorArgs([new Config()])
            ->getMock();
        $controller->expects($this->once())->method('register_authenticated_route')->with(
            $this->equalTo($controller->resource_name),
            'GET',
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "get_item";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "schema";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "get_item_auth";
            }),
            is_singular: $this->equalTo(true),
        );
        $controller->register_get_item_route();
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
        WP_Mock::userFunction('register_rest_route');
        WP_Mock::userFunction('register_post_type');
        $controller = $this->getMockBuilder(SignupController::class)
            ->onlyMethods(['register_authenticated_route'])
            ->setConstructorArgs([new Config()])
            ->getMock();
        $controller->expects($this->once())->method('register_authenticated_route')->with(
            $this->equalTo($controller->resource_name),
            'GET',
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "get_items";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "schema";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "get_items_auth";
            }),
        );
        $controller->register_get_items_route();
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
        WP_Mock::userFunction('register_rest_route');
        WP_Mock::userFunction('register_post_type');
        $controller = $this->getMockBuilder(SignupController::class)
            ->onlyMethods(['register_authenticated_route'])
            ->setConstructorArgs([new Config()])
            ->getMock();
        $controller->expects($this->once())->method('register_authenticated_route')->with(
            $this->equalTo($controller->resource_name),
            'PATCH',
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "update";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "schema";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "update_auth";
            }),
            is_singular: $this->equalTo(true),
        );
        $controller->register_update_route();
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
        WP_Mock::userFunction('register_rest_route');
        WP_Mock::userFunction('register_post_type');
        $controller = $this->getMockBuilder(SignupController::class)
            ->onlyMethods(['register_authenticated_route'])
            ->setConstructorArgs([new Config()])
            ->getMock();
        $controller->expects($this->once())->method('register_authenticated_route')->with(
            $this->equalTo($controller->resource_name),
            'DELETE',
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "delete";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "schema";
            }),
            $this->callback(function ($subject) {
                return is_callable($subject) && $subject[1] == "delete_auth";
            }),
            is_singular: $this->equalTo(true),
        );
        $controller->register_delete_route();
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