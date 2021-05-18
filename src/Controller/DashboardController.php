<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DashboardController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(SerializerInterface $serializer): Response
    {

        $user = $this->getUser();
        $username = "";
        $roles = "";

        if ($user !== null) {
            $username = $user->getUsername();
            $roles = $user->getRoles();
        }

        return $this->render('dashboard/index.html.twig', [
            'user' => $serializer->serialize([
                "username"=> $username,
                "roles"=>$roles,
            ], 'json')
        ]);


    }
}
