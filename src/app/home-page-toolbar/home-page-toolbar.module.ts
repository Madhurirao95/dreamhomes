import { NgModule } from '@angular/core';
import { HomePageToolBarComponent } from './home-page-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { SignInDialogContentModule } from './signIn-dialog/signIn-dialog-content.module';
import { RouterModule } from '@angular/router';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@NgModule({
  declarations: [HomePageToolBarComponent, ProfileDialogComponent],
  imports: [SharedModule, DialogModule, SignInDialogContentModule, RouterModule],
  exports: [HomePageToolBarComponent],
  providers: []
})
export class HomePageToolBarModule {}
