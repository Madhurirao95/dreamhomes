import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [SharedModule],
  exports: [DialogComponent],
  providers: []
})
export class DialogModule {}
