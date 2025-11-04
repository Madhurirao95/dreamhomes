import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [SharedModule],
  exports: [FooterComponent],
  providers: []
})
export class FooterModule {}
