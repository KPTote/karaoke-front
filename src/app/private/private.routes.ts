import { Routes } from "@angular/router";
import { dashboardGuard } from "./guards/dashboard.guard";
import { currentListResolver } from "./resolvers/current-list.resolver";
import { historyResolver } from "./resolvers/history.resolver";


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
    children: [
      {
        path: 'current-list',
        loadComponent: () => import('./pages/current-list/current-list.component').then( c => c.CurrentListComponent),
        resolve: {
          playlist: currentListResolver
        }
      },
      {
        path: 'history',
        loadComponent: () => import('./pages/history/history.component').then( c => c.HistoryComponent),
        resolve: {
          playlist: historyResolver
        }
      },
      {
        path: 'edit-song',
        loadComponent: () => import('./pages/edit-song/edit-song.component').then( c => c.EditSongComponent)
      },
      {
        path: '**',
        redirectTo: 'current-list'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];


export default privateRoutes;
