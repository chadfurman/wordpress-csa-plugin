<?php

namespace RedFireFarm\CsaPlugin\Api\Controllers\Test;

use WP_Mock;
use WP_Mock\Tools\TestCase;

class BaseControllerTest extends TestCase {
    public function setUp(): void
    {
        WP_Mock::setUp();
    }

    public function tearDown(): void
    {
        WP_Mock::tearDown();
    }

    public function test_register_public_route()
    {
        $this->fail("Test not implemented");
    }

    public function test_get_route()
    {
        $this->fail("Test not implemented");
    }

    public function test_register_authenticated_route()
    {
        $this->fail("Test not implemented");
    }
}