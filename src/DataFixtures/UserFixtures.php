<?php

namespace App\DataFixtures;

use App\Entity\Address;
use App\Entity\Category;
use App\Entity\Orders;
use App\Entity\Products;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use function Sodium\add;

class UserFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager)
    {
        $user1 = new User();
        $user1->setEmail('admin@mail.com');
        $user1->setRoles(['ROLE_ADMIN']);
        $user1->setName("Mike");
        $user1->setSurname("Balionelis");
        $user1->setPassword($this->passwordHasher->hashPassword($user1, 'pass'));

        $address1 = new Address();
        $address1->setCity("Vilnius");
        $address1->setCountry("Lithuania");
        $address1->setStreet("Vilniaus str.");
        $address1->setHouseNumber("77A");
        $address1->setFlatNumber("21");
        $address1->setPostalCode("LT-77777");
        $address1->setPhoneNumber("+370777777777");
        $address1->setUser($user1);
        $manager->persist($address1);

        $user2 = new User();
        $user2->setEmail('user@mail.com');
        $user2->setRoles(['ROLE_REGISTERED']);
        $user2->setName("John");
        $user2->setSurname("Doe");
        $user2->setPassword($this->passwordHasher->hashPassword($user2, 'pass'));

        $address2 = new Address();
        $address2->setCity("Kaunas");
        $address2->setCountry("Lithuania");
        $address2->setStreet("Kauno str.");
        $address2->setHouseNumber("88");
        $address2->setFlatNumber("11");
        $address2->setPostalCode("LT-77777");
        $address2->setPhoneNumber("+370777777777");
        $address2->setUser($user2);
        $manager->persist($address2);

        $manager->persist($user1);
        $manager->persist($user2);
        $manager->flush();


        $category1 = new Category();
        $category1->setName("Tablets");

        $manager->persist($category1);
        $manager->flush();

        $product = new Products();
        $product->setTitle('OnePlus Nord N10 5G');
        $product->setDescription('Very nice smartphone');
        $product->setStock(4);
        $product->setPrice(444.6);
        $product->setActive("active");
        $product->setCategory($category1);
        $product->setImages([]);

        $manager->persist($product);
        $manager->flush();

        $product1 = new Products();
        $product1->setTitle('OnePlus');
        $product1->setDescription('Very nice smartphone');
        $product1->setStock(2);
        $product1->setPrice(777.6);
        $product1->setActive("active");
        $product1->setCategory($category1);
        $product1->setImages([]);

        $manager->persist($product1);
        $manager->flush();


        $orderProduct = [
            [
                "id" => 1,
                "title" => "Samsung Galaxy S21 Ultra",
                "description" => "Very nice smartphone",
                "price" => 499.99,
                "discount" => 299,
                "img" => [
                    "/build/images/phones/phone1.png",
                    "/build/images/phones/phone2.png",
                    "/build/images/phones/phone3.png"
                ],
                "stock" => 3,
                "category" => "category1",
                "amount" => 5
            ],
            [
                "id" => 2,
                "title" => "Samsung",
                "description" => "Very nice smartphone",
                "price" => 300.99,
                "discount" => 200,
                "img" => [
                    "/build/images/phones/phone1.png",
                    "/build/images/phones/phone2.png",
                    "/build/images/phones/phone3.png"
                ],
                "stock" => 3,
                "category" => "category1",
                "amount" => 2
            ]
        ];

        $order1 = new Orders();
        $order1->setName($user1->getName() . " " . $user1->getSurname());
        $order1->setUser($user1);
        $date1 = new DateTime('2021-07-30');
        $order1->setDate($date1);
        $order1->setProducts($orderProduct);
        $order1->setStatus("delivered");
        $order1->setTotal(777.7);

        $manager->persist($order1);
        $manager->flush();


        $order2 = new Orders();
        $order2->setName($user2->getName() . " " . $user2->getSurname());
        $order2->setUser($user2);
        $date2 = new DateTime('2021-07-30');
        $order2->setDate($date2);
        $order2->setProducts($orderProduct);
        $order2->setStatus("delivered");
        $order2->setTotal(777.7);

        $manager->persist($order2);
        $manager->flush();

        $order3 = new Orders();
        $order3->setName($user2->getName() . " " . $user2->getSurname());
        $order3->setUser($user1);
        $date3 = new DateTime('2021-07-30');
        $order3->setDate($date3);
        $order3->setProducts($orderProduct);
        $order3->setStatus("delivered");
        $order3->setTotal(777.7);

        $manager->persist($order3);
        $manager->flush();
    }
}
