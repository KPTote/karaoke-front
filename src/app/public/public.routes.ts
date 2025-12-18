import { Routes } from "@angular/router";
import { confirmationFormGuard } from "./guards/confirmation-form.guard";

export const publicRoutes: Routes = [
  {
    path: 'user-form',
    loadComponent: () => import('./pages/user-form/user-form.component').then( c => c.UserFormComponent)
  },
  {
    path: 'confirmation-form',
    loadComponent: () => import('./pages/confirmation-form/confirmation-form.component').then(c => c.ConfirmationFormComponent),
    canActivate: [confirmationFormGuard]
  },
  {
    path: '**',
    redirectTo: 'user-form',
    pathMatch: 'full'
  }
];


export default publicRoutes;
