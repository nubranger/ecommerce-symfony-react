<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Products;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class DataFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $category1 = new Category();
        $category1->setName("Phones");

        $category2 = new Category();
        $category2->setName("Computers");

        $manager->persist($category1);
        $manager->persist($category2);
        $manager->flush();

        for ($i = 1; $i < 10; $i++) {
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
        }


    }
}
