import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadDocumentsComponent } from './upload-documents.component';

@NgModule({
  declarations: [UploadDocumentsComponent],
  imports: [SharedModule],
  exports: [UploadDocumentsComponent],
  providers: []
})
export class UploadDocumentsModule {}
