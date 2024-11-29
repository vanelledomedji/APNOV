import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
    selector: 'app-loader',
    template: `
      <div *ngIf="isLoading | async" class="loader-overlay">
        <div class="loader">Chargement...</div>
      </div>
    `,
    styles: [`
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Assurez-vous que le loader est au-dessus des autres éléments */
      }
      .loader {
        font-size: 24px; /* Taille du texte du loader */
      }
    `]
})

export class LoaderComponent {
  isLoading = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}
}