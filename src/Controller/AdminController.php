<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Products;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/users", name="admin_users")
     * @IsGranted("ROLE_ADMIN")
     */
    public function usersIndex(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        return $this->render('admin/users/users.html.twig', [
            'users' => $users,
        ]);
    }

    /**
     * @Route("/users/delete/{id}", name="admin_user_delete", methods={"POST"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function usersDelete($id): Response
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();

//        $this->addFlash('danger', "User {$product->getName()} was deleted.");

        return $this->redirectToRoute('admin_users');
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
     * @Route("/products/update/{id}", name="admin_products_update", methods={"POST"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function productUpdate(Request $r, $id)
    {
        $category = $this->getDoctrine()
            ->getRepository(Category::class)
            ->find($r->request->get('product_category_id'));

        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        $product
            ->setTitle($r->request->get('product_title'))
            ->setPrice($r->request->get('product_price'))
            ->setActive($r->request->get('product_active'))
            ->setDiscount($r->request->get('product_discount'))
            ->setDescription($r->request->get('product_description'))
            ->setCategory($category)
            ->setStock($r->request->get('product_stock'));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        return $this->redirectToRoute('admin_products');
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
