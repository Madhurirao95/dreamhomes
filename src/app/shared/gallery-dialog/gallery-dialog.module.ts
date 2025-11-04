import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GalleryDialogComponent } from './gallery-dialog.component';

@NgModule({
  declarations: [GalleryDialogComponent],
  imports: [SharedModule],
  exports: [GalleryDialogComponent],
  providers: []
})
export class GalleryDialogModule {}
