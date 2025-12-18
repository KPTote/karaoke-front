import { Routes } from "@angular/router";
import { dashboardGuard } from "./guards/dashboard.guard";


export const privateRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent)
  },
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
    title: 'Dashboard',
    loadChildren: () => import('./private-children.routes')
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];


export default privateRoutes;
