<?php
require_once __DIR__ . '../vendor/autoload.php';
$app = require_once __DIR__ . '/src/app.php';
$app->register(RedFireFarm\CsaPlugin\Api\Services\WordPress::class, RedFireFarm\CsaPlugin\Api\Services\WordPress::class);
$app->register(RedFireFarm\CsaPlugin\Api\Services\Config::class, function () { return RedFireFarm\CsaPlugin\Api\Services\Config::getConfig(); });
$app->run();
