<?php
require_once __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/src/Application.php';
$app->register(RedFireFarm\CsaPlugin\Api\Services\ConfigInterface::class, RedFireFarm\CsaPlugin\Api\Services\Config::class);
$app->run();
