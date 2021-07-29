<?php

namespace App\Controller;

use App\Entity\Products;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ProductsController extends AbstractController
{
    /**
     * @Route("/products", name="products")
     */
    public function index(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $repository = $entityManager->getRepository(Products::class);
        $products = $repository->findAll();

        return new JsonResponse($serializer->serialize($products, 'json', [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['category']
        ]), 200, [], true);
    }
}
