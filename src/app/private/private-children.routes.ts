import { Routes } from "@angular/router";
import { currentListResolver } from "./resolvers/current-list.resolver";
import { historyResolver } from "./resolvers/history.resolver";

export const privateChildren: Routes = [

  {
    path: 'current-list',
    loadComponent: () => import('./pages/current-list/current-list.component').then(c => c.CurrentListComponent),
    resolve: {
      playlist: currentListResolver
    }
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(c => c.HistoryComponent),
    resolve: {
      playlist: historyResolver
    }
  },
  {
    path: 'edit-song',
    loadComponent: () => import('./pages/edit-song/edit-song.component').then(c => c.EditSongComponent)
  },
  {
    path: '**',
    redirectTo: 'current-list'
  }

];

export default privateChildren;
