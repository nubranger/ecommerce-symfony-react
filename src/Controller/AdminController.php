<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Products;
use App\Entity\User;
use App\Service\ImageDeleteService;
use App\Service\ImageUploadService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @Route("/admin")
 * @IsGranted("ROLE_ADMIN")
 */
class AdminController extends AbstractController
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * @Route("/", name="admin_dashboard")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }

    /**
     * @Route("/users", name="admin_users")
     */
    public function usersIndex(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        return $this->render('admin/users/users.html.twig', [
            'users' => $users,
        ]);
    }

    /**
     * @Route("/users/edit/{id}", name="admin_user_edit", methods={"GET"})
     */
    public function usersEdit($id): Response
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);


        return $this->render('admin/users/edit.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/users/update/{id}", name="admin_users_update", methods={"POST"})
     */
    public function userUpdate(Request $r, ValidatorInterface $validator, $id)
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        $changePassword = $r->request->get('user_password');
        $changePasswordRepeat = $r->request->get('user_password_repeat');


        $user
            ->setName($r->request->get('user_name'))
            ->setSurname($r->request->get('user_surname'))
            ->setEmail($r->request->get('user_email'))
            ->setRoles((array)$r->request->get('user_roles'));
        if (isset($changePassword) && isset($changePasswordRepeat) && $changePassword !== "" && $changePasswordRepeat !== "") {

            if ($changePassword === $changePasswordRepeat) {
                $user->setPassword($this->passwordHasher->hashPassword($user, $changePassword));
                $this->addFlash('success', "Password changed!");
            } else {
                $this->addFlash('danger', "You entered different password.");
                return $this->redirectToRoute('admin_user_edit', ['id' => $id]);
            }
        }

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_user_edit', ['id' => $id]);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->redirectToRoute('admin_users');
    }

    /**
     * @Route("/users/delete/{id}", name="admin_user_delete", methods={"POST"})
     */
    public function usersDelete($id): Response
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();

        $this->addFlash('danger', "User {$user->getName()} was deleted.");

        return $this->redirectToRoute('admin_users');
    }

    /**
     * @Route("/products", name="admin_products")
     */
    public function productsIndex(): Response
    {
        $products = $this->getDoctrine()->getRepository(Products::class)->findAll();

        return $this->render('admin/products/products.html.twig', [
            'products' => $products,
        ]);
    }

    /**
     * @Route("/products/create/", name="admin_products_create", methods={"GET"})
     */
    public function productsCreate(): Response
    {
        $categories = $this->getDoctrine()
            ->getRepository(Category::class)
            ->findAll();

        return $this->render('admin/products/create.html.twig', [
            'categories' => $categories
        ]);
    }

    /**
     * @Route("/products/store", name="admin_products_store", methods={"POST"})
     */
    public function animalStore(Request $r, ValidatorInterface $validator, ImageUploadService $imageUploadService): Response
    {
        $category = $this->getDoctrine()
            ->getRepository(Category::class)
            ->find($r->request->get('product_category_id'));

        $product = new Products();

        $uploadedFile = $r->files->get('image');
        if ($uploadedFile) {

            $violations = $validator->validate(
                $uploadedFile,
                new File([
                    'maxSize' => '1M',
                    'mimeTypes' => [
                        'image/jpg',
                        'image/jpeg',
                        'image/png'
//                        'image/*'
                    ]
                ])
            );

            if ($violations->count() > 0) {
                $violation = $violations[0];
                $this->addFlash('errors', $violation->getMessage());
                return $this->redirectToRoute('admin_products_create');
            }

            $newFilename = $imageUploadService->uploadImage($uploadedFile, "/products_images");
            $imageArray = [];
            array_push($imageArray, $newFilename);
            $product->setImages($imageArray);
        }

        $product
            ->setTitle($r->request->get('product_title'))
            ->setPrice((float)$r->request->get('product_price'))
            ->setActive($r->request->get('product_active'))
            ->setDiscount((float)$r->request->get('product_discount'))
            ->setDescription($r->request->get('product_description'))
            ->setCategory($category)
            ->setStock((int)$r->request->get('product_stock'));

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_products_create');
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        $this->addFlash('success', "Product {$product->getTitle()} was added.");

        return $this->redirectToRoute('admin_products');
    }

    /**
     * @Route("/products/edit/{id}", name="admin_products_edit", methods={"GET"})
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
        ]);
    }

    /**
     * @Route("/products/update/{id}", name="admin_products_update", methods={"POST"})
     */
    public function productUpdate(Request $r, ValidatorInterface $validator, $id)
    {
        $category = $this->getDoctrine()
            ->getRepository(Category::class)
            ->find($r->request->get('product_category_id'));

        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        $product
            ->setTitle($r->request->get('product_title'))
            ->setPrice((float)$r->request->get('product_price'))
            ->setActive($r->request->get('product_active'))
            ->setDiscount((float)$r->request->get('product_discount'))
            ->setDescription($r->request->get('product_description'))
            ->setCategory($category)
            ->setStock((int)$r->request->get('product_stock'));

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_products_edit', ['id' => $id]);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        $this->addFlash('success', "Product {$product->getTitle()} was updated.");

        return $this->redirectToRoute('admin_products');
    }

    /**
     * @Route("/products/image/delete/{id}", name="admin_products_image_delete", methods={"POST"})
     */
    public function productImageDelete(Request $r, $id, ImageDeleteService $imageDeleteService)
    {
        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        $imageName = $r->request->get('image_to_delete');

        $imageDeleteService->deleteImage($product->getImagePath() . $imageName);

        $imageArray = $product->getImages();

        if (($key = array_search($imageName, $imageArray)) !== false) {
            unset($imageArray[$key]);
        }

        $product->setImages($imageArray);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        $this->addFlash('success', "Image was deleted.");

        return $this->redirectToRoute('admin_products_edit', ['id' => $id]);
    }

    /**
     * @Route("/products/image/upload/{id}", name="admin_products_image_upload", methods={"POST"})
     */
    public function productImageUpload(Request $r, $id, ValidatorInterface $validator, ImageUploadService $imageUploadService)
    {
        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        $uploadedFile = $r->files->get('image');
        if ($uploadedFile) {

            $violations = $validator->validate(
                $uploadedFile,
                new File([
                    'maxSize' => '1M',
                    'mimeTypes' => [
                        'image/jpg',
                        'image/jpeg',
                        'image/png'
//                        'image/*'
                    ]
                ])
            );

            if ($violations->count() > 0) {
                $violation = $violations[0];
                $this->addFlash('errors', $violation->getMessage());
                return $this->redirectToRoute('admin_products_edit', ['id' => $id]);
            }

            $newFilename = $imageUploadService->uploadImage($uploadedFile, "/products_images");
            if ($product->getImages()) {
                $imageArray = $product->getImages();
            } else {
                $imageArray = [];
            }
            array_push($imageArray, $newFilename);
            $product->setImages($imageArray);
        } else {
            $this->addFlash('danger', "Please select the image.");

            return $this->redirectToRoute('admin_products_edit', ['id' => $id]);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        $this->addFlash('success', "Image was uploaded.");

        return $this->redirectToRoute('admin_products_edit', ['id' => $id]);
    }

    /**
     * @Route("/products/delete/{id}", name="admin_product_delete", methods={"POST"})
     */
    public function productsDelete($id, ImageDeleteService $imageDeleteService): Response
    {
        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($id);

        foreach ($product->getImages() as $x => $val) {
            $imageDeleteService->deleteImage($product->getImagePath() . $val);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($product);
        $entityManager->flush();

        $this->addFlash('success', "Product {$product->getTitle()} was deleted.");

        return $this->redirectToRoute('admin_products');
    }
}
