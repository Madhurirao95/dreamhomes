import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostedListingDetailsComponent } from './posted-listing-details.component';

@NgModule({
  declarations: [PostedListingDetailsComponent],
  imports: [SharedModule],
  exports: [PostedListingDetailsComponent],
  providers: []
})
export class PostedListingDetailsModule {}
