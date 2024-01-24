import { NgModule } from '@angular/core';
import { HomePageToolBarComponent } from './home-page-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { SignInDialogActionButtonsModule } from './signIn-dialog/signIn-dialog-action-buttons.module';
import { SignInDialogContentModule } from './signIn-dialog/signIn-dialog-content.module';
@NgModule({
  declarations: [HomePageToolBarComponent],
  imports: [SharedModule, DialogModule, SignInDialogActionButtonsModule, SignInDialogContentModule],
  exports: [HomePageToolBarComponent],
  providers: []
})
export class HomePageToolBarModule {}
