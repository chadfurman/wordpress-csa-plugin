<?php

/*
 * Container for IoC
 * @see https://webmobtuts.com/backend-development/implementing-simple-ioc-container-in-php/
 */

namespace RedFireFarm\CsaPlugin\Api\Container;

use App\Exceptions\NotFoundException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;
use ReflectionClass;
use ReflectionException;

/**
 * Class CsaContainer
 */
class CsaContainer implements ContainerInterface
{
    private array $services = [];

    /**
     * @param string $key
     * @param mixed $value
     * @return CsaContainer
     * @throws ContainerExceptionInterface
     * @throws NotFoundException
     * @throws NotFoundExceptionInterface
     * @throws ReflectionException
     */
    public function register(string $key, mixed $value): static
    {
        $this->services[$key] = $this->resolveDependency($value);
        return $this;
    }

    /**
     * @param mixed $value
     * @return mixed|object|null
     * @throws ContainerExceptionInterface
     * @throws NotFoundException
     * @throws NotFoundExceptionInterface
     * @throws ReflectionException
     */
    private function resolveDependency(mixed $value): mixed
    {
        try {
            if (is_callable($value)) {
                return $value();
            }

            $reflectionValue = new ReflectionClass($value);
            return $this->getInstance($reflectionValue);
        } catch (ReflectionException $e) {
            throw new NotFoundException($e->getMessage(), $e->getCode(), $e);
        }
    }

    /**
     * @param ReflectionClass $reflectionValue
     * @return mixed|object|null
     * @throws NotFoundExceptionInterface
     * @throws NotFoundException
     * @throws ContainerExceptionInterface
     * @throws ReflectionException
     */
    private function getInstance(ReflectionClass $reflectionValue): mixed
    {
        $constructor = $reflectionValue->getConstructor();
        if (is_null($constructor) || $constructor->getNumberOfRequiredParameters() == 0) {
            return $reflectionValue->newInstance();
        }

        $params = [];

        foreach ($constructor->getParameters() as $param) {
            if ($type = $param->getType()) {
                $params[] = $this->get($type->getName());
            }
        }

        return $reflectionValue->newInstanceArgs($params);
    }

    /**
     * @throws NotFoundExceptionInterface
     * @throws NotFoundException
     * @throws ContainerExceptionInterface
     * @throws ReflectionException
     */
    public function get(string $id)
    {
        if (!isset($this->services[$id])) {
            $this->services[$id] = $this->resolveDependency($this->get($id));
        }
        return $this->services[$id];
    }

    public function has(string $id): bool
    {
        return isset($this->services[$id]);
    }

    public function getServices(): array {
        return $this->services;
    }
}