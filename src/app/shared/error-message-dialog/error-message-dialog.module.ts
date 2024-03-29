import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorMessageDialogComponent } from './error-message-dialog.component';

@NgModule({
  declarations: [ErrorMessageDialogComponent],
  imports: [SharedModule],
  exports: [ErrorMessageDialogComponent],
  providers: []
})
export class ErrorMessageDialogModule {}
