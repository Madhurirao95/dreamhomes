import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewListingComponent } from './view-listing.component';
import { ChatWidgetComponent } from '../shared/chat-widget/chat-widget.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: ':id', component: ViewListingComponent }];
@NgModule({
  declarations: [ViewListingComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ChatWidgetComponent],
  exports: [ViewListingComponent, RouterModule],
  providers: []
})
export class ViewListingModule {}
