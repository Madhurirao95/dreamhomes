import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [SharedModule],
  exports: [PageNotFoundComponent],
  providers: []
})
export class PageNotFoundModule {}
