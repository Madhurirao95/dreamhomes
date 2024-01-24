import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomePageDetailsComponent } from './home-page-details.component';

@NgModule({
  declarations: [HomePageDetailsComponent],
  imports: [SharedModule],
  exports: [HomePageDetailsComponent],
  providers: []
})
export class HomePageDetailsModule {}
