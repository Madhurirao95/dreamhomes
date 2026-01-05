/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() selectedFiles: File[] = [];
  @Output() selectedFilesEvent = new EventEmitter<File[]>();
  selectedFileNames: string[] = [];

  previews = new Map<string, string>();
  videoPreviews = new Map<string, string>();

  imageInfos?: Observable<any>;
  constructor(public readonly authService: AuthenticationService) {}

  ngOnInit(): void {
    this.processFiles();
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = [];
    this.previews.clear();
    this.videoPreviews.clear();
    this.selectedFiles.push(...Array.from<File>(event.target.files));
    this.processFiles();
    this.selectedFilesEvent.emit(this.selectedFiles);
  }

  processFiles(): void {
    if (this.selectedFiles != null && this.selectedFiles.length > 0) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);

          if ((e.target.result as string).includes('video')) {
            this.videoPreviews.set(this.selectedFiles[i].name, e.target.result);
          } else {
            this.previews.set(this.selectedFiles[i].name, e.target.result);
          }
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  removeImage(key: string): void {
    this.fileInput.nativeElement.value = '';
    this.previews.delete(key);
    const index = this.selectedFiles.findIndex((x) => x.name === key);
    if (index !== -1) {
      this.selectedFiles?.splice(index, 1);
      this.selectedFilesEvent.emit(this.selectedFiles);
    }
  }

  removeVideo(key: string): void {
    this.fileInput.nativeElement.value = '';
    this.videoPreviews.delete(key);
    const index = this.selectedFiles.findIndex((x) => x.name === key);
    if (index !== -1) {
      this.selectedFiles?.splice(index, 1);
      this.selectedFilesEvent.emit(this.selectedFiles);
    }
  }
}
