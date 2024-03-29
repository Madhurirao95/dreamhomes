/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { SellPageService } from 'src/app/services/sell-page-service';
import { IComponentData } from 'src/app/shared/Interfaces/IComponentData';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListingDetailsDialogComponent implements IComponentData {
  postForm!: FormGroup;
  state = States;

  uploadedDocuments: File[] = [];

  selectedAddress: string = '';

  submitButtonText = 'Post';

  areDocumentsChanged = false;

  initialData: any;
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif'
  };

  public states = Object.values(States).filter(
    (value) => typeof value !== 'number'
  );

  public typeOfListing = Object.values(TypeOfListing).filter(
    (value) => typeof value !== 'number'
  );

  constructor(
    public dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly sellPageService: SellPageService,
    public readonly authService: AuthenticationService
  ) {
    this.postForm = this.getNewPostForm();
    this.authService.isAuthorized$.subscribe((res) => {
      if (!res) {
        this.postForm.disable();
        this.postForm.reset();
      }
    });
  }

  initializeControls(initialData: any): void {
    this.submitButtonText = 'Update';
    console.log(initialData);
    this.initialData = initialData;
    this.selectedAddress =
      initialData.streetAddress +
      ', ' +
      initialData.city +
      ', ' +
      initialData.state +
      ' ' +
      initialData.zipCode +
      ', ' +
      initialData.country;
    this.postForm.patchValue({
      streetAddress: initialData.streetAddress,
      zipCode: initialData.zipCode,
      city: initialData.city,
      state: initialData.state,
      type: initialData.type,
      unit: initialData.unit,
      price: initialData.price,
      area: initialData.area,
      contactNumber: initialData.contactNumber,
      remarks: initialData.remarks
    });

    initialData.documents.forEach((doc: any) => {
      this.uploadedDocuments.push(this.convertBase64ToFile(doc.documentBase64, doc.documentName, doc.documentType));
    });

    this.postForm.markAsPristine();
  }

  convertBase64ToFile(base64String: string, filename: string, fileType: string): File {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });
    return new File([blob], filename, { type: fileType });
  }

  getNewPostForm(): FormGroup {
    return this.formBuilder.group({
      type: [null, Validators.required],
      streetAddress: ['', Validators.required],
      unit: ['', Validators.maxLength(10)],
      zipCode: ['', [Validators.required]],
      city: ['', Validators.required],
      state: [States.None, Validators.required],
      price: [null, [Validators.required, Validators.max(99999999)]],
      area: [null, [Validators.required, Validators.max(99999)]],
      contactNumber: ['', Validators.maxLength(10)],
      remarks: ['', Validators.maxLength(500)]
    });
  }

  suggestionsChanged(event: any): void {
    console.log(event);
  }

  placeSelected(event: any): void {
    console.log(event);
    if (event == null || event.properties == null) {
      return;
    }

    this.postForm.patchValue({
      streetAddress: event.properties.address_line1,
      zipCode: event.properties.postcode,
      city: event.properties.city,
      state: event.properties.state_code
    });
  }

  onDocumentsReceived(event: File[]): void {
    if (event.length !== this.initialData.documents.length) {
      this.postForm.markAsDirty();
    }
  }

  onPostOrUpdate(): void {
    console.log('Your form data : ', this.postForm.value);
    console.log('Your photos data : ', this.uploadedDocuments);

    const formData = new FormData();
    this.uploadedDocuments.forEach((file) => {
      formData.append('Documents', file);
    });

    formData.append('Type', this.postForm.get('type')?.value);
    formData.append('StreetAddress', this.postForm.get('streetAddress')?.value);
    formData.append('Unit', this.postForm.get('unit')?.value);
    formData.append('ZipCode', this.postForm.get('zipCode')?.value);
    formData.append('City', this.postForm.get('city')?.value);
    formData.append('State', this.postForm.get('state')?.value);
    formData.append('Price', this.postForm.get('price')?.value);
    formData.append('Area', this.postForm.get('area')?.value);
    formData.append('ContactNumber', this.postForm.get('contactNumber')?.value);
    formData.append('Remarks', this.postForm.get('remarks')?.value);
    console.log(formData);

    if (this.submitButtonText === 'Post') {
      this.sellPageService.postAListing(formData).subscribe({
        next: (res) => {
          this.dialog.closeAll();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 401) {
            this.authService.setIsAuthorized(false);
            this.postForm.disable();
            this.postForm.reset();
          } else if (err.status === 400) {
            console.log(err.error);
            this.openErrorDialog(err.error);
          }
        }
      });
    } else if (this.submitButtonText === 'Update') {
      this.sellPageService.updateAListing(this.initialData.id, formData).subscribe({
        next: (res) => {
          this.dialog.closeAll();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 401) {
            this.authService.setIsAuthorized(false);
            this.postForm.disable();
            this.postForm.reset();
          } else if (err.status === 400) {
            console.log(err.error);
            this.openErrorDialog(err.error);
          }
        }
      });
    }
  }

  openErrorDialog(error: string[]): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        titleIcon: 'info',
        title: 'Error!',
        titleStyle: this.titleStyle,
        messages: error,
        showCloseButton: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

export enum TypeOfListing {
  None,
  House,
  Apartment,
  Plot
}

export enum States {
  None,
  AK,
  AL,
  AZ,
  AR,
  CA,
  CO,
  CT,
  DE,
  FL,
  GA,
  HI,
  ID,
  IL,
  IN,
  IA,
  KS,
  KY,
  LA,
  ME,
  MD,
  MA,
  MI,
  MN,
  MS,
  MO,
  MT,
  NE,
  NV,
  NH,
  NJ,
  NM,
  NY,
  NC,
  ND,
  OH,
  OK,
  OR,
  PA,
  RI,
  SC,
  SD,
  TN,
  TX,
  UT,
  VT,
  VA,
  WA,
  WV,
  WI,
  WY
}
