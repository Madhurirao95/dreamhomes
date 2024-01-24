import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomePageBodyComponent } from './home-page-body.component';
import { HomePageDetailsModule } from '../home-page-details/home-page-details.module';

@NgModule({
  declarations: [HomePageBodyComponent],
  imports: [SharedModule, HomePageDetailsModule],
  exports: [HomePageBodyComponent],
  providers: []
})
export class HomePageBodyModule {}
