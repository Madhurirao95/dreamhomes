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
  coordinatex: number = 0.0;
  coordinatey: number = 0.0;
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif'
  };

  years: number[] = [];

  public states = Object.values(States).filter(
    (value) => typeof value !== 'number'
  );

  public typeOfListing = Object.values(TypeOfListing).filter(
    (value) => typeof value !== 'number'
  );

  public statusOfListing = Object.values(StatusOfListing).filter(
    (value) =>
      typeof value !== 'number' &&
      value !== 'None' &&
      value !== 'UnderContractOrPending' &&
      value !== 'Sold'
  );

  public typeOfBuildings = Object.values(TypeOfBuilding).filter(
    (value) => typeof value !== 'number' && value !== 'None'
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

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 200; i--) {
      this.years.push(i);
    }
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
      price: initialData.listingPrice,
      area: initialData.area,
      contactNumber: initialData.contactNumber,
      remarks: initialData.properties,
      amountPerSqFt: initialData.amountPerSqFt,
      lotArea: initialData.lotArea,
      status: initialData.status,
      typeOfBuilding: initialData.buildingType,
      yearBuilt: initialData.yearBuilt,
      hoa: initialData.hoa,
      bedrooms: initialData.bedRooms,
      bathrooms: initialData.bathRooms,
      hasGarage: initialData.hasGarage,
      numberOfGarageSpace: initialData.numberOfGarageSpace,
      hasFireplace: initialData.hasFirePlace,
      numberOfFireplace: initialData.numberOfFirePlace,
      hasPool: initialData.hasPool
    });

    initialData.documentList.forEach((doc: any) => {
      this.uploadedDocuments.push(
        this.convertBase64ToFile(
          doc.documentBase64,
          doc.documentName,
          doc.documentType
        )
      );
    });
    this.coordinatex = initialData.coordinateX;
    this.coordinatey = initialData.coordinateY;
    this.postForm.markAsPristine();

    if (this.postForm.get('hasGarage')?.value) {
      this.postForm.get('numberOfGarageSpace')?.enable();
    }

    if (this.postForm.get('hasFireplace')?.value) {
      this.postForm.get('numberOfFireplace')?.enable();
    }
  }

  convertBase64ToFile(
    base64String: string,
    filename: string,
    fileType: string
  ): File {
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
      state: [null, Validators.required],
      price: [null, [Validators.required, Validators.max(99999999)]],
      amountPerSqFt: [0, [Validators.required, Validators.max(99999999)]],
      area: [0, [Validators.required, Validators.max(99999)]],
      lotArea: [0, [Validators.required, Validators.max(99999)]],
      contactNumber: ['', Validators.maxLength(10)],
      status: ['Active', Validators.required],
      typeOfBuilding: ['Resale', Validators.required],
      yearBuilt: [null, Validators.required],
      hoa: [0, [Validators.required, Validators.max(5000)]],
      bedrooms: ['', [Validators.required, Validators.max(100)]],
      bathrooms: ['', [Validators.required, Validators.max(100)]],
      hasGarage: [false, Validators.required],
      numberOfGarageSpace: [
        { value: '', disabled: true },
        [Validators.max(20)]
      ],
      hasFireplace: [false, Validators.required],
      numberOfFireplace: [{ value: '', disabled: true }, [Validators.max(20)]],
      hasPool: [false, Validators.required],
      remarks: ['', Validators.maxLength(2000)]
    });
  }

  onHasGarageChange(event: any): void {
    if (event.checked === false) {
      this.postForm.get('numberOfGarageSpace')?.setValue(null);
      this.postForm.get('numberOfGarageSpace')?.disable();
    } else {
      this.postForm.get('numberOfGarageSpace')?.enable();
    }
  }

  onHasFireplaceChange(event: any): void {
    if (event.checked === false) {
      this.postForm.get('numberOfFireplace')?.setValue(null);
      this.postForm.get('numberOfFireplace')?.disable();
    } else {
      this.postForm.get('numberOfFireplace')?.enable();
    }
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

    this.coordinatex = event.geometry.coordinates[0];
    this.coordinatey = event.geometry.coordinates[1];
  }

  onDocumentsReceived(event: File[]): void {
    if (
      this.initialData &&
      event.length !== this.initialData.documents.length
    ) {
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
    formData.append('ListingPrice', this.postForm.get('price')?.value);
    formData.append('Area', this.postForm.get('area')?.value);
    formData.append('ContactNumber', this.postForm.get('contactNumber')?.value);
    formData.append('Properties', this.postForm.get('remarks')?.value);
    formData.append('CoordinateX', this.coordinatex as any);
    formData.append('CoordinateY', this.coordinatey as any);
    formData.append('Status', this.postForm.get('status')?.value);
    formData.append('BuildingType', this.postForm.get('typeOfBuilding')?.value);
    formData.append('YearBuilt', this.postForm.get('yearBuilt')?.value);
    formData.append('LotArea', this.postForm.get('lotArea')?.value);
    formData.append('HOA', this.postForm.get('hoa')?.value);
    formData.append('BedRooms', this.postForm.get('bedrooms')?.value);
    formData.append('BathRooms', this.postForm.get('bathrooms')?.value);
    formData.append('AmountPerSqFt', this.postForm.get('amountPerSqFt')?.value);
    formData.append('HasFirePlace', this.postForm.get('hasFireplace')?.value);
    formData.append('NumberOfFirePlace', this.postForm.get('numberOfFireplace')?.value);
    formData.append('HasGarage', this.postForm.get('hasFireplace')?.value);
    formData.append('NumberOfGarageSpace', this.postForm.get('numberOfFireplace')?.value);
    formData.append('HasPool', this.postForm.get('hasPool')?.value);
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
      this.sellPageService
        .updateAListing(this.initialData.id, formData)
        .subscribe({
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
  TownHouse,
  Condominium,
  Land
}

export enum StatusOfListing {
  None,
  Active,
  ComingSoon,
  UnderContractOrPending,
  Sold
}

export enum TypeOfBuilding {
  None,
  Resale,
  NewConstruction
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
