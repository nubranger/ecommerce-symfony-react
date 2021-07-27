<?php

namespace App\Controller;

use App\Api\ApiRoute;
use App\Entity\Products;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @ApiRoute
 */
class ProductsController extends AbstractController
{
    /**
     * @Route("/products", name="products")
     */
    public function index(EntityManagerInterface $entityManager): Response
    {
        $repository = $entityManager->getRepository(Products::class);
        $products = $repository->findAll();

        return $this->json($products);
    }

}
