import { NgModule } from '@angular/core';
import { SignInDialogActionComponent } from './signIn-dialog-action-buttons.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SignInDialogActionComponent],
  imports: [SharedModule],
  exports: [SignInDialogActionComponent],
  providers: []
})
export class SignInDialogActionButtonsModule {}
