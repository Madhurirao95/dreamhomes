import { Component, Inject } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-popup',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor (
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCloseClick (): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string
  titleStyle: any
  contentComponent: any
  actionButtonComponent: any
  showCloseButton: boolean
}
