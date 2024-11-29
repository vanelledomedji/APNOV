import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'; 
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionCompteOTP',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule, TablerIconsModule, MatButtonModule, MatTableModule, MaterialModule, MatDialogModule, CommonModule, FormsModule],
  templateUrl: './gestionCompteOTP.component.html',
})
export class AppGestionCompteOTPComponent {

  name: string=''
  code: string=''
  otpDigitCount: number= 0
  otpExpirationDelay: number= 0
  loginSmsServer: string=''
  passwordSmsServer: string=''
  otpMessageFormat: string=''

  errorMessage: string = '';

  displayedColumns: string[] = [
   'emfName',              // Nom de l'EMF
    'emfCode',              // Numéro de l'EMF
    'numberOfDigits',       // Nombre de Chiffres
    'lifetime',             // Durée de Vie
    'serverLogin',          // Login Serveur
    'serverPassword',       // Mot de Passe Serveur
    'messageStart',          // Début du Message
    'actions'
  ];

  selectedAccount: any;

  accounts: any[] = [];
  form: FormGroup;

  

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate') editModalTemplate: TemplateRef<any>;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  editElement(element: any) {
    if (!element) {
      console.error('Aucun élément sélectionné');
      return;
    }
  
    this.selectedAccount = { ...element }; // Clonez l'élément pour le modifier
    const dialogRef = this.dialog.open(this.editModalTemplate, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données mises à jour:', result);
      }
    });
  }

  
  openModal() {
    const dialogRef = this.dialog.open(this.modalTemplate, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données reçues:', result);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
      this.dialog.closeAll(); // Fermer le modal après soumission
    }
  }
  onCancel() {
    this.dialog.closeAll(); // Fermer le modal sans traitement
  }

  

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.authService.getAllEmf().subscribe(

      (data) => {
        console.log('Données reçues:', data); 
        this.accounts = data.map(account => ({
          emfName: account.name,              
          emfCode: account.code,              
          numberOfDigits: account.otpDigitCount, 
          lifetime: account.otpExpirationDelay,             
          serverLogin: account.loginSmsServer,       
          serverPassword: account.passwordSmsServer,  
          messageStart: account.otpMessageFormat       
        }));
        console.log('Comptes récupérés:', this.accounts); 
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des comptes', error);
      }
    );
  }

  onCreateUser(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Tous les champs sont requis.';
      return;
    }
    this.authService.createEmf(
      this.name,              
      this.code,              
      this.otpDigitCount, 
      this.otpExpirationDelay,             
      this.loginSmsServer,       
      this.passwordSmsServer,  
      this.otpMessageFormat 
    ).subscribe(
      response => {
        console.log('Utilisateur créé:', response);
        // Gérer la redirection ou afficher un message de succès
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        // Gérer l'erreur
      }
    );
  }

  
  updateEmf() {
    // Préparez l'objet à envoyer à l'API
    const updatedEmf = {
      id: this.selectedAccount.id, // Assurez-vous d'avoir l'ID de l'EMF
      name: this.selectedAccount.emfName,
      code: this.selectedAccount.emfCode,
      otpDigitCount: this.selectedAccount.numberOfDigits,
      otpExpirationDelay: this.selectedAccount.lifetime,
      loginSmsServer: this.selectedAccount.serverLogin,
      passwordSmsServer: this.selectedAccount.serverPassword,
      otpMessageFormat: this.selectedAccount.messageStart,
    };
  
    this.authService.updateEmf(updatedEmf).subscribe(
      response => {
        console.log('EMF mis à jour avec succès:', response);
        this.loadAccounts();
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'EMF:', error);
        this.errorMessage = 'Erreur de mise à jour. Veuillez réessayer.';
      }
    );
  }


}
