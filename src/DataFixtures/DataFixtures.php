<?php

namespace App\DataFixtures;

use App\Entity\Products;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class DataFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for ($i = 1; $i < 10; $i++) {
            $product = new Products();
            $product->setTitle('OnePlus Nord N10 5G');
            $product->setDescription('Very nice smartphone');
            $product->setAmount(4);
            $product->setPrice(444.6);
            $product->setImg('https://purepng.com/public/uploads/large/purepng.com-asus-smartphonepersonal-computersmartphonemobile-operating-systemcellular-phonephilipsandroid-1701528390817qbpuc.png');

            $manager->persist($product);
        $manager->flush();
        }
    }
}
