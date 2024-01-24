import { NgModule } from '@angular/core';
import { SignInDialogContentComponent } from './signIn-dialog-content.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SignInDialogContentComponent],
  imports: [SharedModule],
  exports: [SignInDialogContentComponent],
  providers: []
})
export class SignInDialogContentModule {}
