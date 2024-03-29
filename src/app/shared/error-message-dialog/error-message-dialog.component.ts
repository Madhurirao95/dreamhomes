import { Component } from '@angular/core';

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html',
  styleUrls: ['./error-message-dialog.component.scss']
})
export class ErrorMessageDialogComponent {

}

export interface ErrorMessageDialogData {
  messages: string[]
}
