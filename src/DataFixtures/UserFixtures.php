<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $user1 = new User();
        $user1->setEmail('admin@mail.com');
        $user1->setRoles(['ROLE_ADMIN']);
        $user1->setPassword($this->passwordEncoder->encodePassword(
            $user1,
            'pass'
        ));

        $user2 = new User();
        $user2->setEmail('user@mail.com');
        $user2->setRoles(['ROLE_REGISTERED']);
        $user2->setPassword($this->passwordEncoder->encodePassword(
            $user2,
            'pass'
        ));

        $manager->persist($user1);
        $manager->persist($user2);
        $manager->flush();
    }
}
