import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrl: './gallery-dialog.component.scss',
  standalone: true,
  imports: [SharedModule]
})
export class GalleryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<GalleryDialogComponent>
  ) {}

  onCloseClick(dialogResult: any): void {
    this.dialogRef.close();
  }
}
