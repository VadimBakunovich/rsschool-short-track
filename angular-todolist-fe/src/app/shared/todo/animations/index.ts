import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.3s', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ display: 'block' }),
    animate('0s', style({ display: 'none' }))
  ])
]);