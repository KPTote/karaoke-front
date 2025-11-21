import { Routes } from "@angular/router";
import { dashboardGuard } from "./guards/dashboard.guard";
import { AuthComponent } from "./pages/auth/auth.component";
import { CurrentListComponent } from "./pages/current-list/current-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { EditSongComponent } from "./pages/edit-song/edit-song.component";
import { HistoryComponent } from "./pages/history/history.component";
import { currentListResolver } from "./resolvers/current-list.resolver";


export const privateRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    component: DashboardComponent,
    title: 'Dashboard',
    children: [
      {
        path: 'current-list',
        component: CurrentListComponent,
        resolve: {
          playlist: currentListResolver
        }
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'edit-song',
        component: EditSongComponent
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
