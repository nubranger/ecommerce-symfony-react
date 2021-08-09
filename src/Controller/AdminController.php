<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Category;
use App\Entity\Orders;
use App\Entity\Products;
use App\Entity\User;
use App\Service\ImageDeleteService;
use App\Service\ImageUploadService;
use DateTime;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
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
    private $paginator;

    public function __construct(PaginatorInterface $paginator, UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
        $this->paginator = $paginator;
    }

    /**
     * @Route("/", name="admin_dashboard")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig', [

        ]);
    }

    /**
     * @Route("/orders", name="admin_orders")
     */
    public function ordersIndex(Request $request): Response
    {
        $orders = $this->getDoctrine()->getRepository(Orders::class)->findAll();

        $pagination = $this->paginator->paginate(
            $orders,
            $request->query->getInt('page', 1), /*page number*/
            6 /*limit per page*/
        );

        return $this->render('admin/orders/orders.html.twig', [
            'orders' => $pagination,
        ]);
    }

    /**
     * @Route("/orders/create/", name="admin_orders_create", methods={"GET"})
     */
    public function ordersCreate(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        return $this->render('admin/orders/create.html.twig', [
            'users' => $users,
        ]);
    }

    /**
     * @Route("/order/store/", name="admin_orders_store", methods={"POST"})
     */
    public function orderStore(Request $r, ValidatorInterface $validator)
    {
        $order = new Orders();

        $userId = $r->request->get('order_name');
        $user = $this->getDoctrine()->getRepository(User::class)->find($userId);

        $date = new DateTime($r->request->get('order_date'));

        $order
            ->setName($user->getName() . " " . $user->getSurname())
            ->setDate($date)
            ->setProducts([])
            ->setStatus($r->request->get('order_status'))
            ->setUser($user);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($order);
        $entityManager->flush();

        $this->addFlash('success', "Order was created.");

        return $this->redirectToRoute('admin_orders');
    }

    /**
     * @Route("/orders/edit/{id}", name="admin_order_edit", methods={"GET"})
     */
    public function orderEdit($id): Response
    {
        $order = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->find($id);

        $products = $this->getDoctrine()
            ->getRepository(Products::class)
            ->findAll();

//        dump($order->getProducts());

        return $this->render('admin/orders/edit.html.twig', [
            'order' => $order,
            'products' => $products
        ]);
    }

    /**
     * @Route("/orders/products/add/{id}", name="admin_order_products_add", methods={"POST"})
     */
    public function orderProductsAdd(Request $r, $id): Response
    {
        $order = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->find($id);

        $productId = $r->request->get('product_id');
        $productAmount = $r->request->get('product_amount');

        if ($productAmount <= 0 || !is_numeric($productAmount)) {
            $this->addFlash('danger', "Please enter valid amount");
            return $this->redirectToRoute('admin_order_edit', ['id' => $id]);
        }


        $product = $this->getDoctrine()
            ->getRepository(Products::class)
            ->find($productId);

        if ($order->getProducts()) {
            $orderProductsArray = $order->getProducts();

            foreach ($orderProductsArray as $key => $val) {
                if ($val['id'] == $productId) {
                    $this->addFlash('danger', "Product is already in the list.");
                    return $this->redirectToRoute('admin_order_edit', ['id' => $id]);
                }
            }
        } else {
            $orderProductsArray = [];
        }

        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, []);

        $data = $serializer->normalize($product, null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['category']
        ]);

        $data['amount'] = $productAmount;

        array_push($orderProductsArray, $data);
        $order->setProducts($orderProductsArray);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($order);
        $entityManager->flush();

        $this->addFlash('success', "Product was added.");

        return $this->redirectToRoute('admin_order_edit', ['id' => $id]);
    }

    /**
     * @Route("/orders/products/remove/{id}", name="admin_order_products_remove", methods={"POST"})
     */
    public function orderProductsRemove(Request $r, $id): Response
    {
        $order = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->find($id);

        $productId = $r->request->get('product_id');


        if ($order->getProducts()) {
            $orderProductsArray = $order->getProducts();
        } else {
            $orderProductsArray = [];
        }

        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, []);

        foreach ($orderProductsArray as $key => $val) {
//            dd($val['id']);
            if ($val['id'] == $productId) {
                unset($orderProductsArray[$key]);
            }
        }

        $order->setProducts($orderProductsArray);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($order);
        $entityManager->flush();

        $this->addFlash('danger', "Product was deleted.");

        return $this->redirectToRoute('admin_order_edit', ['id' => $id]);
    }

    /**
     * @Route("/orders/delete/{id}", name="admin_order_delete", methods={"POST"})
     */
    public function ordersDelete($id): Response
    {
        $order = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($order);
        $entityManager->flush();

        $this->addFlash('danger', "Order {$order->getName()} was deleted.");

        return $this->redirectToRoute('admin_orders');
    }

    /**
     * @Route("/orders/update/{id}", name="admin_orders_update", methods={"POST"})
     */
    public function orderUpdate(Request $r, ValidatorInterface $validator, $id)
    {
        $order = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->find($id);

        $date = new DateTime($r->request->get('order_date'));

        $order
            ->setName($r->request->get('order_name'))
            ->setStatus($r->request->get('order_status'))
            ->setDate($date);

        $errors = $validator->validate($order);

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_user_edit', ['id' => $id]);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($order);
        $entityManager->flush();

        $this->addFlash('success', "Order was updated.");

        return $this->redirectToRoute('admin_orders');
    }

    /**
     * @Route("/users", name="admin_users")
     */
    public function usersIndex(Request $request): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        $pagination = $this->paginator->paginate(
            $users,
            $request->query->getInt('page', 1), /*page number*/
            6 /*limit per page*/
        );

        return $this->render('admin/users/users.html.twig', [
            'users' => $pagination,
        ]);
    }

    /**
     * @Route("/users/create/", name="admin_users_create", methods={"GET"})
     */
    public function usersCreate(): Response
    {

        return $this->render('admin/users/create.html.twig', [

        ]);
    }

    /**
     * @Route("/users/store/", name="admin_users_store", methods={"POST"})
     */
    public function userStore(Request $r, ValidatorInterface $validator)
    {
        $changePassword = $r->request->get('user_password');
        $changePasswordRepeat = $r->request->get('user_password_repeat');

        $user = new User();

        $user
            ->setName($r->request->get('n'))
            ->setSurname($r->request->get('s'))
            ->setEmail($r->request->get('e'))
            ->setRoles((array)$r->request->get('r'));
        if (isset($changePassword) && isset($changePasswordRepeat) && $changePassword !== "" && $changePasswordRepeat !== "") {

            if ($changePassword === $changePasswordRepeat) {
                $user->setPassword($this->passwordHasher->hashPassword($user, $changePassword));
            } else {
                $this->addFlash('danger', "You entered different password.");
                return $this->redirectToRoute('admin_users_create');
            }
        } else {
            $this->addFlash('danger', "Please enter password.");
            return $this->redirectToRoute('admin_users_create');
        }

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_users_create');
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        $this->addFlash('success', "User was added.");

        return $this->redirectToRoute('admin_users');
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

        $this->addFlash('success', "User {$user->getName()} {$user->getSurname()} was updated.");

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

        $this->addFlash('danger', "User {$user->getName()} {$user->getSurname()} was deleted.");

        return $this->redirectToRoute('admin_users');
    }

    /**
     * @Route("/address/create/{id}", name="admin_address_create", methods={"GET"})
     */
    public function addressCreate($id): Response
    {

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        return $this->render('admin/address/create.html.twig', [
            "user" => $user
        ]);
    }

    /**
     * @Route("/address/store/{id}", name="admin_address_store", methods={"POST"})
     */
    public function addressStore(Request $r, ValidatorInterface $validator, $id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);

        $address = new Address();

        $address
            ->setCountry($r->request->get('country'))
            ->setPostalCode($r->request->get('postal_code'))
            ->setCity($r->request->get('city'))
            ->setStreet($r->request->get('street'))
            ->setHouseNumber($r->request->get('house_number'))
            ->setFlatNumber($r->request->get('flat_number'))
            ->setPhoneNumber($r->request->get('phone_number'))
            ->setUser($user);

        $errors = $validator->validate($address);
        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_address_create', ['id' => $id]);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($address);
        $entityManager->flush();

        $this->addFlash('success', "Address was added.");

        return $this->redirectToRoute('admin_users');
    }

    /**
     * @Route("/address/update/{id}", name="admin_address_update", methods={"POST"})
     */
    public function addressUpdate(Request $r, $id, ValidatorInterface $validator)
    {
        $address = $this->getDoctrine()
            ->getRepository(Address::class)
            ->find($id);

        $address
            ->setCountry($r->request->get('country'))
            ->setPostalCode($r->request->get('postal_code'))
            ->setCity($r->request->get('city'))
            ->setStreet($r->request->get('street'))
            ->setHouseNumber($r->request->get('house_number'))
            ->setFlatNumber($r->request->get('flat_number'))
            ->setPhoneNumber($r->request->get('phone_number'));

        $errors = $validator->validate($address);
        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addFlash('errors', $error->getMessage());
            }
            return $this->redirectToRoute('admin_users');
        }


        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($address);
        $entityManager->flush();

        $this->addFlash('success', "Address of {$address->getUser()->getName()} {$address->getUser()->getSurname()} was saved.");

        return $this->redirectToRoute('admin_users');
    }

    /**
     * @Route("/address/delete/{id}", name="admin_address_delete", methods={"POST"})
     */
    public function addressDelete($id): Response
    {
        $address = $this->getDoctrine()
            ->getRepository(Address::class)
            ->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($address);
        $entityManager->flush();

        $this->addFlash('danger', "Address of {$address->getUser()->getName()} {$address->getUser()->getSurname()} was deleted.");

        return $this->redirectToRoute('admin_users');
    }

    /**
     * @Route("/products", name="admin_products")
     */
    public function productsIndex(Request $request): Response
    {
        $products = $this->getDoctrine()->getRepository(Products::class)->findAll();

//        $dql   = "SELECT a FROM AcmeMainBundle:Article a";
//        $query = $em->createQuery($dql);

        $pagination = $this->paginator->paginate(
            $products,
            $request->query->getInt('page', 1), /*page number*/
            6 /*limit per page*/
        );

        return $this->render('admin/products/products.html.twig', [
            'products' => $pagination,
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

        $this->addFlash('danger', "Product {$product->getTitle()} was deleted.");

        return $this->redirectToRoute('admin_products');
    }
}
