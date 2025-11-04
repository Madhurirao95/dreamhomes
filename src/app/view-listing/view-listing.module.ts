import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewListingComponent } from './view-listing.component';

@NgModule({
  declarations: [ViewListingComponent],
  imports: [SharedModule],
  exports: [ViewListingComponent],
  providers: []
})
export class ViewListingModule {}
