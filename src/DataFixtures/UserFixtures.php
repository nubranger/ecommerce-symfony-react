<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

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
        $user1->setPassword($this->passwordHasher->hashPassword($user1, 'pass'));

        $user2 = new User();
        $user2->setEmail('user@mail.com');
        $user1->setRoles(['ROLE_REGISTERED']);
        $user2->setPassword($this->passwordHasher->hashPassword($user2, 'pass'));

        $manager->persist($user1);
        $manager->persist($user2);
        $manager->flush();
    }
}
