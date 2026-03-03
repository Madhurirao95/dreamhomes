/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AIService } from 'src/app/services/ai-service';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { SellPageService } from 'src/app/services/sell-page-service';
import { IComponentData } from 'src/app/shared/Interfaces/IComponentData';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListingDetailsDialogComponent implements IComponentData {
  postForm!: FormGroup;
  state = States;
  uploadedDocuments: File[] = [];

  selectedAddress: string = '';

  submitButtonText = 'Post';

  areDocumentsChanged = false;

  isGenerating = false;

  initialData: any;
  coordinatex: number = 0.0;
  coordinatey: number = 0.0;
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif',
  };

  years: number[] = [];

  public states = Object.values(States).filter(
    (value) => typeof value !== 'number',
  );

  public typeOfListing = Object.values(TypeOfListing).filter(
    (value) => typeof value !== 'number' && value !== 'None',
  );

  public statusOfListing = Object.values(StatusOfListing).filter(
    (value) =>
      typeof value !== 'number' &&
      value !== 'None' &&
      value !== 'UnderContractOrPending' &&
      value !== 'Sold',
  );

  public typeOfBuildings = Object.values(TypeOfBuilding).filter(
    (value) => typeof value !== 'number' && value !== 'None',
  );

  public units = Object.values(AreaUnit).filter(
    (value) => typeof value !== 'number',
  );

  get lotAreaUnit(): string {
    return this.postForm.get('lotAreaUnit')?.value ?? 'SqFt';
  }

  get lotAreaAllowDecimals(): boolean {
    return this.lotAreaUnit === 'Acres';
  }

  get lotAreaMaxDigits(): number {
    // SqFt: 5 integer digits (max 99,999)
    // Acres: 2 integer digits (max 99.xx)
    return this.lotAreaUnit === 'Acres' ? 2 : 5;
  }

  constructor(
    public dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly sellPageService: SellPageService,
    public readonly authService: AuthenticationService,
    private readonly aiService: AIService,
  ) {
    this.postForm = this.getNewPostForm();
    this.postForm.get('lotAreaUnit')?.valueChanges.subscribe(() => {
      this.postForm.get('lotArea')?.setValue(null, { emitEvent: false });
    });
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

  // checks all other controls are filled before enabling the button
  canGenerateDescription(): boolean {
    const controls = [
      'type',
      'streetAddress',
      'zipCode',
      'city',
      'state',
      'price',
      'area',
      'lotArea',
      'lotAreaUnit',
      'status',
      'typeOfBuilding',
      'yearBuilt',
      'hoa',
      'bedrooms',
      'bathrooms',
    ];
    return controls.every((ctrl) => this.postForm.get(ctrl)?.valid);
  }

  generateDescription(): void {
    this.isGenerating = true;

    const formValue = this.postForm.value;

    const request = {
      streetAddress: formValue.streetAddress,
      city: formValue.city,
      state: formValue.state,
      zipCode: formValue.zipCode,
      unit: formValue.unit ?? '',
      type: formValue.type,
      listingPrice: this.parseNumber(formValue.price),
      area: this.parseNumber(formValue.area),
      buildingType: formValue.typeOfBuilding,
      yearBuilt: formValue.yearBuilt,
      lotArea: this.parseNumber(formValue.lotArea),
      lotAreaUnit: formValue.lotAreaUnit,
      hoa: formValue.hoa,
      bedRooms: formValue.bedrooms,
      bathRooms: formValue.bathrooms,
      amountPerSqFt: formValue.amountPerSqFt,
      hasFirePlace: formValue.hasFireplace,
      numberOfFirePlace: formValue.numberOfFireplace,
      hasGarage: formValue.hasGarage,
      numberOfGarageSpace: formValue.numberOfGarageSpace,
      hasPool: formValue.hasPool,
      properties: formValue.features ?? '',
    };

    this.aiService.generateDescription(request).subscribe({
      next: (res) => {
        this.postForm.patchValue({ description: res.description });
        this.isGenerating = false;
      },
      error: () => {
        this.isGenerating = false;
      },
    });
  }

  // helper to strip commas from formatted number fields like "1,200"
  private parseNumber(value: string): number {
    return value ? parseFloat(value.toString().replace(/,/g, '')) : 0;
  }

  // Responsive grid column methods
  getGridCols(): number {
    if (typeof window === 'undefined') return 5;
    const width = window.innerWidth;
    if (width < 600) return 1; // Mobile: 1 column
    if (width < 768) return 2; // Mobile medium: 2 columns
    if (width < 1024) return 3; // Tablet: 3 columns
    if (width < 1440) return 4; // Desktop: 4 columns
    return 5; // Large desktop: 5 columns
  }

  getDescriptionGridCols(): number {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 600) return 1; // Mobile: 1 column
    if (width < 768) return 2; // Mobile medium: 2 columns
    return 3; // Tablet and above: 3 columns
  }

  getFeatureGridCols(): number {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 600) return 1; // Mobile: 1 column
    if (width < 768) return 2; // Mobile medium: 2 columns
    if (width < 1024) return 2; // Tablet: 2 columns
    return 4; // Desktop and above: 4 columns
  }

  getTextAreaGridCols(): number {
    if (typeof window === 'undefined') return 2;
    const width = window.innerWidth;
    if (width < 768) return 1; // Mobile: 1 column (stack vertically)
    return 2; // Tablet and above: 2 columns
  }

  getTextAreaColspan(): number {
    if (typeof window === 'undefined') return 2;
    const width = window.innerWidth;
    if (width < 768) return 1; // Mobile: full width
    return 1; // Tablet and above: half width each
  }

  getRowHeight(): string {
    if (typeof window === 'undefined') return '140px';
    const width = window.innerWidth;
    if (width < 600) return '120px'; // Mobile: shorter rows
    if (width < 768) return '130px'; // Mobile medium
    return '140px'; // Tablet and above: more height
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
      description: initialData.description,
      features: initialData.properties,
      amountPerSqFt: initialData.amountPerSqFt,
      lotAreaUnit: AreaUnit[initialData.lotAreaUnit as keyof typeof AreaUnit],
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
      hasPool: initialData.hasPool,
    });

    initialData.documentList.forEach((doc: any) => {
      this.uploadedDocuments.push(
        this.convertBase64ToFile(
          doc.documentBase64,
          doc.documentName,
          doc.documentType,
        ),
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
    fileType: string,
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
      price: [null, [Validators.required, Validators.max(999999999)]],
      amountPerSqFt: [null, [Validators.required, Validators.max(99999999)]],
      area: [null, [Validators.required, Validators.max(99999)]],
      lotAreaUnit: [AreaUnit.SqFt, Validators.required],
      lotArea: [null, [Validators.required]],
      contactNumber: ['', Validators.maxLength(10)],
      status: [StatusOfListing.Active, Validators.required],
      typeOfBuilding: [TypeOfBuilding.Resale, Validators.required],
      yearBuilt: [null, Validators.required],
      hoa: [0, [Validators.required, Validators.max(5000)]],
      bedrooms: ['', [Validators.required, Validators.max(100)]],
      bathrooms: ['', [Validators.required, Validators.max(100)]],
      hasGarage: [false, Validators.required],
      numberOfGarageSpace: [{ value: 0, disabled: true }, [Validators.max(20)]],
      hasFireplace: [false, Validators.required],
      numberOfFireplace: [{ value: 0, disabled: true }, [Validators.max(20)]],
      hasPool: [false, Validators.required],
      description: ['', Validators.maxLength(2000)],
      features: ['', Validators.maxLength(10000)],
    });
  }

  onHasGarageChange(event: any): void {
    const control = this.postForm.get('numberOfGarageSpace');
    this.onToggleChange(event, control);
  }

  onHasFireplaceChange(event: any): void {
    const control = this.postForm.get('numberOfFireplace');
    this.onToggleChange(event, control);
  }

  onToggleChange(event: any, control: AbstractControl | null): void {
    if (event.checked === false) {
      control?.setValue(0);
      control?.disable();
      control?.removeValidators(Validators.required);
    } else {
      control?.enable();
      control?.addValidators(Validators.required);
    }
    control?.updateValueAndValidity();
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
      state: event.properties.state_code,
    });

    this.coordinatex = event.geometry.coordinates[0];
    this.coordinatey = event.geometry.coordinates[1];
  }

  onDocumentsReceived(event: File[]): void {
    this.postForm.markAsDirty();

    this.uploadedDocuments = event;
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
    formData.append(
      'Unit',
      this.postForm.get('unit')?.value ? this.postForm.get('unit')?.value : '',
    );
    formData.append('ZipCode', this.postForm.get('zipCode')?.value);
    formData.append('City', this.postForm.get('city')?.value);
    formData.append('State', this.postForm.get('state')?.value);
    formData.append('ListingPrice', this.postForm.get('price')?.value);
    formData.append('Area', this.postForm.get('area')?.value);
    formData.append(
      'ContactNumber',
      this.postForm.get('contactNumber')?.value
        ? this.postForm.get('contactNumber')?.value
        : '',
    );
    // formData.append('Properties', this.postForm.get('remarks')?.value);
    formData.append(
      'Description',
      this.postForm.get('description')?.value
        ? this.postForm.get('description')?.value
        : '',
    );
    formData.append(
      'Properties',
      this.postForm.get('features')?.value
        ? this.postForm.get('features')?.value
        : '',
    );
    formData.append('CoordinateX', this.coordinatex as any);
    formData.append('CoordinateY', this.coordinatey as any);
    formData.append('Status', this.postForm.get('status')?.value);
    formData.append('BuildingType', this.postForm.get('typeOfBuilding')?.value);
    formData.append('YearBuilt', this.postForm.get('yearBuilt')?.value);
    formData.append('LotArea', this.postForm.get('lotArea')?.value);
    formData.append('LotAreaUnit', this.postForm.get('lotAreaUnit')?.value);
    formData.append('HOA', this.postForm.get('hoa')?.value);
    formData.append('BedRooms', this.postForm.get('bedrooms')?.value);
    formData.append('BathRooms', this.postForm.get('bathrooms')?.value);
    formData.append('AmountPerSqFt', this.postForm.get('amountPerSqFt')?.value);
    formData.append('HasFirePlace', this.postForm.get('hasFireplace')?.value);
    formData.append(
      'NumberOfFirePlace',
      this.postForm.get('numberOfFireplace')?.value,
    );
    formData.append('HasGarage', this.postForm.get('hasFireplace')?.value);
    formData.append(
      'NumberOfGarageSpace',
      this.postForm.get('numberOfGarageSpace')?.value,
    );
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
        },
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
          },
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
        showCloseButton: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

export enum AreaUnit {
  SqFt = 'SqFt',
  Acres = 'Acres',
}

export enum TypeOfListing {
  None,
  House,
  TownHouse,
  Condominium,
  Land,
}

export enum StatusOfListing {
  None = 'None',
  Active = 'Active',
  ComingSoon = 'ComingSoon',
  UnderContractOrPending = 'UnderContractOrPending',
  Sold = 'Sold',
}

export enum TypeOfBuilding {
  None,
  Resale,
  NewConstruction,
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
  WY,
}
