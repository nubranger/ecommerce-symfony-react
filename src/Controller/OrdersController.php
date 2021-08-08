<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Entity\Products;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class OrdersController extends AbstractController
{
    /**
     * @Route("/orders", name="orders")
     */
    public function index(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $repository = $entityManager->getRepository(Orders::class);
        $orders = $repository->findAll();

        return new JsonResponse($serializer->serialize($orders, 'json', [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ]), 200, [], true);
    }
}
