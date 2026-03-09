import { NgModule } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/buy', pathMatch: 'full' },

  {
    path: 'buy',
    loadChildren: async () =>
      await import('./buy-page/buy-page.module').then(m => m.BuyPageModule)
  },

  {
    path: 'sell',
    loadChildren: async () =>
      await import('./sell-page/sell-page.module').then(m => m.SellPageModule)
  },

  {
    path: 'view-listing',
    loadChildren: async () =>
      await import('./view-listing/view-listing.module')
        .then(m => m.ViewListingModule)
  },

  {
    path: 'agent-dashboard',
    loadComponent: async () =>
      await import('./shared/agent-dashboard/agent-dashboard.component')
        .then(c => c.AgentDashboardComponent)
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
