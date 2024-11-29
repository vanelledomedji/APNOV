import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Assurez-vous d'importer votre service d'authentification
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injection du Router

  // Vérifiez si le nom d'utilisateur est présent dans sessionStorage
  const username = sessionStorage.getItem('username');

  // Log pour débogage
  console.log('Vérification des informations d\'identification :', username);

  // Si le nom d'utilisateur existe, l'utilisateur est considéré comme connecté
  if (username) {
    return true; // L'utilisateur est connecté
  } else {
    console.log('Accès refusé. Redirection vers la page de connexion.');
    router.navigate(['/connexion']); // Redirigez vers la page de connexion
    return false; // Empêche l'accès à la route
  }
};