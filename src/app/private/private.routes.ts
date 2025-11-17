import { Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { CurrentListComponent } from "./pages/current-list/current-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HistoryComponent } from "./pages/history/history.component";


export const privateRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    children: [
      {
        path: 'current-list',
        component: CurrentListComponent
      },
      {
        path: 'history',
        component: HistoryComponent
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
