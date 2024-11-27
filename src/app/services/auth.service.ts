import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://196.202.235.196:7018/digibank-payment-agregator-gateway/api';

  constructor(private http: HttpClient) {}

  // Se connecter
  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Stocker les informations d'identification dans sessionStorage
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);

    return this.http.post(`${this.apiUrl}/otp-login`, body, { headers });
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
      emfCode: emfCode,
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

  // Méthode pour lister tous les comptes OTP
  getAllAccounts(): Observable<any[]> {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Authentification Basic
    });

    return this.http.get<any[]>(`${this.apiUrl}/otp-account`, { headers });
  }

  // Méthode pour récupérer toutes les opérations avec Basic Auth
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


  // Déconnexion
  logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }
}