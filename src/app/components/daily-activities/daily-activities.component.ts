import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

@Component({
  selector: 'app-daily-activities',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './daily-activities.component.html',
})
export class AppDailyActivitiesComponent {
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Paiement reçu',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'warning',
      title: 'En attente',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'warning',
      subtext: 'En attente',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'accent',
      title: 'Nouvelle souscription',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      subtext: 'meeting',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'primary',
      subtext: 'validation',
    },
  ];
}
