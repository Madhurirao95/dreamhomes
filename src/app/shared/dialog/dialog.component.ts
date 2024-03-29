import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IComponentData } from '../Interfaces/IComponentData';

@Component({
  selector: 'dialog-popup',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.data.contentComponent) {
      const component = this.container.createComponent(
        this.data.contentComponent
      );

      if (this.data.initialData) {
        const componentData = component.instance as IComponentData;
        componentData.initializeControls(this.data.initialData);
      }
    }

    this.cdr.detectChanges();
  }

  onCloseClick(dialogResult: any): void {
    this.dialogRef.close(dialogResult);
  }
}

export interface DialogData {
  titleIcon: string
  title: string
  titleStyle: any
  contentComponent: any
  messages: string[]
  showCloseButton: boolean
  initialData: any
}
