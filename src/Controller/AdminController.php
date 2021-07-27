<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Products;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/admin")
 * @IsGranted("ROLE_ADMIN")
 */
class AdminController extends AbstractController
{
    /**
     * @Route("/", name="admin_dashboard")
     * @IsGranted("ROLE_ADMIN")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }

    /**
     * @Route("/products", name="admin_products")
     * @IsGranted("ROLE_ADMIN")
     */
    public function productsIndex(): Response
    {
        $products = $this->getDoctrine()->getRepository(Products::class)->findAll();

        return $this->render('admin/products/products.html.twig', [
            'products' => $products,
        ]);
    }

    /**
     * @Route("/products/edit/{id}", name="admin_products_edit", methods={"GET"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function productsEdit($id): Response
    {
        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        $categories = $this->getDoctrine()
            ->getRepository(Category::class)
            ->findAll();

        return $this->render('admin/products/edit.html.twig', [
            'product' => $product,
            'categories' => $categories,
//            'errors' => $r->getSession()->getFlashBag()->get('errors', [])
        ]);
    }

    /**
     * @Route("/products/delete/{id}", name="admin_product_delete", methods={"POST"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function productsDelete($id): Response
    {
        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($product);
        $entityManager->flush();

//        $this->addFlash('danger', "Product {$product->getName()} was deleted.");

        return $this->redirectToRoute('admin_products');
    }
}
