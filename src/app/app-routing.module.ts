import { NgModule } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { RouterModule, Routes } from '@angular/router';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellPageComponent } from './sell-page/sell-page.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { AgentDashboardComponent } from './shared/agent-dashboard/agent-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/buy', pathMatch: 'full' },
  { path: 'buy', component: BuyPageComponent },
  { path: 'sell', component: SellPageComponent },
  { path: 'view-listing/:id', component: ViewListingComponent },
  { path: 'agent-dashboard', component: AgentDashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
