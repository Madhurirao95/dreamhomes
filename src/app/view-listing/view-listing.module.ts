import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewListingComponent } from './view-listing.component';
import { ChatWidgetComponent } from '../shared/chat-widget/chat-widget.component';

@NgModule({
  declarations: [ViewListingComponent],
  imports: [SharedModule, ChatWidgetComponent],
  exports: [ViewListingComponent],
  providers: []
})
export class ViewListingModule {}
