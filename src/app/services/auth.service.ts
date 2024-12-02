import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://196.202.235.196:7018/digibank-payment-agregator-gateway/api';

  constructor(private http: HttpClient, private loaderService: LoaderService, private router: Router) {}

  // Se connecter
  // login(username: string, password: string): Observable<any> { 
  //   const body = {
  //     username: username,
  //     password: password,
  //   };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });
  //   sessionStorage.setItem('username', username);
  //   sessionStorage.setItem('password', password);

  //   return this.http.post(`${this.apiUrl}/otp-login`, body, { headers }); 
  // }


  login(username: string, password: string): Observable<any> { 
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);

    // Afficher le loader
    this.loaderService.show();
    
    return this.http.post(`${this.apiUrl}/otp-login`, body, { headers }).pipe(
      finalize(() => this.loaderService.hide()) // Cacher le loader à la fin de l'appel
    );
  }

  // Obtenir les EMFs
  getEmfs(): Observable<any[]> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Utilisation de Basic Auth
    });

    return this.http.get<any[]>(`${this.apiUrl}/otp-account`, { headers });
  }



  // Débloquer un utilisateur
  unlockRecipient(recipient: string, emfCode: string): Observable<any> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const body = {
      recipient: recipient,
      code: emfCode,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Utilisation de Basic Auth
    });

    return this.http.put(`${this.apiUrl}/otp-unlockRecipient`, body, { headers });
  }



  // Changer mot de passe
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Utilisation de Basic Auth
    });

    return this.http.post(`${this.apiUrl}/otp-changePasswordAccount`, body, { headers });
  }

  // Méthode pour lister tous les comptes utilisateurs
  getAllAccounts(): Observable<any[]> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Authentification Basic
    });

    return this.http.get<any[]>(`${this.apiUrl}/otp-account`, { headers });
  }


  // Méthode pour créer  les comptes utilisateurs
  createAccounts(
    name: string,
    accountUsername: string,
    accountType: string,
    emfs: string[] = [],
    userPassword: string
  ): Observable<any[]> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const account = {
      name,              
      username: accountUsername,
      accountType,
      emfs, 
      password: userPassword, 
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Authentification Basic
    });

    return this.http.post<any[]>(`${this.apiUrl}/otp-account`, account, { headers });
  }

   // Méthode pour mettre à jour les comptes utilisateur
   updateAccount(account: any): Observable<any> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.put(`${this.apiUrl}/otp-account`, account, { headers });
  }



  // Méthode pour récupérer toutes les opérations avec 
  getAllOperations(): Observable<any[]> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Encodez le nom d'utilisateur et le mot de passe
    });

    return this.http.get<any[]>(`${this.apiUrl}/otp-list`, { headers });
  }

  // Méthode pour récupérer les comptes OTP
  getAllEmf(): Observable<any[]> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Encodez le nom d'utilisateur et le mot de passe
    });

    return this.http.get<any[]>(`${this.apiUrl}/otp-emf`, { headers });
  }

  // Méthode pour créer les comptes OTP
  createEmf(
    name: string,
    code: string,
    otpDigitCount: number,
    otpExpirationDelay: number,
    loginSmsServer: string,
    passwordSmsServer: string,
    otpMessageFormat: string,
    
  ): Observable<any> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const data = {
      name,              
      code,              
      otpDigitCount, 
      otpExpirationDelay,             
      loginSmsServer,       
      passwordSmsServer,  
      otpMessageFormat 
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.post(`${this.apiUrl}/otp-emf`, data, { headers });
  }

   // Méthode pour mettre à jour les comptes otp
  updateEmf(emf: any): Observable<any> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.put(`${this.apiUrl}/otp-emf`, emf, { headers });
  }

  // Méthode pour supprimer les comptes otp
  deleteEmf(): Observable<any> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.delete(`${this.apiUrl}/otp-emf`, { headers });
  }

  // Déconnexion
  logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.router.navigate(['/connexion']); // Rediriger vers la page de connexion
  }
}