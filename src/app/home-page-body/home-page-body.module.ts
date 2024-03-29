import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomePageBodyComponent } from './home-page-body.component';

@NgModule({
  declarations: [HomePageBodyComponent],
  imports: [SharedModule],
  exports: [HomePageBodyComponent],
  providers: []
})
export class HomePageBodyModule {}
